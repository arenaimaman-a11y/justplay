<template>
  <div>
    <!-- MOVIE -->
    <div v-if="genre.type === 'movie' && movies.total_pages">
      <h2 class="h4 mb-3">
        {{ $t('Top Genre Movies', { genre: genre.name }) }}
      </h2>

      <client-only>
        <Carousel
          :perPage="3"
          :perPageCustom="[[1024, 4], [1400, 8]]"
          :paginationEnabled="false"
          :navigationEnabled="true"
        >
          <Slide
            v-for="(item, index) in movies.results"
            :key="genre.id + index"
          >
            <Items :item="item" :type="'movie'" />
          </Slide>
        </Carousel>
      </client-only>
    </div>

    <!-- TV -->
    <div v-if="genre.type === 'tv' && tvshows.total_pages">
      <h2 class="h4 mb-3">
        {{ $t('Top Genre Tv Shows', { genre: genre.name }) }}
      </h2>

      <client-only>
        <Carousel
          :perPage="3"
          :perPageCustom="[[1024, 4], [1400, 8]]"
          :paginationEnabled="false"
          :navigationEnabled="true"
        >
          <Slide
            v-for="(item, index) in tvshows.results"
            :key="genre.id + index"
          >
            <Items :item="item" :type="'tv'" />
          </Slide>
        </Carousel>
      </client-only>
    </div>
  </div>
</template>

<script>
const mopie = require('~/mopie')

export default {
  props: ['genre'],

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
      movies: [],
      tvshows: []
    }
  },

  created() {
    this.getData()
  },

  methods: {
    async getData() {
      const params = {
        api_key: mopie.API_KEY,
        include_adult: false,
        language: this.$i18n.locale,
        with_genres: this.genre.id,
        sort_by: 'vote_count.desc'
      }

      this.movies = await this.$axios.$get('discover/movie', {
        params
      })

      this.tvshows = await this.$axios.$get('discover/tv', {
        params
      })
    }
  }
}
</script>
