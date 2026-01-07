<template>
  <section v-if="item" class="tv-detail">
    <!-- HERO -->
    <div class="hero" :style="heroStyle">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="row align-items-start g-5 flex-column flex-md-row">
          <div class="col-12 col-md-3 text-center text-md-start mb-4 mb-md-0">
            <div class="poster-wrapper">
  <img :src="poster(item.poster_path)" class="poster poster-mobile me-md-4" />
  <button class="play-btn" @click.stop="playIntro($event)">
  ▶
</button>
</div>
          </div>
          <div class="col-md-9 text-white text-center text-md-start">
            <h1 class="fw-bold mb-2 text-center text-md-start">{{ item.name }}</h1>
            <p class="text-white-50 fst-italic mb-3 text-center text-md-start" v-if="item.tagline">“{{ item.tagline }}”</p>
            <div class="meta-row mb-3 justify-content-center justify-content-md-start">
              <span class="meta">⭐ {{ item.vote_average }}</span>
              <span class="meta">{{ item.number_of_seasons }} Seasons</span>
              <span class="meta">{{ year }}</span>
            </div>
            <div class="genre-row mb-3 justify-content-center justify-content-md-start">
              <span v-for="g in item.genres" :key="g.id" class="genre">{{ g.name }}</span>
            </div>
            <p class="overview text-center text-md-start">{{ item.overview }}</p>
            <!-- ACTION BUTTONS -->
<div class="action-buttons mt-4 d-flex gap-3 justify-content-center justify-content-md-start">
  
  <button class="btn-watch" @click.stop="playIntro($event)">
  ▶ Watch Now
</button>

<button class="btn-download" @click.stop="openRegister">
  ⬇ Download
</button>

</div>

          </div>
        </div>
      </div>
    </div>
<!-- INLINE AD BELOW CTA -->
<client-only>
  <div class="inline-ad-banner">
    <div class="ad-box">
      <script>
        atOptions = {
          'key' : '911a0e9cb77d10c35e1db29cde2c0a34',
          'format' : 'iframe',
          'height' : 60,
          'width' : 468,
          'params' : {}
        };
      </script>
      <script src="https://www.highperformanceformat.com/911a0e9cb77d10c35e1db29cde2c0a34/invoke.js"></script>
    </div>
  </div>
</client-only>


    <!-- CONTENT -->
    <div class="container content">
      <div class="row g-4">
        <!-- MAIN -->
        <div class="col-lg-8">
          <section class="panel episodes-panel" @click="onEpisodeClick">
  <h5 class="panel-title">Seasons</h5>
  <Seasons
    :number="item.number_of_seasons"
    :seasons="item.seasons"
  />
</section>


          <section class="panel">
  <h5 class="panel-title">Episodes</h5>

  <div class="episode-grid">
    <div
      v-for="ep in episodes"
      :key="ep.id"
      class="episode-card"
      @click="playIntro"
    >
      <div
        class="episode-thumb"
        :style="{
          backgroundImage: ep.still_path
            ? `url(${IMAGE_STILL + ep.still_path})`
            : 'linear-gradient(135deg,#222,#111)'
        }"
      >
        <div class="episode-play">▶</div>
      </div>

      <div class="episode-info">
        <strong>Episode {{ ep.episode_number }}</strong>
        <span>{{ ep.name }}</span>
      </div>
    </div>
  </div>
</section>



          <section class="panel">
            <h5 class="panel-title">Cast</h5>
            <Casts :id="$route.params.id" type="tv" />
          </section>

          <section class="panel">
            <h5 class="panel-title">Recommendations</h5>
            <Recommendations :id="$route.params.id" type="tv" />
          </section>
        </div>

        <!-- SIDEBAR -->
        <div class="col-lg-4">
          <aside class="panel sticky">
            <h6 class="panel-title">Series Info</h6>
            <ul class="info-list">
              <li><span>Status</span><strong>{{ item.status }}</strong></li>
              <li><span>First Air</span><strong>{{ item.first_air_date }}</strong></li>
              <li><span>Episodes</span><strong>{{ item.number_of_episodes }}</strong></li>
              <li><span>Language</span><strong>{{ item.original_language }}</strong></li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
<client-only>
  <!-- ADS PANEL -->
