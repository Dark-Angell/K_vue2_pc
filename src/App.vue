<template>
  <div id="app">
    <div v-for="(item, index) of actions" :key="index">
      <button @click="translate(item, index)">{{item.text}}</button>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      ws: null,
      wsUrl: 'ws://localhost:3000',
      language: null,
      actions: [
        {text: '中文翻译', lang: 'Zh_lang',},
        {text: '英文翻译', lang: 'En_lang',},
        {text: '泰文翻译', lang: 'Ty_lang',},
        {text: '英文翻译', lang: 'En_lang', },
        { text: '日语翻译', lang: 'Ry_lang',  },
        { text: '韩语翻译', lang: 'Hy_lang', },
      ]
    }
  },
  mounted() {
    // this.initWebSocket();
  },
  methods: {
    // initWebSocket() {
    //   this.ws = new WebSocket(this.wsUrl);

    //   this.ws.addEventListener('open', () => {
    //     console.log('连接到服务器了')
    //     this.ws.send('憨八龟, 我想你了')
    //   })

    //   this.ws.addEventListener('message', ({data}) => {
    //     console.log(22222, data)
    //   })
  // },
    translate(item, index) {
      // 1. 直接 在 vue 中修改
      // this.$i18n.locale = item.lang
      // window.localStorage.setItem('language', item.lang)

      // 2. 利用 store 修改
      this.$store.dispatch('incrementAction', item.lang)
      console.log(this.$store.getters.language)
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

