<template>
  <div id="app">
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
html,body{
  height: 100%;
  margin: 0;
  padding: 0;
  font: 14px "Microsoft Yahei";
  color: #333;
}
#app{
  height: 100%;
}
</style>