<client-only>
  <div class="panel ad-panel ad-compact">
    <div class="ad-header">Sponsored</div>

    <div class="ad-wrapper">
      <div
        id="container-cd1096097e3fd55fe2a731d9cf31759e"
        class="ad-container"
      ></div>
    </div>

    <script
      async
      data-cfasync="false"
      src="https://pl27866130.effectivegatecpm.com/cd1096097e3fd55fe2a731d9cf31759e/invoke.js">
    </script>
  </div>
</client-only>

  <!-- INTRO VIDEO -->
  <video
    ref="intro"
    class="intro-video-cinema"
    playsinline
    muted
    preload="auto"
  >
    <source src="/video/movie.mp4" type="video/mp4" />
  </video>

<!-- PREMIUM REGISTER MODAL -->
<div class="modal fade premium-modal" id="registerModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-md">
    <div class="modal-content premium-modal-content">

      <div class="modal-body text-center px-4 py-5">

        <!-- ICON -->
        <div class="lock-circle mb-4">
          <span>🎬</span>
        </div>

        <!-- TITLE -->
        <h3 class="fw-bold text-white mb-2">
          Continue Watching
        </h3>

        <!-- DESC -->
        <p class="text-white-50 mb-4">
          Choose how you want to continue watching
        </p>

        <!-- OPTIONS -->
        <div class="register-options mt-4">

          <!-- FREE (ADS) -->
          <button
            type="button"
            class="btn btn-free w-100"
            @click="goFree"
          >
            ▶ Watch Free
            <span>With Ads · Limited Access</span>
          </button>

          <!-- VIP (NO ADS) -->
          <button
            type="button"
            class="btn btn-vip w-100"
            @click="goVip"
          >
            ⭐ Watch VIP
            <span>No Ads · Full Access</span>
          </button>

        </div>

      </div>

    </div>
  </div>
</div>

</client-only>
  </section>
</template>

<script>
const mopie = require('~/mopie')
export default {
  data () {
  return {
    item: null,
    episodes: [],
    IMAGE_STILL: mopie.IMAGE_BACKDROP
  }
},
  async fetch () {
  // TV DETAIL
  this.item = await this.$axios.$get(`tv/${this.$route.params.id}`, {
    params: {
      api_key: mopie.API_KEY,
      language: this.$i18n.locale
    }
  })

  // EPISODES (SEASON 1)
  const epRes = await this.$axios.$get(
    `tv/${this.$route.params.id}/season/1`,
    {
      params: {
        api_key: mopie.API_KEY,
        language: this.$i18n.locale
      }
    }
  )

  this.episodes = epRes.episodes || []
  },
  
  computed: {
    heroStyle() {
      return this.item?.backdrop_path
        ? { backgroundImage: `url(${mopie.IMAGE_BACKDROP + this.item.backdrop_path})` }
        : {}
    }
  },
methods: {
  onEpisodeClick () {
    this.playIntro()
  },

  playIntro () {
    if (!process.client) return

    this.$nextTick(() => {
      const video = this.$refs.intro
      if (!video) return

      video.style.display = 'block'
      video.style.pointerEvents = 'auto'
      video.currentTime = 0
      video.muted = false
      video.play().catch(() => {})

      clearTimeout(this._registerTimer)
      this._registerTimer = setTimeout(() => {
        this.openRegister()
      }, 5000)
    })
  },

  openRegister () {
    const video = this.$refs.intro
    if (video) {
      video.pause()
      video.style.display = 'none'
      video.style.pointerEvents = 'none'
    }

    if (!window.bootstrap) return
    const modalEl = document.getElementById('registerModal')
    if (!modalEl) return

    new window.bootstrap.Modal(modalEl).show()
  },

  // 🆓 WATCH FREE (ADS)
  goFree () {
    const modalEl = document.getElementById('registerModal')
    const modal = window.bootstrap?.Modal.getInstance(modalEl)
    if (modal) modal.hide()

    window.location.href =
      'https://www.effectivegatecpm.com/ki3fres5x?key=c49bce582abbca07ce346efb9a0faa9d'
  },

  // ⭐ WATCH VIP (NO ADS)
  goVip () {
    if (!process.client) return

    const modalEl = document.getElementById('registerModal')
    const modal = window.bootstrap?.Modal.getInstance(modalEl)
    if (modal) modal.hide()

    setTimeout(() => {
      window.location.replace(
        'https://playfloowz.com/c?a=268&o=4&sub2=Tonz'
      )
    }, 250)
  },

  poster (p) {
    return p ? mopie.IMAGE_POSTER + p : '/images/no-poster.png'
  }
},


}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 65vh;
  background-size: cover;
  background-position: center;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.9), rgba(0,0,0,.45));
}
.hero-content {
  position: relative;
  padding: 4.5rem 0 3rem;
}
.poster-wrapper {
  position: relative;
  display: inline-block;
}

