<template>
  <div id="app">
    <router-view/>
    <button @click="btn">请求</button>
  </div>
</template>

<script>
import * as api from './api/api'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods: {
     async btn() {
      let obj = {
        a: '1',
        b: '2'
      }
      let result  = await api.sendLogin(obj)
      console.log(11111111, result)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

