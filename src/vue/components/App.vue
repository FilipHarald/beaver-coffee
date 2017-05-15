<template>
  <div class="section">
    <div class="button" @click="$router.go(-1)">Back</div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>
