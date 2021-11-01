<template>
  <div class="cm-navigation-main">
    <b-container class="--navigation">
      <div class="cm-navigation">
        <div class="cm-navigation__wrap cm-navigation__wrap_left">
          <b-logo/>
          <button @click="toggleMenu"
                  :class="{ active: visibleMobileMenu }"
                  class="cm-navigation__mobile-menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav class="cm-navigation__menu" :class="{ active: visibleMobileMenu }">
            <div class="cm-dropdown-menu">
              <div class="cm-dropdown-menu__item" :class="{ active: nav === 'solutions' }"
                   v-for="nav in Object.keys(navigation)" :key="nav">
                <button class="cm-dropdown-menu__main-link"
                        @click-away="setActiveItem(nav)" @click="setActiveItem(nav)">
                  {{ nav[0].toUpperCase() + nav.slice(1) }}
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 8.53135e-08L8.34742e-08 0L3.52059 7L7 8.53135e-08Z" fill="#F7F7F7"/>
                  </svg>
                </button>
                <div class="cm-dropdown-menu__nested" @click="setActiveItem(nav)" :class="{ visible: nav === activeMenu }">
                  <div class="cm-dropdown-menu__nested --bg"></div>
                  <div class="cm-dropdown-menu__nested-item-wrap" :class="`--nested-item-${index}`" v-if="nav === 'solutions'" v-for="(menu, index) in navigation[nav]" :key="menu.title + '_' + index">
                    <div class="cm-dropdown-menu__nested-item">
                      <nuxt-link :to="localePathHelper(menu.nestedItems ? `/${menu.slug}` : `/${menu.type}/${menu.slug}`)" class="cm-dropdown-menu__nested-link-main">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.20741e-08 -7.94466e-08L9.53674e-07 10L10 4.97059L8.20741e-08 -7.94466e-08Z" fill="#F7F7F7"/>
                        </svg>
                        {{ menu.title }}
                      </nuxt-link>
                    </div>
                    <div class="cm-dropdown-menu__nested-list" v-if="menu.nestedItems">
                      <nuxt-link v-for="(nestedItem, index) in menu.nestedItems"
                                 :key="nestedItem.title + '_' + index"
                                 :to="localePathHelper(`/${menu.slug}/${nestedItem.slug}`)" class="cm-dropdown-menu__nested-list-item">
                        {{ nestedItem.title }}
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="cm-navigation__wrap cm-navigation__wrap_right">
<!--          <div class="cm-navigation__search">-->
<!--            <search_icon/>-->
<!--          </div>-->
          <div class="cm-navigation__languages">
<!--            <b-dropdown-links class="&#45;&#45;navigation-dropdown"-->
<!--                              :main-link-name="$i18n.locale.toUpperCase()"-->
<!--                              main-link-path="/"-->
<!--                              :nested-list="locales"/>-->
          </div>
          <div class="cm-navigation__buttons">
<!--            <nuxt-link to="/" class="b-button &#45;&#45;white &#45;&#45;border -login-button">-->
<!--              <span>{{ $t('buttons.login') }}</span>-->
<!--            </nuxt-link>-->
            <nuxt-link :to="localePathHelper('/careers')" class="b-button --white">
              <span>{{ $t('buttons.contactUs') }}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import BContainer from "../base/grid/b-container";
import BLogo from "../base/b-logo";
import BDropdownLinks from "../base/ui-elements/b-dropdown-links";
import search_icon from '~/assets/img/search-icon.svg?inline';
import BButton from "../base/buttons/b-button";

import { mapState } from 'vuex';
import objectValue from "../../utils/objectValue";
import {directive as onClickaway} from 'vue-clickaway';
export default {
  name: "m-navigation",
  components: {BButton, BDropdownLinks, BLogo, BContainer, search_icon},
  directives: {
    onClickaway: onClickaway,
  },
  data() {
    return {
      menu: [
        {
          name: 'Services',
          path: '/',
          nestedItems: [
            {
              name: 'item 1',
              path: '/'
            },
            {
              name: 'item 2',
              path: '/'
            },
            {
              name: 'item 3',
              path: '/'
            },
          ]
        },
        {
          name: 'Resources Hub',
          path: '/',
          nestedItems: [
            {
              name: 'item 1',
              path: '/'
            },
            {
              name: 'item 2',
              path: '/'
            },
            {
              name: 'item 3',
              path: '/'
            },
          ]
        },
      ],
      visibleMobileMenu: false,
      activeMenu: null,
    }
  },
  watch: {
    '$route.fullPath': {
      handler() {
        this.visibleMobileMenu = false;
      }
    }
  },
  computed: {
    locales() {
      return [...this.$i18n.locales].map(locale => {
        return {
          name: locale.code.toUpperCase(),
          path: locale.code !== 'en' ? `/${locale.code}` : '/'
        }
      });
    },
    ...mapState({
      navigation(state) {
        const locale = this.$i18n.locale;
        return objectValue(state.pages.navigation, locale, {});
      }
    })
  },
  methods: {
    toggleMenu() {
      this.visibleMobileMenu = !this.visibleMobileMenu
    },
    setActiveItem(nav) {
      if(this.activeMenu === nav) {
        this.activeMenu = null;
        return;
      }
      this.activeMenu = nav;
    }
  },
}
</script>
