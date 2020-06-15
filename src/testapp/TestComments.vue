<template lang="pug">
  div#app
    .header-bar
      a(href="/")
        img(src="../assets/logo.png")
      br
      button.button.is-warning.is-pulled-right Hello
      h1.title.is-3 Crowdhound testing

    crowdhound-comments(:elementId="elementId", :options="options")
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      elementId: 1000,
      options: {

      },
    }
  },
}
</script>

<style lang="scss" scoped>
$header-bar-size: 100;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  .header-bar {
    height: #{$header-bar-size}px;
    padding: 0px;

    img {
      margin: 10px;
      height: 80px;
      float: left;
    }
  }
}
</style>
