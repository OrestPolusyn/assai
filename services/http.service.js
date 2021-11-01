import Axios from 'axios'
import stringifyValues from '~/utils/stringify-values';
import urlEncodeValues from '~/utils/url-encode-values';

// Axios.prototype cannot be modified
const axiosExtra = {
  setHeader(name, value, scopes = 'common') {
    for (const scope of Array.isArray(scopes) ? scopes : [scopes]) {
      if (!value) {
        delete this.defaults.headers[scope][name];
        return
      }
      this.defaults.headers[scope][name] = value
    }
  },
  setToken(token, type, scopes = 'common') {
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('Authorization', value, scopes)
  },
  onRequest(fn) {
    this.interceptors.request.use(config => fn(config) || config)
  },
  onResponse(fn) {
    this.interceptors.response.use(response => fn(response) || response)
  },
  onRequestError(fn) {
    this.interceptors.request.use(undefined, error => fn(error) || Promise.reject(error))
  },
  onResponseError(fn) {
    this.interceptors.response.use(undefined, error => fn(error) || Promise.reject(error))
  },
  onError(fn) {
    this.onRequestError(fn)
    this.onResponseError(fn)
  },
}

const extendAxiosInstance = axios => {
  for (const key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios)
  }
};

const createAxiosInstance = axiosOptions => {
  // Create new axios instance
  const axios = Axios.create(axiosOptions)
  axios.CancelToken = Axios.CancelToken
  axios.isCancel = Axios.isCancel

  // Extend axios proto
  extendAxiosInstance(axios);

  // Setup interceptors
  setupDebugInterceptor(axios);
  // setupProgress(axios);

  return axios
};

const log = (level, ...messages) => console[level]('[Axios]', ...messages);

const setupDebugInterceptor = axios => {
  // Request error
  axios.onRequestError(error => {
    log('error', 'Request error:', error)
  });

  // Response error
  axios.onResponseError(error => {
    log('error', 'Response error:', error)
  });

  axios.onResponse(res => {
    log('info', '[' + (res.status + ' ' + res.statusText) + ']', '[' + res.config.method.toUpperCase() + ']', res.config.url)

    if (process.browser) {
      console.log(res)
    } else {
      console.log(JSON.stringify(res.data, undefined, 2))
    }
    return res
  })
};

const setupProgress = (axios) => {
  if (process.server) {
    return
  }

  const noopLoading = {
    finish: () => {
    },
    start: () => {
    },
    fail: () => {
    },
    set: () => {
    }
  }

  const $loading = () => {
    const $nuxt = typeof window !== 'undefined' && window.$nuxt;
    return ($nuxt && $nuxt.$loading) ? $nuxt.$loading : noopLoading
  }

  let currentRequests = 0

  axios.onRequest(config => {
    if (config && config.progress === false) {
      return
    }

    currentRequests++;

    $loading().start();
  })

  axios.onResponse(response => {
    if (response && response.config && response.config.progress === false) {
      return
    }

    currentRequests--
    if (currentRequests <= 0) {
      currentRequests = 0
      $loading().finish()
    }
  })

  axios.onError(error => {
    if (error && error.config && error.config.progress === false) {
      return
    }

    currentRequests--

    if (Axios.isCancel(error)) {
      if (currentRequests <= 0) {
        currentRequests = 0
        $loading().finish()
      }
      return
    }

    $loading().fail()
    $loading().finish()
  })

  const onProgress = e => {
    if (!currentRequests || !e.total) {
      return
    }
    // const progress = ((e.loaded * 100) / (e.total * currentRequests))
    // $loading().set(Math.min(100, progress))
  }

  axios.defaults.onUploadProgress = onProgress
  axios.defaults.onDownloadProgress = onProgress
};

function toResponse (context) {
  let { data, status, headers, config } = context;
  const DATA = data ?? {};
  const DATAKeys = Object.keys(DATA);

  data = DATAKeys.length === 1 ? DATA[DATAKeys[0]] : DATA;

  if(Array.isArray(data)) {
    data.forEach(el => {
      el.queryDate = Date.now();
    });
  } else {
    data.queryDate = Date.now();
  }

  return { body: data, status, headers };
}

function toError (err) {
  const { response = {}, request = {}, message, } = err;
  const code = request.status;
  const configUrl = 'config' in response ? response.config.url : '';

  return {
    message, configUrl,
    body: response.data,
    headers: response.headers,
    status: code,
  };
}

export default (ctx, inject) => {

  const axiosOptions = {
    method: 'GET',
    responseType: 'text',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    validateStatus (status) {
      const OK = 200;
      const REDIRECT = 300;

      return status >= OK && status < REDIRECT; // || (status === 0 && body)
    },
    transformResponse (data) {
      if (!data) return;
      let respondedWithHtml = data.indexOf('DOCTYPE html') >= 0 || data.indexOf('doctype html') >= 0;

      if (respondedWithHtml) return null;

      try {
        console.log(data, 'JSON.parse')
        return JSON.parse(data);
      }
      catch (err) {
        throw err;
      }
    },
    transformRequest (data) {
      return JSON.stringify(data);
    }
  };

  // Proxy SSR request headers headers
  if (process.server && ctx.req && ctx.req.headers) {
    const reqHeaders = {};

    Object.keys(ctx.req.headers).forEach(key => {
      if(!(key.toUpperCase() === 'HOST')) {
        reqHeaders[key] = ctx.req.headers[key]
      }
    })

    axiosOptions.headers.common = {
      ...reqHeaders,
      ...axiosOptions.headers.common
    }

  }
  // Don't accept brotli encoding because Node can't parse it
  if (process.server) {
    // axiosOptions.headers.common['accept-encoding'] = 'gzip, deflate'
  }

  const axios = createAxiosInstance(axiosOptions);

  function httpRequest (url, method, { headers = {}, body, query } = {}) {
    let formattedHeaders = {
      ...headers,
      'User-Locale': ctx.app.i18n.locale,
    };
    let queryParams = stringifyValues(query);
    let formDataIsSent = (headers['Content-Type'] === 'application/x-www-form-urlencoded');
    let requestOptions = {
      url,
      method,
      headers: formattedHeaders,
      data: body,
      params: queryParams,
      transformRequest: formDataIsSent ? urlEncodeValues : undefined
    };

    return axios(requestOptions)
      .then(toResponse)
      .catch(toError);
  };

  const injectInstance = {
    get(url, opts) {
      return httpRequest(url, 'GET', opts);
    },
    post(url, opts) {
      return httpRequest(url, 'POST', opts);
    },
    put(url, opts) {
      return httpRequest(url, 'PUT', opts);
    },
    patch(url, opts) {
      return httpRequest(url, 'PATCH', opts);
    },
    delete(url, opts) {
      return httpRequest(url, 'DELETE', opts);
    },
    head(url, opts) {
      return httpRequest(url, 'HEAD', opts);
    },
    options(url, opts) {
      return httpRequest(url, 'OPTIONS', opts);
    },
    onRequest(fn) {
      axios.onRequest(fn);
    },
    onResponse(fn) {
      axios.onResponse(fn);
    },
    onRequestError(fn) {
      axios.onRequestError(fn);
    },
    onResponseError(fn) {
      axios.onResponseError(fn);
    },
    onError(fn) {
      axios.onError(fn);
    },
    setHeader(name, value) {
      axios.setHeader(name, value);
    },
  };

  // Inject axios to the context as $http
  ctx.$http = injectInstance
  inject('http', injectInstance)
}
