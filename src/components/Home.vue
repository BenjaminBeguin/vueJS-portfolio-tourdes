<template>
  <div class="page page-home" :style="{ 'background-color': getCurrentProject.color_bg }" ref="homePage">
      <v-touch
        v-on:swipe="handleEventsNav"
        ref="swiper"
        id="works">

        <div class="project" v-for="(work, index) in getProjects" :data-color="work.color" :data-index="index">
          <div class="project-wrapper">
            <router-link :to="work.slug" class="project__cover">
              <div class="image-container">
                <img class="project-image" :src="work.main_image">
                <span class="store color-colored"></span>
              </div>
              <span class="rectangle color-colored"></span>
            </router-link>
            <div class="project__datas color-colored">
              <h2 class="slider-title slider-data color-colored">{{ work.name }}</h2>
              <div class="slider-subtitle slider-data skills color-gray"><span v-for="(skill, index) in work.skills" :class="{ last: index === (work.skills.length - 1) }">{{ skill }} <span class="line">- </span></span></div>
              <span class="store-title"></span>
            </div>
          </div>

        </div>

      </v-touch>

      <ul id="works-nav">
        <li class="nav-item" v-for="(work, index) in getProjects" v-on:click="goToClick(index)" :data-color="work.color" :data-index="index">
          <span class="inner"></span>
          <span class="work-name slider-subtitle ">{{ work.name }}</span>
        </li>
      </ul>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { TimelineLite, TweenLite, Power2 } from 'gsap'

  export default {
    name: 'home',
    data () {
      return {
        msg: 'Welcome Home',
        currentWork: 0,
        isAnimated: false,
        differenceX: 0,
        differenceY: 0,
        square: null,
        picture: null,
        allowChangeSlide: true
      }
    },
    computed: {
      ...mapGetters([
        'getProjects',
        'getCurrentProject'
      ])
    },
    mounted () {
      var that = this
      var AllsliderPictureSquare = this.$el.querySelectorAll('.project .rectangle')
      var AllsliderPicture = this.$el.querySelectorAll('.project .image-container')
      var sliderItem = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"]')
      var sliderPicture = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"] .image-container')
      var sliderPictureImg = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"] .image-container .project-image')
      var sliderPictureSquare = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"] .rectangle')
      var sliderPictureData = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"] .project__datas')
      var sliderNav = this.$el.querySelectorAll('#works-nav')

      var initPositionX
      var initPositionY
      var checkPostion = true
      var canScroll = true

      this.picture = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"] .image-container')[0]
      this.square = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"] .rectangle')[0]

      this.$el.addEventListener('mousemove', function (event) {
        if (checkPostion === true) {
          initPositionX = event.clientX
          initPositionY = event.clientY
          checkPostion = false
        } else {
          that.differenceX = event.clientX - initPositionX
          that.differenceY = event.clientY - initPositionY
        }
      })

      requestAnimationFrame(this.setParalaxPosition)

      var tl = new TimelineLite()
      tl.set(sliderItem, {
        opacity: 0
      })
      tl.set(sliderPictureImg, {
        opacity: 1
      })
      tl.set(sliderPicture, {
        y: '-150%',
        opacity: 0
      })
      tl.set(sliderPictureSquare, {
        y: '-300%',
        opacity: 0
      })
      tl.set(sliderPictureData, {
        y: '-600px',
        opacity: 0
      })
      tl.set(sliderNav, {
        opacity: 0,
        y: '100px',
        x: '-50%'
      })
      tl.add('switch')
      tl.to(sliderItem, 0.5, {
        opacity: 1,
        zIndex: 3,
        delay: 0,
        ease: Power2.linear
      }, 'switch')
      tl.to(sliderPicture, 1, {
        y: '0%',
        opacity: 1,
        delay: 0.6,
        ease: Power2.easeOut
      }, 'switch')
      tl.to(sliderPictureSquare, 1, {
        y: '-1%',
        delay: 0.6,
        opacity: 1,
        ease: Power2.easeOut
      }, 'switch')
      tl.to(sliderPictureData, 1, {
        y: 0,
        opacity: 1,
        delay: 0.6,
        ease: Power2.easeOut
      }, 'switch')
      tl.to(sliderNav, 0.5, {
        opacity: 1,
        y: 0,
        x: '-50%',
        delay: 0.5,
        ease: Power2.easeOut
        // onComplete: next
      }, 'switch')

      this.$store.commit('SET_PAGE', 'home')
      this.goTo(this.getCurrentProject.id)

      // Handle arrow navigation
      document.addEventListener('keyup', this.handleEventsNav, false)
      this.enableSwipe()
    },
    beforeRouteLeave (to, from, next) {
      var canScroll = true

      window.removeEventListener('mousewheel', function (e) {
        if (canScroll) {
          if (e.wheelDelta < 0) {
            this.$router.push('/' + this.getCurrentProject.slug)
            canScroll = false
          }
        }
      })

      var sliderPicture = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"] .image-container')
      var sliderPictureSquare = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"] .rectangle')
      var sliderPictureData = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"] .project__datas')
      var sliderNav = this.$el.querySelectorAll('#works-nav')

      // Remove arrow navigation listener
      document.removeEventListener('keyup', this.handleEventsNav, false)
      // Remove swipe listener
      this.disableSwipe()

      var tl = new TimelineLite()
      tl.to(sliderPicture, 0.85, {
        y: '-150%',
        opacity: 0,
        ease: Power2.easeInOut
      }, 'switch')
      tl.to(sliderPictureSquare, 1, {
        y: '-300%',
        delay: 0.15,
        opacity: 0,
        ease: Power2.easeInOut
      }, 'switch')
      tl.to(sliderPictureData, 0.7, {
        y: '-600px',
        opacity: 0,
        delay: 0.23,
        ease: Power2.easeInOut
      }, 'switch')
      tl.to(sliderNav, 0.7, {
        opacity: 0,
        y: '100px',
        delay: 0.23,
        ease: Power2.easeInOut
        // onComplete: next
      }, 'switch')
      tl.to(this.$el, 0.7, {
        opacity: 1,
        delay: 0.2,
        ease: Power2.easeInOut,
        onComplete: next
      }, 'switch')
    },
    methods: {
      goToClick (index) {
        this.isAnimated = true
        this.goTo(index)
      },
      goTo (index) {
        if (index !== this.currentWork) {
          if (index < this.currentWork) {
            this.goPrev(index)
          } else {
            this.goNext(index)
          }
        }
      },
      goPrev (index) {
        var sliderPicture = this.$el.querySelectorAll('.project[data-index="' + index + '"] .image-container .project-image')
        var oldProject = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"]')
        var oldProjectSquare = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"] .rectangle')
        var matchingProject = this.$el.querySelectorAll('.project[data-index="' + index + '"]')
        var matchingProjectSquare = this.$el.querySelectorAll('.project[data-index="' + index + '"] .rectangle')
        var matchingProjectStore = this.$el.querySelectorAll('.project[data-index="' + index + '"] .store')
        var matchingProjectTitle = this.$el.querySelectorAll('.project[data-index="' + index + '"] .slider-data')
        var matchingProjectStoreTitle = this.$el.querySelectorAll('.project[data-index="' + index + '"] .store-title')

        if (this.isAnimated) {
          var tl = new TimelineLite()
          tl.set(matchingProjectSquare, { x: '-150%', opacity: 0 })
          tl.set(sliderPicture, { opacity: 0 })
          tl.set(matchingProjectStore, { x: '-200%' })
          tl.set(matchingProjectStoreTitle, { x: '-200%' })
          tl.set(matchingProjectTitle, { opacity: '0' })
          tl.add('switch')
          tl.to(oldProjectSquare, 0.45, {
            x: '150%',
            ease: Power2.ease
          }, 'switch')
          tl.to(oldProject, 0.4, {
            zIndex: 1,
            opacity: 0,
            ease: Power2.ease
          }, 'switch')
          tl.to(matchingProject, 0.6, {
            zIndex: 3,
            opacity: 1,
            delay: 0.3,
            ease: Power2.ease
          }, 'switch')
          tl.to(sliderPicture, 0.3, {
            opacity: 1,
            delay: 0.8,
            ease: Power2.ease
          }, 'switch')
          tl.to(matchingProjectSquare, 0.6, {
            x: '-1%',
            opacity: 1,
            delay: 0.7,
            ease: Power2.ease
          }, 'switch')
          tl.to(matchingProjectStore, 2.5, {
            x: '101%',
            delay: 0.3,
            ease: Power2.ease
          }, 'switch')
          tl.to(matchingProjectStoreTitle, 2.4, {
            x: '101%',
            delay: 0.5,
            ease: Power2.ease
          }, 'switch')
          tl.to(matchingProjectTitle, 0, {
            opacity: 1,
            delay: 1,
            ease: Power2.ease
          }, 'switch')
        } else {
          var project = parseInt(this.getCurrentProject.id)
          this.$el.querySelectorAll('.project:nth-child(' + project + ')')[0].style.transform = 'translateX(0)'
          this.$el.querySelectorAll('.nav-item[data-index="0"]')[0].className += ' active'
        }

        this.projectHasChanged(index)
      },
      goNext (index) {
        var sliderPicture = this.$el.querySelectorAll('.project[data-index="' + index + '"] .image-container .project-image')
        var oldProject = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"]')
        var oldProjectSquare = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"] .rectangle')
        var matchingProject = this.$el.querySelectorAll('.project[data-index="' + index + '"]')
        var matchingProjectSquare = this.$el.querySelectorAll('.project[data-index="' + index + '"] .rectangle')
        var matchingProjectStore = this.$el.querySelectorAll('.project[data-index="' + index + '"] .store')
        var matchingProjectStoreTitle = this.$el.querySelectorAll('.project[data-index="' + index + '"] .store-title')
        var matchingProjectTitle = this.$el.querySelectorAll('.project[data-index="' + index + '"] .slider-data')

        if (this.isAnimated) {
          var tl = new TimelineLite()
          tl.set(matchingProjectSquare, { x: '150%', opacity: 0 })
          tl.set(sliderPicture, { opacity: 0 })
          tl.set(matchingProjectStore, { x: '100%' })
          tl.set(matchingProjectStoreTitle, { x: '100%' })
          tl.set(matchingProjectTitle, { opacity: '0' })

          tl.to(oldProjectSquare, 0.45, {
            x: '-150%',
            ease: Power2.ease
          }, 'switch')
          tl.to(oldProject, 0.4, {
            zIndex: 1,
            opacity: 0,
            ease: Power2.ease
          }, 'switch')
          tl.to(matchingProject, 0.6, {
            zIndex: 3,
            opacity: 1,
            delay: 0.3,
            ease: Power2.ease
          }, 'switch')
          tl.to(sliderPicture, 0.3, {
            opacity: 1,
            delay: 0.8,
            ease: Power2.ease
          }, 'switch')
          tl.to(matchingProjectSquare, 0.6, {
            x: '0%',
            opacity: 1,
            delay: 0.7,
            ease: Power2.ease
          }, 'switch')
          tl.to(matchingProjectStoreTitle, 1.5, {
            x: '-201%',
            delay: 0.5,
            ease: Power2.ease
          }, 'switch')
          tl.to(matchingProjectTitle, 0, {
            opacity: 1,
            delay: 1.2,
            ease: Power2.ease
          }, 'switch')
          tl.to(matchingProjectStore, 1.7, {
            x: '-201%',
            delay: 0.1,
            ease: Power2.ease,
            onComplete: function () {
              this.allowChangeSlide = true
            }
          }, 'switch')
        } else {
          var project = parseInt(this.getCurrentProject.id) + 1
          this.$el.querySelectorAll('.project:nth-child(' + project + ')')[0].style.transform = 'translateX(0)'
          this.$el.querySelectorAll('.nav-item[data-index="0"]')[0].className += ' active'
        }

        this.projectHasChanged(index)
      },
      setParalaxPosition () {
        this.square.style.bottom = -10 + this.differenceY / 50 + 'px'
        this.square.style.right = -17 + this.differenceX / 50 + 'px'
        this.picture.style.bottom = this.differenceY / 30 + 'px'
        this.picture.style.right = this.differenceX / 30 + 'px'
        requestAnimationFrame(this.setParalaxPosition)
      },
      projectHasChanged (index) {
        // Update the current work index
        index = parseInt(index)
        this.currentWork = index
        this.$store.commit('SET_CURRENT_PROJECT', this.getProjects[index])
        this.picture = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"] .image-container')[0]
        this.square = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"] .rectangle')[0]

        var navItems = this.$el.querySelectorAll('.nav-item')
        // Reset nav items class active
        navItems.forEach(function (item) {
          item.className = 'nav-item'
        })
        // Set the new nav item as active
        this.$el.querySelectorAll('.nav-item[data-index="' + index + '"]')[0].className += ' active'
      },
      handleEventsNav (e) {
        var that = this
        if (e.keyCode === 37 || e.direction === 4) {
          this.isAnimated = true
          // You can't go back if you're on the first project
          if (this.currentWork > 0 && this.allowChangeSlide) {
            this.isAnimated = true
            this.goPrev(this.currentWork - 1)
            this.allowChangeSlide = false

            setTimeout(function () { that.allowChangeSlide = true }, 300)
          }
        }

        if (e.keyCode === 39 || e.direction === 2) {
          this.isAnimated = true
          // You can't continue if you've reached the last project
          if (this.currentWork < this.getProjects.length - 1 && this.allowChangeSlide) {
            this.isAnimated = true
            this.goNext(parseInt(this.currentWork + 1))
            this.allowChangeSlide = false

            setTimeout(function () { that.allowChangeSlide = true }, 300)
          }
        }
      },
      disableSwipe () {
        this.$refs.swiper.disable('swipe')
      },
      enableSwipe () {
        this.$refs.swiper.enable('swipe')
      }
    }
  }
