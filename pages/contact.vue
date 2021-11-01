<template>
  <div class="v-contact-page">
    <b-container>
      <div class="v-contact">
        <b-title class-level="1" level="1">
          Contact us
        </b-title>
        <div class="v-contact__wrapper">
          <div class="v-contact__wrap v-contact__wrap_left">
            <form @submit.prevent="onSubmit" class="v-contact__form">
              <div class="v-contact__form-wrap">
                <b-input label="First Name*"
                         field_name="firstName"
                         v-model="formData.firstname"
                         emit_local
                         :placeholder="''"/>
                <b-input label="Last Name*"
                         field_name="lastName"
                         v-model="formData.lastname"
                         emit_local
                         :placeholder="''"/>
              </div>
              <div class="v-contact__form-wrap">
                <b-input label="Company Email*"
                         field_name="email"
                         v-model="formData.email"
                         emit_local
                         :placeholder="''"/>
                <b-input label="Phone*"
                         v-model="formData.phoneNumber"
                         field_name="phone"
                         emit_local
                         :placeholder="''"/>
              </div>
              <div class="v-contact__form-wrap">
                <b-select label="Country*"
                          :options="countriesArray"
                          v-model="formData.country"/>
                <b-select label="Enquiry type*"
                          :options="content.enquiryTypes"
                          v-model="formData.type"/>
              </div>
              <div class="v-contact__form-wrap">
                <b-textarea label="Description"
                            v-model="formData.message"
                            field_name="message"
                            emit_local
                            :placeholder="''"/>
              </div>
              <b-button class="--white --primary-hover">
                Submit
              </b-button>
            </form>
          </div>
          <div class="v-contact__wrap v-contact__wrap_right">
            <b-title class-level="2" level="2">
              Prefer to talk to us?
            </b-title>
            <div class="v-contact__text --text-formatting" v-html="content.talkToUs"></div>
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
          We appreciate you contacting us, {{ overlayName }}. One of our colleagues will get back in touch with you soon!
          <br>
          <br>
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
import BTitle from "../components/base/content/b-title";
import BContainer from "../components/base/grid/b-container";
import BInput from "../components/base/form/b-input";
import BSelect from "../components/base/form/b-select";
import BTextarea from "../components/base/form/b-textarea";
import BButton from "../components/base/buttons/b-button";

import httpConfig from "@/http.config";
import {mapState} from "vuex";
import objectValue from "../utils/objectValue";

export default {
  name: "contact",
  components: {BButton, BTextarea, BSelect, BInput, BContainer, BTitle},
  async middleware({ store }) {
    await store.dispatch('pages/loadPageData', { pageSlug: 'contact' });
  },
  data() {
    return {
      countries: [
        'Ukraine',
        'USA'
      ],
      enquiries: [
        'Book a demo',
        'Other subject'
      ],
      formData: {
        firstname: null,
        lastname: null,
        email: null,
        phoneNumber: null,
        message: null,
        country: null,
        type: null
      },
      showOverlay: false,
      overlayName: null,
    }
  },
  computed: {
    ...mapState({
      content(state) {
        const locale = this.$i18n.locale;
        return objectValue(state.pages.pages[locale], 'contact', {});
      }
    }),
    countriesArray() {
      return [...this.content.countries].map(el => {
        return {
          type: el.name,
          key: el.code
        }
      })
    }
  },
  methods: {
    async onSubmit() {
      const dataObject = {
        ...this.formData
      };


      try {
        const query = await this.$http.post(httpConfig.postContactForm(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: dataObject
        });

        if(query.body?.error) return;

        Object.keys(this.formData).forEach(key => {
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
    }
  },
}
</script>

<style lang="scss">
@import "~/assets/scss/base/pages/contact/index";
</style>
