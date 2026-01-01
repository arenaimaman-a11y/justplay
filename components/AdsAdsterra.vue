<template>
  <div class="ad-native" ref="adWrapper">
    <!-- Adsterra Native Banner -->
    <div id="container-cd1096097e3fd55fe2a731d9cf31759e"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    // pastikan hanya load 1x
    if (document.getElementById('adsterra-native-script')) return

    // delay kecil agar DOM benar-benar siap
    setTimeout(() => {
      const script = document.createElement('script')
      script.id = 'adsterra-native-script'
      script.async = true
      script.setAttribute('data-cfasync', 'false')
      script.src =
        'https://pl27866130.effectivegatecpm.com/cd1096097e3fd55fe2a731d9cf31759e/invoke.js'

      // ⬅️ PENTING: append ke wrapper, BUKAN body
      this.$refs.adWrapper.appendChild(script)
    }, 200)
  }
}
</script>

<style scoped>
.ad-native {
  width: 100%;
  margin: 24px auto;
  text-align: center;
  min-height: 120px; /* cegah collapse sebelum iklan muncul */
}
</style>
