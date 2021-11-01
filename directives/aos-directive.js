import Vue from 'vue';

Vue.directive('aos-dataset', {
  inserted: function (el, binding) {
    let duration = '800';
    let delay = '0';
    let type = 'fade-up';
    let anchor_place = 'top-center';
    let anchor = '.-aos-lead';

    if(binding?.value) {
      duration = binding.value.duration ?? '800';
      delay = binding.value.delay ?? '0';
      type = binding.value.type ?? 'fade-up';
      anchor_place = binding.value.anchor_place ?? 'top-center';
      anchor = binding.value.anchor ? binding.value.anchor : binding.value.anchor === null ? null : '.-aos-lead';
    }

    el.setAttribute('data-aos', type);
    el.setAttribute('data-aos-duration', duration);
    el.setAttribute('data-aos-delay', delay);
    el.setAttribute('data-aos-offset', '0');
    el.setAttribute('data-aos-anchor-placement', anchor_place);
    el.setAttribute('data-aos-once', 'true');
    if(anchor) el.setAttribute('data-aos-anchor', anchor);
  }

})
