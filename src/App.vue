<template>
  <div id="app">
    <loader></loader>
    <headerComponent></headerComponent>
    <router-view></router-view>
  </div>
</template>

<script>
  import assetsLoader from 'assets-loader'
  import Loader from './components/Loader'
  import Header from './components/HeaderComponent'
  import dataJson from '../static/datas.json'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    components: {
      headerComponent: Header,
      Loader
    },
    data () {
      return {
        projectsDatas: dataJson.projects,
        progress: null,
        minTimer: false
      }
    },
    computed: {
      ...mapGetters([
        'isLoaded'
      ])
    },
    beforeMount () {
      var that = this
      this.$store.commit('STORE_PROJECTS', this.projectsDatas)
      this.$store.commit('SET_CURRENT_PROJECT', this.projectsDatas[0])
      // this.$store.commit('SET_NEXT_PROJECT', this.projectsDatas[1])
      // this.$store.commit('SET_PREV_PROJECT', this.projectsDatas[this.projectsDatas.length - 1])
      setTimeout(function () {
        that.minTimer = true
        if (that.progress >= 0.95) {
          that.$store.commit('SET_LOADING', true)
        }
      }, 5000)

      var loader = assetsLoader({
        assets: [
          'static/datas.json',
          // 'static/img/patterns/pattern.png',
          // Main images
          'static/img/voices/main-image@2x.png',
          'static/img/domingo/main-image@2x.png',
          'static/img/4ltrophy/main-image@2x.png',
          'static/img/geek-art/main-image@2x.png',
          'static/img/lost-edge/main-image@2x.png',
          // About page background
          'static/img/bg-about-1x.png',
          'static/img/bg-about-2x.png',
          // Back link animations
          'static/img/menu-animation/pink.png',
          'static/img/menu-animation/green.png',
          'static/img/menu-animation/yellow.png',
          'static/img/menu-animation/blue.png',
          'static/img/menu-animation/purple.png',
          'static/img/menu-animation/red.png',
          // Voices
          'static/img/voices/first-part-img-1.png',
          'static/img/voices/moodboard@2x.png',
          // Domingo
          'static/img/domingo/first-part-img-1.png',
          'static/img/domingo/first-part-img-2.png',
          'static/img/domingo/moodboard@2x.png',
          // 4l trophy
          'static/img/4ltrophy/first-part-img-1.png',
          'static/img/4ltrophy/moodboard@2x.png',
          // Geek art
          'static/img/geek-art/first-part-img-1.png',
          'static/img/geek-art/first-part-img-2.png',
          'static/img/geek-art/moodboard@2x.png',
          // Lost edge
          'static/img/lost-edge/moodboard@2x.png',
          'static/img/lost-edge/first-part-img-1.png',
          'static/img/lost-edge/first-part-img-2.png'
        ]
      })
      .on('error', function (error) {
        console.log(error)
      })
      .on('progress', function (progress) {
        that.progress = progress
        // console.log((progress * 100).toFixed() + '%')
      })
      .on('complete', function (assets) {
        if (that.minTimer) {
          that.$store.commit('SET_LOADING', true)
        }
      })
      .start()
    },
    mounted () {
      var loader = assetsLoader({
        assets: [
          // Voices
          'static/img/voices/banner@2x.png',
          'static/img/voices/decoration.png',
          'static/img/voices/designboard@2x.png',
          'static/img/voices/preparation@2x.png',
          // Domingo
          'static/img/domingo/banner@2x.png',
          'static/img/domingo/decoration.png',
          'static/img/domingo/designboard@2x.png',
          'static/img/domingo/preparation@2x.png',
          // 4l trophy
          'static/img/4ltrophy/banner@2x.png',
          'static/img/4ltrophy/decoration.png',
          'static/img/4ltrophy/designboard@2x.png',
          'static/img/4ltrophy/preparation@2x.png',
          // Geek art
          'static/img/geek-art/banner@2x.png',
          'static/img/geek-art/preparation@2x.png',
          'static/img/geek-art/designboard@2x.png',
          'static/img/geek-art/vimeo.png',
          // Lost edge
          'static/img/lost-edge/banner@2x.png',
          'static/img/lost-edge/designboard.png'
        ]
      })
      .on('error', function (error) {
        console.log(error)
      })
      .on('progress', function (progress) {
        // console.log((progress * 100).toFixed() + '%')
      })
      .on('complete', function (assets) {
      })
      .start()
    }
  }
</script>

<style lang="sass">
  @import './stylesheets/main'

  #app
    font-family: $font
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50

  h1, h2
    font-weight: normal

  ul
    list-style-type: none
    padding: 0

  li
    display: inline-block
    margin: 0 10px

  a
    color: #42b983

</style>