</script>

<style scoped lang="sass">
  @import '../stylesheets/common/_vars'
  @import '../stylesheets/common/_color'

  .page-home
    overflow: hidden
    // background-image: url('../../static/img/patterns/pattern.png');
    transition: background-color 0.5s linear

    #works
      position: relative
      width: 100%
      height: 100%
      text-align: center
      white-space: nowrap

      .project
        position: absolute
        width: 100%
        height: 100%
        // transform: translateX(100%)
        opacity: 0
        z-index: 1

        .project-wrapper
          display: flex
          justify-content: center
          flex-direction: column
          height: 100%

        &__cover
          position: relative
          display: block
          // width: 750px
          // height: 430px

          width: 55%
          max-width: calc(70vw - 200px)
          max-height: calc(100vh - 250px)
          margin: 0 auto

          @media (max-width: $mobile)
            max-width: 90%
            max-height: 80vh
            width: 86%

          .image-container
            position: relative
            height: 100%
            width: 100%
            max-height: 600px
            overflow: hidden
            pointer-events: none
            z-index: 2

          .project-image
            position: relative
            width: 100%
            height: 100%
            opacity: 0
            z-index: 2
            // box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)

          .rectangle
            position: absolute
            content: ''
            right: -20px
            bottom: -15px
            width: 120px
            height: 160px
            background-color: currentColor
            z-index: 1

            @media (max-width: $mobile)
              width: 60px
              height: 80px

          .store
            position: absolute
            content: ''
            top: 0
            height: calc(100% - 3px)
            max-height: 600px
            width: 100%
            background-color: currentColor
            z-index: 3

        &__datas
          position: relative
          display: inline-block
          margin: 30px auto 0
          text-transform: uppercase
          overflow: hidden

          h2
            display: inline-block

          .store-title
            position: absolute
            content: ''
            bottom: 0
            left: 100%
            height: 100%
            max-height: 600px
            width: 100%
            background-color: currentColor
            z-index: 3

    #works-nav
      position: absolute
      bottom: 50px
      left: 50%
      // transform: translateX(-50%)
      white-space: nowrap
      z-index: 3

      @media (max-width: $mobile)
        bottom: 0
        width: 100%
        white-space: normal

      .nav-item
        text-align: center
        margin-right: 10px

        @media (max-width: $mobile)
          float: left
          width: calc(100% / 5 - 1px)
          margin: 0
          border-right: 1px solid $grey-light

        &:hover,
        &.active
          cursor: pointer

          .work-name
            opacity: 1

          .inner
            &:before
              width: 100%

        &:last-child
          margin-right: 0

        .inner
          position: relative
          display: block
          width: 150px
          height: 6px
          background-color: white
          pointer-events: none

          @media (max-width: $tablet)
            width: 120px
            height: 8px

          @media (max-width: $mobile)
            width: 100%
            height: 50px

          &:before
            position: absolute
            content: ''
            left: 0
            width: 0
            height: 100%
            transition: .3s ease

        .work-name
          display: block
          margin-top: 8px
          font-size: 11px
          letter-spacing: 1.6px
          line-height: 14px
          opacity: 0
          transition: opacity .3s

          @media (max-width: $mobile)
            display: none


</style>
