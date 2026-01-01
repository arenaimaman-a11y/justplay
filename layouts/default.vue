<template>
  <div>
    <Navbar />
    <Nuxt class="py-4" />
    <Modal />
    <SignIn />
    <MenuMobile />
    <ModalSearch />
    <div class="modal-backdrop fade show" v-if="modalOpen"></div>
  </div>
</template>

<style scoped>
  .modal-open {
    overflow: hidden;
    padding-right: 17px;
  }
</style>
  
<script>
export default {
  data() {
    return {
      modalOpen: false
    }
  },
  mounted() {
    // ===== modal logic (kode kamu, tetap) =====
    this.$nuxt.$on('showModal', () => {
      this.modalOpen = true
    })

    this.$nextTick(() => {
      this.$nuxt.$on('routeChanged', () => {
        if (this.modalOpen) {
          this.modalOpen = false
        }
      })
    })

    // ===== Adsterra Pop-under (DITAMBAHKAN) =====
    if (!document.getElementById('adsterra-popunder')) {
      const script = document.createElement('script')
      script.id = 'adsterra-popunder'
      script.type = 'text/javascript'
      script.async = true
      script.src =
        'https://pl27866022.effectivegatecpm.com/4f/8c/ed/4f8cedfd3c7ebe8e5fc6a32e7a5c9e7d.js'

      document.body.appendChild(script)
    }
  }
}
</script>
