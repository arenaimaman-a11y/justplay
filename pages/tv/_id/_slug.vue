<template>
    <div>
        <Player :backdrop="backdrop" :title="item.name" :runtime="item.episode_run_time" />

        <div class="container box-info">
            <div class="row justify-content-center">
                <div class="col-lg-11">
                    <div class="card">
                        <div class="card-body pt-5 p-lg-4">
                            <div class="row">
                                <div class="col-lg-3 d-none d-lg-block">
                                    <aside>
                                        <img :src="poster(item.poster_path)" :alt="item.name" class="img-fluid rounded mb-4" />
                                        <div class="mb-3 d-flex justify-content-around">
                                            <div v-for="(item, index) in votes" :key="index" style="color: #f1c830">
                                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                </svg>
                                            </div>
                                            <div v-for="(item, index) in unvotes" :key="'un'+index">
                                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                </svg>
                                            </div>
                                        </div>
                                        
                                        <table class="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td>{{ $t('Genres') }}</td>
                                                    <td class="text-muted small"><span v-for="(it, index) in item.genres" :key="index">{{ it.name }}, </span></td>
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
                                            <h1 class="text-light h3">{{ item.name }} <span class="text-muted fs-4">({{ year }})</span></h1>
                                        </div>
                                        <div class="dl mb-3 mb-md-0 text-center">
                                            <ButtonDownload />
                                        </div>
                                    </div>
                                    <p class="text-muted">{{ item.overview }}</p>

                                    <!-- IKLAN NATIVE ADSTERRA -->
                                    <div class="my-4 text-center">
                                        <div class="ad-container">
                                            <div class="ad-item">
                                                <div id="container-cd1096097e3fd55fe2a731d9cf31759e"></div>
                                            </div>
                                            <div class="ad-item">
                                                <div id="container-cd1096097e3fd55fe2a731d9cf31759f"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <Seasons :number="item.number_of_seasons" :seasons="item.seasons" :title="slug(item.name)" class="mb-4" />
                                    <Episodes :tvId="$route.params.id" :seasonNumber="item.number_of_seasons" :episodeNumber="selectEpisode" />
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
        return {
            title: this.item.name + ' - ' + this.$i18n.t('Stream Free Movies & TV Shows'),
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.item.name + ' - ' + this.$i18n.t('Stream Free Movies & TV Shows')
                }
            ]
        }
    },

    async fetch() {
        const params = {
            api_key: mopie.API_KEY,
            include_adult: false,
            language: this.$i18n.locale
        }

        this.item = await this.$axios.$get(
            `tv/${this.$route.params.id}`,
            { params }
        )
    },

    data() {
        return {
            item: []
        }
    },

    computed: {
        id() {
            return this.$route.params.id
        },
        backdrop() {
            if (this.item) {
                return mopie.IMAGE_BACKDROP + this.item.backdrop_path
            }
        },
        year() {
            if (this.item.first_air_date) {
                return this.item.first_air_date.split('-')[0];
            }
        },
        votes() {
            if (this.item.vote_average) {
                return Math.round(this.item.vote_average)
            }
        },
        unvotes() {
            if (this.votes) {
                var unvote = 10 - this.votes
                return [...Array(unvote).keys()];
            }
        }
    },

    methods: {
        poster(poster) {
            if (poster == null) {
                return '/images/no-poster.png'
            }

            return mopie.IMAGE_POSTER + poster
        },
        slug(txt = '') {
            return txt
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
        },
        selectEpisode() {
            
        }
    }
}
</script>

<style scoped>
/* Wrapper untuk iklan banner */
.ad-container {
    display: block; /* Menggunakan layout block untuk memastikan elemen berada dalam satu baris */
    width: 100%; /* Lebar penuh dari kontainer induk */
    max-width: 100%; /* Menghilangkan pembatasan lebar maksimum agar kontainer bisa mengisi layar */
    margin: 0 auto; /* Menjaga iklan tetap di tengah */
    padding: 0; /* Menghapus padding jika tidak diperlukan */
    background-color: transparent; /* Transparent background */
    border: none; /* Menghilangkan border */
    outline: none; /* Menghilangkan outline */
}

/* Gaya untuk setiap elemen iklan */
.ad-container .ad-item {
    width: 100%; /* Setiap elemen iklan menggunakan 100% lebar kontainer induk */
    height: auto; /* Memastikan iklan tidak memanjang ke bawah */
    margin-bottom: 15px; /* Memberikan jarak antar elemen iklan */
    background-color: transparent; /* Memberikan warna latar belakang agar lebih terlihat */
    padding: 0; /* Padding 0 agar tidak ada jarak */
    border: none; /* Menghilangkan border */
}

/* Media Query untuk tampilan perangkat mobile */
@media (max-width: 576px) {
    .ad-container {
        width: 100%; /* Memastikan lebar penuh pada perangkat mobile */
    }

    .ad-container .ad-item {
        width: 100%; /* Setiap elemen tetap menggunakan lebar penuh pada perangkat mobile */
        margin-bottom: 15px; /* Jarak antar elemen di perangkat mobile */
        padding: 0; /* Padding lebih kecil di perangkat mobile */
    }
}
</style>
