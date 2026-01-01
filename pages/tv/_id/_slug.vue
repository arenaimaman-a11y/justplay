<template>
  <div>
    <Player
      :backdrop="backdrop"
      :title="item.name"
      :runtime="item.episode_run_time"
    />

    <div class="container box-info">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="card">
            <div class="card-body pt-5 p-lg-4">
              <div class="row">
                <!-- SIDEBAR -->
                <div class="col-lg-3 d-none d-lg-block">
                  <aside>
                    <img
                      :src="poster(item.poster_path)"
                      :alt="item.name"
                      class="img-fluid rounded mb-4"
                    />

                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <td>Genres</td>
                          <td class="text-muted small">
                            <span v-for="(g,i) in item.genres" :key="i">
                              {{ g.name }},
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Runtime</td>
                          <td class="text-muted small">
                            {{ item.episode_run_time?.[0] }} min
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </aside>
                </div>

                <!-- CONTENT -->
                <div class="col-lg-9">
                  <h1 class="text-light h3 mb-3">
                    {{ item.name }}
                    <span class="text-muted fs-5">({{ year }})</span>
                  </h1>

                  <p class="text-muted">{{ item.overview }}</p>

                  <!-- 🔥 ADSTERRA NATIVE TV -->
                  <div class="ad-wrapper my-4">
                    <!-- Kode iklan Adsterra -->
                    <script async="async" data-cfasync="false" src="https://pl27866130.effectivegatecpm.com/cd1096097e3fd55fe2a731d9cf31759e/invoke.js"></script>
                    <div id="container-cd1096097e3fd55fe2a731d9cf31759e"></div>
                  </div>

                  <Seasons
                    :number="item.number_of_seasons"
                    :seasons="item.seasons"
                    :title="slug(item.name)"
                    class="mb-4"
                  />

                  <Episodes
                    :tvId="$route.params.id"
                    :seasonNumber="item.number_of_seasons"
                  />

                  <Casts :id="$route.params.id" type="tv" class="mb-4" />
                  <Recommendations :id="$route.params.id" type="tv" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const mopie = require('~/mopie')

export default {
  name: 'tv-id-slug',

  head() {
    return {
      title: `${this.item.name} - Stream Free Movies & TV Shows`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.item.name} - Stream Free Movies & TV Shows`
        }
      ]
    }
  },

  async fetch() {
    const params = {
      api_key: mopie.API_KEY,
      language: this.$i18n.locale
    }
    this.item = await this.$axios.$get(
      `tv/${this.$route.params.id}`,
      { params }
    )
  },

  data() {
    return {
      item: {}
    }
  },

  computed: {
    backdrop() {
      return this.item.backdrop_path
        ? mopie.IMAGE_BACKDROP + this.item.backdrop_path
        : ''
    },
    year() {
      return this.item.first_air_date?.split('-')[0]
    }
  },

  methods: {
    poster(p) {
      return p
        ? mopie.IMAGE_POSTER + p
        : '/images/no-poster.png'
    },
    slug(t='') {
      return t.toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]/g,'')
    }
  }
}
</script>

<style scoped>
/* Iklan TANPA garis putih & TANPA mengecil */
.ad-wrapper {
  width: 100%;
  min-height: 120px;
  background: transparent;
}

#adsterra-tv {
  width: 100%;
}
</style>