.play-btn {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,.65);
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform .2s ease, background .2s ease;
}
.play-btn:hover {
  transform: scale(1.1);
  background: rgba(0,0,0,.85);
}

.poster {
  width: 100%;
  border-radius: 18px;
  box-shadow: 0 20px 40px rgba(0,0,0,.55);
}
.poster-mobile {
  max-width: 220px;
  margin: 0 auto;
}
.meta-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.meta {
  font-size: .85rem;
  padding: .35rem .6rem;
  background: rgba(0,0,0,.45);
  border-radius: 6px;
}
.genre-row {
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
}
.genre {
  font-size: .75rem;
  padding: .3rem .55rem;
  background: rgba(255,255,255,.12);
  border-radius: 999px;
}
.overview {
  max-width: 720px;
  line-height: 1.65;
}
.content {
  margin-top: -3rem;
}
.panel {
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.75rem;
}
.panel-title {
  margin-bottom: 1rem;
  font-weight: 600;
}
.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.info-list li {
  display: flex;
  justify-content: space-between;
  margin-bottom: .75rem;
}
.sticky {
  position: sticky;
  top: 90px;
}

@media (max-width: 767px) {
  .hero {
    min-height: auto;
  }
  .hero-content {
    padding: 3rem 0 2rem;
  }
  .overview {
    max-width: 100%;
  }
  .content {
    margin-top: -1.5rem;
  }
}
.intro-video-cinema {
  position: fixed;
  inset: 0;
  margin: auto;
  width: 70vw;
  max-width: 960px;
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  background: black;
  z-index: 9999;
  display: none;

  box-shadow:
    0 40px 80px rgba(0,0,0,.7),
    0 0 0 2000px rgba(0,0,0,.65);
}

@media (max-width: 768px) {
  .intro-video-cinema {
    width: 95vw;
    border-radius: 14px;
  }
}
/* === MODAL BACKDROP === */
.premium-modal .modal-dialog {
  max-width: 420px;
}

.premium-modal-content {
  border: none;
  border-radius: 22px;
  background: linear-gradient(
    160deg,
    rgba(25, 25, 35, 0.95),
    rgba(10, 10, 20, 0.95)
  );
  box-shadow:
    0 30px 80px rgba(0,0,0,.65),
    inset 0 0 0 1px rgba(255,255,255,.08);
  backdrop-filter: blur(14px);
}

/* LOCK ICON */
/* LOCK ICON — ELEGANT PREMIUM */
.lock-circle {
  width: 88px;
  height: 88px;
  border-radius: 50%;

  background: linear-gradient(
    160deg,
    #f5c77a,
    #e6a23c
  );

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  box-shadow:
    0 12px 28px rgba(0,0,0,.25),
    inset 0 1px 0 rgba(255,255,255,.35),
    inset 0 -2px 6px rgba(0,0,0,.25);

  position: relative;
}

/* SOFT RING (HALUS, BUKAN GLOW) */
.lock-circle::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.25);
}

/* ICON STYLE */
.lock-circle span {
  font-size: 2.1rem;
  color: #1f1f1f;
  font-weight: 600;
  text-shadow: 0 1px 1px rgba(255,255,255,.3);
}

/* CTA BUTTON */
/* CREATE FREE ACCOUNT – MATCH WATCH NOW */
.premium-btn {
  background: linear-gradient(
    135deg,
    #ffb703,   /* kuning emas */
    #fb8500    /* orange */
  );
  border: none;
  border-radius: 14px;
  padding: 14px;
  font-weight: 700;
  font-size: 1rem;
  color: #1a1a1a;
  letter-spacing: .3px;
  box-shadow:
    0 14px 35px rgba(251, 133, 0, 0.55);
  transition: all .25s ease;
}

/* HOVER */
.premium-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow:
    0 22px 55px rgba(251, 133, 0, 0.75);
}

/* ACTIVE */
.premium-btn:active {
  transform: scale(.97);
}


