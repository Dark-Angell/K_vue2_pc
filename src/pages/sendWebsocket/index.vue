<template>
  <div>
    <p>webSocket内容:{{msg}}</p>
    <button @click="btnClose">关闭websocket</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      msg: null
    }
  },
  mounted() {
    this.$socketApi.initWebSocket(this.getsocketResult)
    console.log(this)
  },
  methods: {
    getsocketResult(data) {
      console.log(data)
      this.msg = data
    },
    btnClose() {
      this.$socketApi.closeWebSocket()
    }
  }
}
</script>

<style scoped>

</style>