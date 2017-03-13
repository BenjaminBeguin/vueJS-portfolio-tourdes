<template>
  <div class="page page-about">
    <div class="bg"></div>
    <div class="wrapper">

      <div class="about-container">
        <h2 class="animEnter page-about-title">{{ name }}</h2>
        <span class=" animEnter page-about-subtitle">{{ jobTitle }}</span>
        <p
          v-html="description"
          class="animEnter text"></p>
        <div class="animEnter  social-links">
          <a :href="'mailto:' + contact" class="social-link">Contact</a>
          <a :href="twitter" class="social-link first" target="_blank">Twitter</a>
          <a :href="pinterest" class="social-link" target="_blank">Pinterest</a>
          <a :href="linkedin" class="social-link" target="_blank">Linkedin</a>
        </div>

        <div class="credits text animEnter">Developed with <svg class="heart" viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg>
        by <a href="http://benjaminbeguin.com/" target="_blank">Benjamin</a> and <a href="http://www.stephenrichard.fr/" target="_blank">Stephen</a></div>

        <div class="animEnter page-about-rec"><span>rec</span></div>
      </div>
    </div>
  </div>
</template>

<script>

import { TimelineLite, TweenLite, Power2 } from 'gsap'
import { mapGetters } from 'vuex'

export default {
  name: 'About',
  computed: {
    ...mapGetters([
      'getProjects',
      'getCurrentProject'
    ])
  },
  data () {
    return {
      pageName: 'About',
      name: 'Matthieu Tourdes',
      jobTitle: 'Junior art director & motion designer',
      description: 'Hello I’m Matthieu Tourdes, a 21 year-old motion designer & junior art director. Young I tried to find out what magic trick was used to make cartoon and movies, which led me to develop a strong passion for the motion graphics industry. Currently in 4th year at <a class="link" href="http://hetic.net" target="_blank">HETIC</a>.<br/><br/>I’m now looking for a 6 months internship abroad.',
      contact: 'matthieu.tourdes@gmail.com',
      twitter: 'https://twitter.com/Tourdes',
      pinterest: 'https://fr.pinterest.com/matthieutourdes/',
      linkedin: 'https://www.linkedin.com/in/tourdes/'
    }
  },
  beforeMount () {
    this.$store.commit('SET_PAGE', 'about')
  },
  mounted () {
    var bg = this.$el.querySelectorAll('.bg')[0]
    bg.style.backgroundColor = this.getCurrentProject.color_bg
    var animEnter = this.$el.querySelectorAll('.about-container .animEnter')

    // bg.style.backgroundColor = '#CE3131'

    var wrapper = this.$el.querySelectorAll('.wrapper')
    var tl = new TimelineLite()

    tl.set(wrapper, {
      opacity: 1
    })
    tl.to(bg, 0.5, {
      opacity: 0,
      delay: 0.1,
      ease: Power2.linear
    }, 'switch')
    tl.to(bg, 0, {
      y: '-100%',
      delay: 0.5
    }, 'switch')
    tl.to(wrapper, 0, {
      opacity: 1,
      y: '0%'
    }, 'switch')
    tl.staggerFrom(animEnter, 1, {
      opacity: 0,
      y: '10px'
    }, 0.2, 'stagger')
  },
  beforeRouteLeave (to, from, next) {
    var bg = this.$el.querySelectorAll('.bg')[0]
    bg.style.backgroundColor = this.getCurrentProject.color_bg

    var wrapper = this.$el.querySelectorAll('.wrapper')
    var tl = new TimelineLite()

    tl.set(wrapper, {
      opacity: 1,
      y: '0%'
    })
    tl.set(bg, {
      opacity: 0,
      y: '0%'
    })
    tl.add('switch')
    tl.to(wrapper, 0.5, {
      opacity: 0,
      y: '10px',
      delay: 0.2,
      ease: Power2.easeOut
    }, 'switch')
    tl.to(bg, 1, {
      opacity: 1,
      delay: 0.2,
      ease: Power2.linear,
      onComplete: next
    }, 'switch')
  }
}
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/_color'
  @import '../stylesheets/common/_vars'

  .bg
    position : absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 1
    background-color: black
    // background-image: url('../../static/img/patterns/pattern.png')
    transition: background-color 1s linear
  .page-about
    display: flex
    align-items: center
    background-image: url(../../static/img/bg-about-2x.png)
    -webkit-background-size: cover
    background-size: cover
    background-repeat: no-repeat
    background-color: $dark

    @media (max-width: 1280px)
      background-image: url(../../static/img/bg-about-1x.png)

    .wrapper
      position: relative
      padding-left: 220px

      @media (max-width: $tablet)
        padding-left: 40px

      @media (max-width: $mobile)
        padding: 60px 20px 0 20px

      .about-container
        max-width: 600px

      .page-about-title
        color: $red

        @media (max-width: $mobile)
          font-size: 21px
          margin-bottom: 0
          letter-spacing: 2.2px

      .page-about-subtitle
        display: inline-block
        margin-bottom: 25px

        @media (max-width: $mobile)
          font-size: 10px

      .text
        color: white
        margin-bottom: 25px

        @media (max-width: $mobile)
          font-size: 12px

        .link
          color: white
          text-decoration: none

      .social-links
        display: inline-block

        .social-link
          position: relative
          display: inline-block
          padding: 10px 10px 0 0
          margin-right: 20px
          text-transform: uppercase
          color: white
          font-size: 11px
          text-decoration: none
          transition: color .3s

          @media (max-width: $mobile)
            font-size: 10px
            padding: 6px 6px 0 0

          &:last-child
            &:after
              display: none

          &:after
            position: absolute
            content: ''
            right: -10px
            top: 13px
            height: 2px
            width: 8px
            background-color: $red

            @media (max-width: $mobile)
              width: 6px
              top: 9px

          &:hover
            color: $red

      .credits
        margin-top: 80px
        color: white
        font-size: 13px

        @media (max-width: $mobile)
          left: 20px
          margin-top: 50px

        a
          color: white
          text-decoration: none

        .heart
          height: 10px
          fill: $red
          transform: scale(1)

          &:hover
            animation: heartbeat .3s ease infinite alternate

      .page-about-rec
        position: absolute
        right: 100px
        bottom: 146px

        @media (max-width: $mobile)
          display: none

        span
          position: relative
          font-weight: 800
          font-size: 11px
          letter-spacing: 1.57px
          text-transform: uppercase
          color: white

          &:before
            position: absolute
            content: ''
            left: -15px
            top: 2px
            width: 8px
            height: 8px
            background-color: $red
            border-radius: 4px
            opacity: 0.2
            animation: record 1s ease infinite alternate

  @keyframes record
    100%
      opacity: 1

  @keyframes heartbeat
    100%
      transform: scale(1.3)

</style>