/* MOBILE */
@media (max-width: 480px) {
  .premium-modal-content {
    border-radius: 18px;
  }
}
/* ACTION BUTTON WRAPPER */
.action-buttons {
  flex-wrap: wrap;
}

/* WATCH NOW */
.btn-watch {
  background: linear-gradient(135deg, #6a5cff, #8f7bff);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 14px 26px;
  font-weight: 600;
  font-size: .95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 14px 40px rgba(106,92,255,.45);
  transition: all .25s ease;
}

/* WATCH NOW – YELLOW ORANGE CINEMA */
.btn-watch {
  background: linear-gradient(
    135deg,
    #ffb703,   /* kuning emas */
    #fb8500    /* orange */
  );
  color: #1a1a1a;
  border: none;
  border-radius: 14px;
  padding: 14px 28px;
  font-weight: 700;
  font-size: .95rem;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow:
    0 12px 35px rgba(251, 133, 0, 0.55);
  transition: all .25s ease;
}

/* HOVER */
.btn-watch:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow:
    0 20px 55px rgba(251, 133, 0, 0.75);
}

/* ICON */
.btn-watch span,
.btn-watch i {
  font-size: 1.05rem;
}


/* DOWNLOAD */
.btn-download {
  background: rgba(255,255,255,.08);
  color: #fff;
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 14px;
  padding: 14px 24px;
  font-weight: 500;
  font-size: .95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(8px);
  transition: all .25s ease;
}

.btn-download:hover {
  background: rgba(255,255,255,.15);
  transform: translateY(-2px);
}

/* MOBILE */
@media (max-width: 767px) {
  .action-buttons {
    justify-content: center;
  }

  .btn-watch,
  .btn-download {
    width: 100%;
    justify-content: center;
  }
}
.hero {
  position: relative;
  z-index: 1;
}

.hero-overlay {
  pointer-events: none;
}
.intro-video {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: none;
  pointer-events: none; /* 🔥 INI KUNCINYA */
}
.panel,
.episodes,
.seasons {
  position: relative;
  z-index: 50;
  pointer-events: auto;
}
.premium-btn {
  text-shadow: 0 1px 2px rgba(255,255,255,.4);
}
/* =========================
   ULTRA COMPACT MOBILE CTA
   ========================= */
@media (max-width: 576px) {

  .action-buttons {
    padding: 0 14px !important;   /* ⛔ jauh dari tepi */
    gap: 8px !important;
  }

  .btn-watch,
  .btn-download {
    width: auto !important;
    padding: 6px 10px !important; /* 🔥 SUPER KECIL */
    font-size: 0.7rem !important; /* 🔥 */
    border-radius: 9px !important;
    min-height: 30px !important;  /* batas sentuh */
    line-height: 1.1 !important;
  }

  .btn-watch span,
  .btn-download span {
    font-size: 0.7rem !important;
  }
}
/* =========================
   EPISODE GRID (PREMIUM)
   ========================= */
.episode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

/* CARD */
.episode-card {
  cursor: pointer;
  transition: transform .25s ease, box-shadow .25s ease;
}

.episode-card:hover {
  transform: translateY(-5px);
}

/* THUMB */
.episode-thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0,0,0,.45);
}

/* GRADIENT OVERLAY */
.episode-thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,.75),
    rgba(0,0,0,.15)
  );
}

/* PLAY ICON */
.episode-play {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(0,0,0,.75);
  color: #ffb703;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(.9);
  transition: all .25s ease;
}

.episode-card:hover .episode-play {
  opacity: 1;
  transform: scale(1);
}

/* INFO */
.episode-info {
  margin-top: 8px;
}

.episode-info strong {
  display: block;
  font-size: .85rem;
  font-weight: 600;
}

.episode-info span {
  font-size: .7rem;
  color: rgba(255,255,255,.6);
  line-height: 1.2;
}
/* =========================
   MOBILE EPISODE COMPACT
   ========================= */
@media (max-width: 576px) {

  .episode-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 0 6px; /* ⛔ tidak mentok kiri kanan */
  }

  .episode-thumb {
    border-radius: 12px;
  }

  .episode-play {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }

  .episode-info strong {
    font-size: .7rem;
  }

  .episode-info span {
    font-size: .6rem;
  }
}


.episode-card {
  cursor: pointer;
  transition: transform .25s ease;
}

.episode-card:hover {
  transform: translateY(-4px);
}

.episode-thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.episode-thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top,rgba(0,0,0,.65),transparent);
}

