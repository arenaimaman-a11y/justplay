<template>
  <div v-if="results.length">
    <h2 class="h5 mb-3 text-muted">{{ $t('Similars') }}</h2>

    <!-- ✅ WAJIB: client-only -->
    <client-only>
      <Carousel
        :perPage="3"
        :perPageCustom="[[1024, 5]]"
        :paginationEnabled="false"
        :navigationEnabled="true"
      >
        <Slide v-for="(item, index) in results" :key="index">
          <Items :item="item" :type="type" />
        </Slide>
      </Carousel>
    </client-only>
  </div>
</template>

<script>
const mopie = require('~/mopie')

export default {
  props: ['type', 'id'],

  // ✅ GANTI import static → dynamic client-only
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
      results: []
    }
  },

  mounted() {
    this.getCredits()
  },

  methods: {
    getCredits() {
      const params = {
        api_key: mopie.API_KEY,
        language: this.$i18n.locale
      }

      this.$axios
        .$get(`/${this.type}/${this.id}/similar`, { params })
        .then(res => {
          this.results = res.results
        })
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
