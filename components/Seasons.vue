<template>
  <div v-if="seasons">
    <h2 class="h5 mb-3 text-muted">{{ number }} {{ $t('Seasons') }}</h2>

    <!-- ✅ client-only WAJIB -->
    <client-only>
      <Carousel
        :perPage="4"
        :perPageCustom="[[1024, 6]]"
        :paginationEnabled="false"
        :navigationEnabled="true"
      >
        <Slide
          v-for="(item, index) in seasons.slice().reverse()"
          :key="index"
        >
          <a
            href="#"
            :title="item.name"
            class="text-decoration-none cast_name"
            @click.prevent="changeSeason(item.season_number)"
          >
            <img
              :src="poster(item.poster_path)"
              :alt="item.name"
              class="img-fluid rounded"
            >
            <div class="small">{{ item.name }}</div>
          </a>
        </Slide>
      </Carousel>
    </client-only>
  </div>
</template>

<script>
const mopie = require('~/mopie')

export default {
  props: ['tvid', 'seasons', 'number', 'title'],

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

  methods: {
    poster(poster) {
      if (!poster) {
        return '/images/no-poster.png'
      }
      return mopie.IMAGE_POSTER_THUMB + poster
    },

    slug(txt = '') {
      return txt
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    },

    changeSeason(season_number) {
      this.$nuxt.$emit('changeSeason', season_number)
    }
  }
}
</script>

<style scoped>
.cast_name {
  color: #f1c830;
  text-decoration: none;
}
.cast_name:hover {
  color: #d5d5d5;
}
</style>
