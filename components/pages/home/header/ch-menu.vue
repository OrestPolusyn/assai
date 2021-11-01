<template>
  <div class="c-header-menu" :class="{ visible: visible }">
    <div class="c-header-menu__wrap">
      <svg class="--main-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-1.84492e-07 1.90798e-07L1.90735e-06 24L24 11.9294L-1.84492e-07 1.90798e-07Z" fill="#F7F7F7"/>
      </svg>
      <div class="c-header-menu__list-wrap" v-for="menu in menuList" :key="menu.name">
        <div class="c-header-menu__wrapper">
          <b-title class-level="4" level="2">
            <nuxt-link :to="localePathHelper(menu.nestedItems ? `/${menu.slug}` : `/${menu.type}/${menu.slug}`)">
              {{ menu.title }}
            </nuxt-link>
          </b-title>
          <ul v-if="menu.nestedItems" class="c-header-menu__list">
            <li class="c-header-menu__list-item" v-for="nestedItem in menu.nestedItems">
              <nuxt-link class="c-header-menu__list-link" :to="localePathHelper(`/${menu.slug}/${nestedItem.slug}`)">
                <svg class="--nested-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-1.84492e-07 1.90798e-07L1.90735e-06 24L24 11.9294L-1.84492e-07 1.90798e-07Z" fill="#F7F7F7"/>
                </svg>
                {{ nestedItem.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ch-header-slider__hide-overlay"
         @click="$emit('click')"
         :class="{ visible: !visible, transparent: visible }">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 3.26809e-07L2.56154e-07 0L12.0706 24L24 3.26809e-07Z" fill="#F7F7F7"/>
      </svg>
      <b-title class-level="2" level="2" class="ch-header-slider__hide-title">
        {{ mainTitle }}
      </b-title>
    </div>
  </div>
</template>

<script>
import BTitle from "../../../base/content/b-title";
export default {
  name: "ch-menu",
  components: {BTitle},
  props: {
    mainTitle: {
      type: String,
      default: 'Company'
    },
    visible: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      default: () => {
        return [
          {
            title: 'About Us',
            slug: 'testing',
            nestedItems: [
              {
                title: 'item 1',
                slug: 'test'
              },
              {
                title: 'item 2',
                slug: 'test'
              },
              {
                title: 'item 3',
                slug: 'test'
              },
              {
                title: 'item 1',
                slug: 'test'
              },
              {
                title: 'item 2',
                slug: 'test'
              },
              {
                title: 'item 3',
                slug: 'test'
              },
            ]
          },
          {
            title: 'About Us 2',
            slug: '/',
            nestedItems: [
              {
                title: 'item 1',
                slug: 'test'
              },
              {
                title: 'item 2',
                slug: 'test'
              },
              {
                title: 'item 3',
                slug: 'test'
              },
            ]
          },
        ]
      }
    }
  },
}
</script>
