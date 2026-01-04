<template>
    <div>
        <Player :backdrop="backdrop" :title="item.title" :runtime="item.episode_run_time" />

        <div class="container box-info">
            <div class="row justify-content-center">
                <div class="col-lg-11">
                    <div class="card">
                        <div class="card-body pt-5 p-lg-4">
                            <div class="row">
                                <div class="col-lg-3 d-none d-lg-block">
                                    <aside>
                                        <img :src="poster(item.poster_path)" :alt="item.title" class="img-fluid rounded mb-4">

                                        <div class="mb-3 d-flex justify-content-around">
                                            <div v-for="(item, index) in votes" :key="index" style="color: #f1c830">
                                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                                </svg>
                                            </div>
                                            <div v-for="(item, index) in unvotes" :key="'un'+index">
                                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                                </svg>
                                            </div>
                                        </div>

                                        <table class="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td>{{ $t('Genres') }}</td>
                                                    <td class="text-muted small">
                                                        <span v-for="(it, index) in item.genres" :key="index">
                                                            {{ it.name }},
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>{{ $t('Runtime') }}</td>
                                                    <td class="text-muted small">{{ this._.head(item.episode_run_time) }} min</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </aside>
                                </div>

                                <div class="col-lg-9">
                                    <div class="d-flex justify-content-center justify-content-md-between align-items-center mb-4 flex-column-reverse flex-md-row">
                                        <div class="title">
                                            <h1 class="text-light h3">
    {{ item.name }}
    <span v-if="episodeInfo">
        - Season {{ episodeInfo.season }} Episode {{ episodeInfo.episode }}
    </span>
    <span class="text-muted fs-4">({{ year }})</span>
</h1>

                                        </div>
                                        <div class="dl mb-3 mb-md-0 text-center">
                                            <ButtonDownload />
                                        </div>
                                    </div>

                                    <p class="text-muted">{{ item.overview }}</p>

                                    <!-- ===== NATIVE ADS START ===== -->
                                    <div class="my-4 text-center">
                                        <div id="container-cd1096097e3fd55fe2a731d9cf31759e"></div>
                                    </div>
                                    <!-- ===== NATIVE ADS END ===== -->

                                    <Seasons
                                        :number="item.number_of_seasons"
                                        :seasons="item.seasons"
                                        :title="slug(item.name)"
                                        class="mb-4"
                                    />

                                    <Episodes
                                        :tvId="$route.params.id"
                                        :seasonNumber="item.number_of_seasons"
                                        :episodeNumber="selectEpisode"
                                    />

                                    <Casts :id="$route.params.id" :type="'tv'" class="mb-4" />
                                    <Recommendations :id="$route.params.id" :type="'tv'" />
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
    let title = this.item.name || ''

    if (this.episodeInfo) {
        title += ` - Season ${this.episodeInfo.season} Episode ${this.episodeInfo.episode}`
    }

    return {
        title,

        meta: [
            {
                hid: 'description',
                name: 'description',
                content: title
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: title
            },
            {
                hid: 'og:type',
                property: 'og:type',
                content: 'video.episode'
            }
        ],

        link: [
            {
                rel: 'canonical',
                href: `https://justplay-tv.online/tv/${this.$route.params.id}/${this.$route.params.slug}`
            }
        ],

        // 🔥 STRUCTURED DATA (LEVEL PRO)
        script: this.episodeInfo
            ? [
                  {
                      hid: 'ld-json-episode',
                      type: 'application/ld+json',
                      json: {
                          '@context': 'https://schema.org',
                          '@type': 'TVEpisode',
                          name: title,
                          episodeNumber: this.episodeInfo.episode,
                          seasonNumber: this.episodeInfo.season,
                          partOfSeries: {
                              '@type': 'TVSeries',
                              name: this.item.name
                          },
                          url: `https://justplay-tv.online/tv/${this.$route.params.id}/${this.$route.params.slug}`
                      }
                  }
              ]
            : []
    }
},

    async fetch() {
        let params = {
            api_key: mopie.API_KEY,
            include_adult: false,
            language: this.$i18n.locale
        }
        this.item = await this.$axios.$get(`tv/${this.$route.params.id}`, { params })
    },

    
    data() {
        return {
            item: []
        }
    },

    computed: {
        backdrop() {
            return this.item ? mopie.IMAGE_BACKDROP + this.item.backdrop_path : ''
        },

        year() {
            return this.item.first_air_date
                ? this.item.first_air_date.split('-')[0]
                : ''
        },

        votes() {
            return this.item.vote_average
                ? Math.round(this.item.vote_average)
                : 0
        },

        unvotes() {
            return this.votes ? [...Array(10 - this.votes).keys()] : []
        },

// 🔥 INI KUNCI SEASON & EPISODE (SEO READY)
episodeInfo() {
    const slug = this.$route.params.slug || ''

    // Support:
    // the-pitt-S2-E1
    // the-pitt-s2-e1
    // the-pitt-s02e01
    const match = slug.match(/-s(\d{1,2})[-]?e(\d{1,2})$/i)

    if (!match) return null

    return {
        season: parseInt(match[1], 10),
        episode: parseInt(match[2], 10)
    }
}

    },

    methods: {
        poster(poster) {
            return poster ? mopie.IMAGE_POSTER + poster : '/images/no-poster.png'
        },

        slug(txt = '') {
            return txt.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        },

        selectEpisode() {}
    }
}
</script>

