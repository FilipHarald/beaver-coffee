<template>
  <div class="modal" ref="modal">
    <div class="modal-background" @click="hide"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="modal-card-title">
          <slot name="title"></slot>
        </div>
      </header>
      <div class="modal-card-body">

      <slot name="body"></slot>

      </div>
      <footer class="modal-card-foot">
        <slot name="footer"></slot>
      </footer>
    </div>
    <button class="modal-close" @click="hide"></button>
  </div>
</template>

<script>
  export default {
    props: {
      value: Boolean
    },

    watch: {
      value () {
        if (this.value)
          this.$refs.modal.classList.add('is-active')
        else
          this.$refs.modal.classList.remove('is-active')
      }
    },

    methods: {
      hide () {
        this.$emit('input', false)
      }
    }
  }
</script>
