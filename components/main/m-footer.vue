<template>
  <footer class="m-footer-sect">
    <b-container class="--full-width">
      <div class="m-footer">
        <div class="m-footer__wrap m-footer__wrap_left">
          <div class="m-footer__logo">
            <b-logo/>
          </div>
          <form @submit.prevent class="m-footer__subscribe">

            <b-title class="m-footer__subscribe-title" class-level="6" level="3">
              Subscribe to our newsletter
            </b-title>
            <div class="m-footer__subscribe-wrap">
              <div class="m-footer__subscribe-input">
                <input type="text">
              </div>
              <b-button class="--white --primary-hover">
                Subscribe
              </b-button>
            </div>
          </form>
<!--          <ul class="m-footer__menu">-->
<!--            <li class="m-footer__menu-item" v-for="item in menus" :key="item.title">-->
<!--              <div class="m-footer__menu-title">-->
<!--                {{ item.title }}-->
<!--              </div>-->
<!--              <ul class="m-footer__menu-nested">-->
<!--                <li class="m-footer__menu-nested-item"-->
<!--                    v-for="nestedItem in item.nested" :key="nestedItem">-->
<!--                  <nuxt-link to="/" class="m-footer__menu-link">-->
<!--                    {{ nestedItem }}-->
<!--                  </nuxt-link>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </li>-->
<!--          </ul>-->
        </div>
        <div class="m-footer__wrap m-footer__wrap_right">
          <div class="m-footer__locales">
<!--            <nuxt-link class="m-footer__locales-item"-->
<!--                       :to="localePathHelper('/', locale.code)"-->
<!--                       :class="{ active: locale.code === $i18n.locale }"-->
<!--                       :key="locale.code"-->
<!--                       v-for="locale in $i18n.locales">-->
<!--              {{ locale.code.toUpperCase() }}-->
<!--            </nuxt-link>-->
          </div>
          <div class="m-footer__buttons cm-navigation__buttons">
<!--            <nuxt-link to="/" class="b-button &#45;&#45;white &#45;&#45;border -login-button">-->
<!--              <span>{{ $t('buttons.login') }}</span>-->
<!--            </nuxt-link>-->
            <nuxt-link to="/" class="b-button --white">
              <span>{{ $t('buttons.contactUs') }}</span>
            </nuxt-link>
          </div>
          <div class="m-footer__social">
            <p class="m-footer__social-title">You can find us here</p>
            <ul class="m-footer__social-list">
              <li class="m-footer__social-list-item">
                <a href="#">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M4.47668 20H0.330283V6.64732H4.47668V20ZM2.40125 4.82589C1.07565 4.82589 0 3.72768 0 2.40179C0 1.07589 1.07565 0 2.40125 0C3.72685 0 4.8025 1.07589 4.8025 2.40179C4.8025 3.72768 3.72685 4.82589 2.40125 4.82589ZM19.9955 20H15.8581V13.5C15.8581 11.9509 15.8268 9.96429 13.7023 9.96429C11.5465 9.96429 11.2162 11.6473 11.2162 13.3884V20H7.07431V6.64732H11.0511V8.46875H11.1091C11.6626 7.41964 13.015 6.3125 15.0324 6.3125C19.2278 6.3125 20 9.07589 20 12.6652V20H19.9955Z" fill="white"/>
                  </svg>
                </a>
              </li>
              <li class="m-footer__social-list-item">
                <a href="#">
                  <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9554 0.611765C26.1547 0.941176 27.1004 1.90588 27.4233 3.12941C28.0229 5.36471 27.9999 10.0235 27.9999 10.0235C27.9999 10.0235 27.9999 14.6588 27.4233 16.8941C27.1004 18.1176 26.1547 19.0824 24.9554 19.4118C22.7643 20 13.9999 20 13.9999 20C13.9999 20 5.25863 20 3.04447 19.3882C1.84513 19.0588 0.899502 18.0941 0.576604 16.8706C0 14.6588 0 10 0 10C0 10 0 5.36471 0.576604 3.12941C0.899502 1.90588 1.8682 0.917647 3.04447 0.588235C5.23556 0 13.9999 0 13.9999 0C13.9999 0 22.7643 0 24.9554 0.611765ZM11.2092 5.71777L18.4975 10.0001L11.2092 14.2825V5.71777Z" fill="white" fill-opacity="0.4"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </b-container>
  </footer>
</template>

<script>
import BContainer from "../base/grid/b-container";
import BLogo from "../base/b-logo";
import BButton from "../base/buttons/b-button";
import BTitle from "../base/content/b-title";
export default {
  name: "m-footer",
  components: {BTitle, BButton, BLogo, BContainer},
  data() {
    return {
      menus: [
        {
          title: 'Industry',
          nested: [
            'Energy',
            'Construction',
            'Transport',
            'Infrastructure',
            'Grid Operators',
            'Mining',
            'EPS',
            'Manufacturing',
          ]
        },
        {
          title: 'Solutions',
          nested: [
            'Energy',
            'Construction',
            'Transport',
            'Infrastructure',
          ]
        },
        {
          title: 'Services',
          nested: [
            'Energy',
            'Construction',
            'Transport',
          ]
        },
        {
          title: 'Company',
          nested: [
            'Energy',
            'Construction',
            'Transport',
            'Infrastructure',
            'Grid Operators',
          ]
        },
        {
          title: 'Resources Hub',
          nested: [
            'Energy',
            'Construction',
            'Transport',
            'Infrastructure',
            'Grid Operators',
            'Mining',
            'EPS',
          ]
        },
      ]
    }
  },
}
</script>
