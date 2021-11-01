<template>
  <div class="v-career-description-page">
    <b-container>
      <div class="v-career-description-main">
        <!-- <pre style="color: red;'">
        {{ content }}
      </pre> -->
        <b-title class-level="1" level="1"> Find Your Team </b-title>
        <div class="v-career-description">
          <div class="v-career-description__wrap">
            <h2 class="position-name">Assistant Financial Controller</h2>
            <div
              class="
                v-career-description__content
                --text-formatting
                v-article-content
              "
            >
              <p>
                Assai is the global leader in Document Management Solution for
                complex engineering and projects witha unique focus
                onpro-actively ‘controlling’ the document revision
              </p>
              <h3>Qualifications</h3>
              <ul>
                <li>Minimum 5 years related industry experience</li>
                <li>University degree in Finance</li>
                <li>
                  Senior professional with strong experience on FP&A, finance
                  and Accounting, able to work in an international and
                  multicultural environment
                </li>
                <li>
                  Excellent in MS Office Tools (Excel, Word, Access and Power
                  point)/ Knowledge of SAP and Hyperion (HFM and Essbase)
                </li>
                <li>Strong English required</li>
                <li>
                  Demonstrated knowledge, skills and experience in supporting
                  the business
                </li>
                <li>Ability to identify & resolve business problems</li>
                <li>
                  Team player with ability to work in a cross functional
                  environment
                </li>
                <li>
                  Highly interested in process improvements & bringing added
                  value to the business
                </li>
                <li>Ability to adapt & adjust to a changing environment</li>
                <li>
                  Ability to analyze data as well as present a clear picture
                  (summary)
                </li>
                <li>Any other additional language would be an asset</li>
              </ul>
              <h3>We offer</h3>
              <ul>
                <li>
                  A culture that fosters inclusion, diversity and innovation
                </li>
                <li>
                  Market specific training and ongoing personal development
                </li>
                <li>Career growth opportunities</li>
                <li>
                  Experienced leaders to support your professional development
                </li>
                <li>International work environment</li>
                <li>
                  If this is your dream role, then we'd love to hear from you.
                </li>
              </ul>
            </div>
            <a href="#" download class="b-button --border --primary-font-color">
              <span>Download full version</span>
            </a>
          </div>
          <div class="v-career-description__form">
            <form @submit.prevent="onSubmit" class="v-contact__form">
              <div class="v-contact__form-wrap">
                <b-input
                  label="First Name*"
                  field_name="firstName"
                  v-model="formData.firstname"
                  emit_local
                  :placeholder="''"
                />
                <b-input
                  label="Last Name*"
                  field_name="lastName"
                  v-model="formData.lastname"
                  emit_local
                  :placeholder="''"
                />
              </div>
              <div class="v-contact__form-wrap">
                <b-input
                  label="Company Email*"
                  field_name="email"
                  v-model="formData.email"
                  emit_local
                  :placeholder="''"
                />
                <b-input
                  label="Phone*"
                  v-model="formData.phoneNumber"
                  field_name="phone"
                  emit_local
                  :placeholder="''"
                />
              </div>
              <div class="v-contact__form-wrap">
                <b-select
                  label="Country*"
                  :options="countriesArray"
                  v-model="formData.country"
                />
                <b-select
                  label="Enquiry type*"
                  :options="['Vacancies']"
                  v-model="formData.type"
                />
              </div>
              <div class="v-contact__form-wrap">
                <b-textarea
                  label="Description"
                  v-model="formData.message"
                  field_name="message"
                  emit_local
                  :placeholder="''"
                />
              </div>
              <b-button class="--white --primary-hover"> Submit </b-button>
            </form>
          </div>
        </div>
      </div>
    </b-container>
    <div class="v-contact-overlay" :class="{ '--visible': showOverlay }">
      <div class="v-contact-overlay__wrap">
        <b-title class="v-contact-overlay__title" class-level="2" level="2">
          Thank you for getting in touch!
        </b-title>
        <p class="v-contact-overlay__text">
          We appreciate you contacting us, {{ overlayName }}. One of our
          colleagues will get back in touch with you soon!
          <br />
          <br />
          Have a great day!
        </p>
        <b-button @click="closeOverlay" class="--border --primary-font-color">
          Close
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import BTitle from "../../../components/base/content/b-title";
import BContainer from "../../../components/base/grid/b-container";
import { mapState } from "vuex";
import objectValue from "../../../utils/objectValue";
import BInput from "../../../components/base/form/b-input";
import BSelect from "../../../components/base/form/b-select";
import BButton from "../../../components/base/buttons/b-button";
import BTextarea from "../../../components/base/form/b-textarea";

import httpConfig from "@/http.config";

export default {
  name: "index",
  components: { BTextarea, BButton, BSelect, BInput, BContainer, BTitle },
  async middleware({ store, route }) {
    const slug = route.params.slug;
    await store.dispatch("pages/loadPageData", {
      pageSlug: slug,
      mainPage: "vacancy",
    });
  },
  data() {
    return {
      formData: {
        firstname: null,
        lastname: null,
        email: null,
        phoneNumber: null,
        message: null,
        country: null,
        type: null,
      },
      showOverlay: false,
      overlayName: null,
    };
  },
  computed: {
    ...mapState({
      content(state) {
        const locale = this.$i18n.locale;
        const slug = this.$route.params.slug;
        return objectValue(state.pages.vacancy[locale], slug, {});
      },
    }),
    countriesArray() {
      return [...this.content.countries].map((el) => {
        return {
          type: el.name,
          key: el.code,
        };
      });
    },
  },
  methods: {
    async onSubmit() {
      const dataObject = {
        ...this.formData,
      };

      try {
        const query = await this.$http.post(httpConfig.postContactForm(), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: dataObject,
        });

        if (query.body?.error) return;

        console.log(e.response);
        Object.keys(this.formData).forEach((key) => {
          this.formData[key] = null;
        });
        this.showOverlay = true;
        this.overlayName = this.formData.firstname;
      } catch (e) {
        console.log(e.response);
      }
    },
    closeOverlay() {
      this.showOverlay = false;
      this.overlayName = null;
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/base/pages/careers/index";
</style>
