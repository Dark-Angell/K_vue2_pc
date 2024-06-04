<template>
  <div>
    <div v-for="(item, index) of actions" :key="index">
      <button @click="translate(item, index)">{{item.text}}</button>
    </div>
    <br>
    <p>
      {{ $t('MingCheng') }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
    translate(item, index) {
      // 1. 直接 在 vue 中修改
      // this.$i18n.locale = item.lang
      // window.localStorage.setItem('language', item.lang)

      // 2. 利用 store 修改
      this.$store.dispatch('incrementAction', item.lang)
    }
  }
}
</script>