.episode-play {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(0,0,0,.75);
  color: #ffb703;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity .25s ease;
}

.episode-card:hover .episode-play {
  opacity: 1;
}

.episode-info {
  margin-top: 6px;
  font-size: .8rem;
}

.episode-info span {
  display: block;
  color: rgba(255,255,255,.65);
  font-size: .7rem;
}

/* =========================
   EPISODE TEXT – GOLD
   ========================= */

/* Judul Episode */
.episode-info strong {
  color: #ffb703; /* GOLD UTAMA */
  font-weight: 700;
  letter-spacing: .2px;
}

/* Subjudul Episode */
.episode-info span {
  color: rgba(255,183,3,.7); /* GOLD SOFT */
}

/* Hover Accent */
.episode-card:hover .episode-info strong {
  text-shadow: 0 2px 10px rgba(255,183,3,.35);
}
.panel-title {
  color: #ffb703;
  letter-spacing: .3px;
}
/* =========================
   ADSTERRA — BALANCED SIZE
   ========================= */

.ad-compact {
  padding: 12px;
}

/* Label */
.ad-header {
  font-size: 0.65rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255,255,255,.45);
  text-align: center;
  margin-bottom: 8px;
}

/* Center */
.ad-wrapper {
  display: flex;
  justify-content: center;
}

/* ⬅️ UKURAN UTAMA */
.ad-container {
  width: 320px;          /* 🔥 LEBIH BESAR */
  max-width: 100%;
  min-height: 220px;     /* proporsional */
  overflow: hidden;
  border-radius: 14px;
}

/* Isi iklan */
.ad-container iframe,
.ad-container img,
.ad-container ins {
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  border-radius: 14px;
}

/* MOBILE */
@media (max-width: 768px) {
  .ad-container {
    width: 280px;        /* 🔥 pas di HP */
    min-height: 200px;
  }
}
.ad-compact {
  background: linear-gradient(
    180deg,
    rgba(255,255,255,.03),
    rgba(255,255,255,.01)
  );
  border: 1px solid rgba(255,255,255,.08);
}
/* =========================
   INLINE AD BELOW CTA
   ========================= */

.inline-ad-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 14px;
}

/* Label kecil */
.ad-label {
  font-size: 0.6rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255,255,255,.4);
  margin-bottom: 6px;
}

/* Box iklan */
.ad-box {
  max-width: 468px;
  width: 100%;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 12px;
}

/* Paksa rapi */
.ad-box iframe {
  max-width: 100% !important;
  border-radius: 10px;
}

/* MOBILE */
@media (max-width: 576px) {
  .ad-box {
    max-width: 320px;   /* 🔥 tidak kepanjangan di HP */
  }
}
.inline-ad-banner {
  position: relative;
  z-index: 20; /* lebih tinggi dari season */
}
.inline-ad-banner,
.inline-ad-banner * {
  pointer-events: auto;
}

.seasons {
  pointer-events: auto;
}
.inline-ad-banner {
  margin-bottom: 32px; /* 🔥 jarak aman ke Seasons */
}
/* =========================
   REGISTER OPTIONS
   ========================= */

.register-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* FREE – WHITE / CLEAN */
.btn-free {
  background: rgba(255,255,255,.92);
  color: #111;
  border-radius: 14px;
  padding: 14px;
  font-weight: 700;
  font-size: .95rem;
  border: none;
  transition: all .25s ease;
}

.btn-free span {
  display: block;
  font-size: .7rem;
  font-weight: 500;
  color: rgba(0,0,0,.6);
  margin-top: 2px;
}

.btn-free:hover {
  background: #fff;
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(0,0,0,.25);
}

/* VIP – GOLD PREMIUM */
.btn-vip {
  background: linear-gradient(
    135deg,
    #ffb703,
    #fb8500
  );
  color: #1a1a1a;
  border-radius: 14px;
  padding: 14px;
  font-weight: 800;
  font-size: .95rem;
  border: none;
  transition: all .25s ease;
  box-shadow: 0 14px 40px rgba(251,133,0,.55);
}

.btn-vip span {
  display: block;
  font-size: .7rem;
  font-weight: 600;
  color: rgba(0,0,0,.7);
  margin-top: 2px;
}

.btn-vip:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 22px 55px rgba(251,133,0,.75);
}

.btn-vip:active {
  transform: scale(.97);
}

</style>
