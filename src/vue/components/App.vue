<template>
  <div>
    <div class="button" @click="$router.go(-1)">Back</div>
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
