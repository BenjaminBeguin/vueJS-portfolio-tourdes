<template>
	<transition
    v-on:leave="leave">
    <div id="loader" v-show="!isLoaded">
      <div class="wrapper" ref="wrapper">
          <img class="robot" src="/static/img/robot.gif" alt="Matthieu Tourdes motion designer">
       </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { TweenLite, TimelineLite, Power3 } from 'gsap'

  export default {
    name: 'loader',
    computed: {
      ...mapGetters([
        'isLoaded'
      ])
    },
    methods: {
      leave: function (el, done) {
        var robot = el.querySelectorAll('img')

        var tl = new TimelineLite()
        .add('goOut')
        tl.to(this.$refs.wrapper, 0.7, {
          y: '0%',
          ease: Power3.easeIn,
          delay: 1
        }, 'goOut')
        tl.to(robot, 0.7, {
          opacity: 0,
          ease: Power3.easeIn,
          delay: 1
        }, 'goOut')
        tl.to(el, 0.5, {
          opacity: 0,
          ease: Power3.linear,
          delay: 2
        }, 'goOut')
        tl.set(el, {
          opacity: 0,
          onComplete: done
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/_color'

  #loader
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-color: #121639
    text-align: center
    z-index: 6
    overflow: hidden

    .wrapper
      display: flex
      justify-content: center
      align-items: center
      height: 100%

    .robot
      height: calc(472px / 3)
      width: calc(619px / 3)

</style>
