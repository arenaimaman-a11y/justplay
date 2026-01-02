<template>
  <div v-if="results">
    <h2 class="h5 mb-3 text-muted">{{ $t('Cast') }}</h2>

    <!-- ✅ client-only -->
    <client-only>
      <Carousel
        :perPage="4"
        :perPageCustom="[[768, 6], [1024, 7], [1524, 8]]"
        :paginationEnabled="false"
        :navigationEnabled="true"
      >
        <Slide
          v-for="(item, index) in results.cast"
          :key="index"
          class="small"
        >
          <NuxtLink
            :to="localePath({ name: 'person-id', params: { id: item.id } })"
            :title="item.name"
            class="cast_name"
          >
            <img
              :src="poster(item.profile_path)"
              :alt="item.name"
              class="img-fluid rounded"
            >
            {{ item.name }}
          </NuxtLink>

          <div class="text-muted">{{ item.character }}</div>
        </Slide>
      </Carousel>
    </client-only>
  </div>
</template>

<script>
const mopie = require('~/mopie')

export default {
  props: ['type', 'id'],

  // ✅ dynamic import client-only
  components: {
    Carousel: () =>
      process.client
        ? import('vue-carousel').then(m => m.Carousel)
        : null,

    Slide: () =>
      process.client
        ? import('vue-carousel').then(m => m.Slide)
        : null
  },

  data() {
    return {
      results: null
    }
  },

  created() {
    this.getCredits()
  },

  methods: {
    slug(txt = '') {
      return txt
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    },

    getCredits() {
      const params = {
        api_key: mopie.API_KEY,
        language: this.$i18n.locale
      }

      this.$axios
        .$get(`/${this.type}/${this.id}/credits`, { params })
        .then(res => {
          this.results = res
        })
    },

    poster(poster) {
      if (!poster) {
        return '/images/no-poster.png'
      }
      return mopie.IMAGE_POSTER_THUMB + poster
    }
  }
}
</script>
