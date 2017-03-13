<template>
	<div class="page page-project" >
    <div class="projectBG"></div>
    <div class="projectWrapper" :class="getCurrentProject.color" v-if="resetScroll">

      <section class=" wrapper project-header pink">
        <h1 class="animEnter project-title color-gray">{{ getCurrentProject.name }}</h1>
        <p class="animEnter project-subtitle color-colored"><span v-for="(skill, index) in getCurrentProject.skills" :class="{ last: index === (getCurrentProject.skills.length - 1) }">{{ skill }} <span class="line">- </span></span></p>
        <div class="animEnter project-header__content">
          <p v-html="getCurrentProject.header_content" class="text"></p>
        </div>
        <a
          class="animEnter text-ancors color-colored before-colored"
          href="#vimeo"
          v-smooth-scroll>
            <span v-if="getCurrentProject.project_vimeo">Watch video</span></a>
      </section>

      <section class="animEnter project-part decoration" :data-disposition="getCurrentProject.decoration.disposition">
        <div class="decoration-container">
          <img v-for="image in getCurrentProject.decoration.images" :src="image" alt="">
        </div>
      </section>

      <section class="wrapper project-part moodboard ">
        <div class="project-part__header">
          <h2 class="project-part__title color-gray">{{ getCurrentProject.project_first_part.title }}</h2>
            <p v-html="getCurrentProject.project_first_part.intro" class="text project-part__intro"></p>
        </div>
        <div class="project-part__picture">
          <img :src="getCurrentProject.project_first_part.picture" alt="">
        </div>
      </section>

      <section class="project-part__bannerBG">
        <div class="project-part__bannerBackground" :style="{ 'background-image': 'url(' + getCurrentProject.banner + ')' }"></div>
      </section>

      <section
        class="project-part">
        <img v-if='getCurrentProject.project_preparation_part' class="project-part__decoration" :src="getCurrentProject.project_preparation_part.decoration" alt="">
        <div v-if='getCurrentProject.project_preparation_part' class="project-part__header wrapper">
          <h2 class=" project-part__title color-gray">{{ getCurrentProject.project_preparation_part.title }}</h2>
          <p class=" text project-part__intro">{{ getCurrentProject.project_preparation_part.intro }}</p>
        </div>
        <div class="project-part__preparation wrapper">
          <img v-if='getCurrentProject.project_preparation_part' class="project-preparation" :src="getCurrentProject.project_preparation_part.picture" alt="">
        </div>
      </section>

      <section
        class="wrapper project-part">
        <div v-if="getCurrentProject.project_screen_part" class="project-part__header">
            <h2 class="project-part__title color-gray">{{ getCurrentProject.project_screen_part.title }}</h2>
            <p class=" text project-part__intro">{{ getCurrentProject.project_screen_part.intro }}</p>
        </div>

        <div class="project-part__bannerIMG ">
          <img v-if="getCurrentProject.project_screen_part" :src="getCurrentProject.project_screen_part.picture" alt="">
        </div>
      </section>

      <section
        class="wrapper project-part"
        id="vimeo">
        <div v-if="getCurrentProject.project_vimeo" class="project-part__header">
            <h2 class="project-part__title color-gray">{{ getCurrentProject.project_vimeo.title }}</h2>
            <p v-html="getCurrentProject.project_vimeo.intro" class="text project-part__intro"></p>
        </div>

        <div class="project-part__vimeo">
          <div v-if="getCurrentProject.project_vimeo">
            <iframe
              v-if="getCurrentProject.project_vimeo.url != ''"
              :src="getCurrentProject.project_vimeo.url"
              frameborder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen></iframe>
            <img
              v-else
              class="poster"
              :src="getCurrentProject.project_vimeo.poster"
              :alt="getCurrentProject.name">
          </div>
        </div>
      </section>

      <projectSwitcher
        v-bind:prevProject="prevProject"
        v-bind:nextProject="nextProject"></projectSwitcher>
    </div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import dataJson from '../../static/datas.json'
  import ProjectSwitcher from './ProjectSwitcher.vue'
  import { TimelineLite, TweenLite, Power2 } from 'gsap'

  import vueSmoothScroll from 'vue-smooth-scroll'
  import ScrollReveal from 'scrollreveal'

  export default {
    name: 'project',
    computed: {
      ...mapGetters([
        'getProjects',
        'getCurrentProject'
      ])
    },
    data () {
      return {
        nextProject: null,
        prevProject: null,
        resetScroll: true,
        sr: null
      }
    },
    components: {
      projectSwitcher: ProjectSwitcher
    },
    mounted () {
      this.enter()
      var that = this

      // Smoothscroll
      this.sr = ScrollReveal()

      this.sr.reveal('.project-part .decoration, .project-part .project-part__title, .project-part .text, .project-part .project-part__picture, .project-part .project-part__vimeo, .project-part .project-part__bannerIMG, .project-part .project-part__preparation', {
        reset: true,
        origin: 'bottom',
        distance: '10px',
        duration: 1000,
        viewOffset: { top: -200, right: 0, bottom: 200, left: 0 },
        scale: 1,
        delay: '0.2',
        opacity: 0,
        mobile: false,
        viewFactor: 0.1,
        easing: 'ease-out'
      })

      this.sr.sync()
    },
    beforeRouteUpdate (to, from, next) {
      if (to.path.split('#')[0] !== from.path) {
        this.switchProject(to, next)
      }
    },
    beforeRouteLeave (to, from, next) {
      this.exit(next)
    },
    beforeMount () {
      var that = this
      var pageFound = false
      var currentIndex = 0
      // After a refresh on this page, the vuex store will be empty
      if (this.getProjects === null) {
        this.getProjects = dataJson.projects
      }
      var param = this.$route.params.project_name || null

      if (param != null) {
        for (var i = 0; i < this.getProjects.length; i++) {
          if (that.getProjects[i].slug === param) {
            pageFound = true
            currentIndex = i
          }
        }
        // Redirect home if page does not exist
        if (pageFound === true) {
          this.$store.commit('SET_CURRENT_PROJECT', this.getProjects[currentIndex])
        } else {
          this.$router.push('/')
        }
      }

      this.setSwitcherPages(currentIndex, this.getProjects)

      // Set page name
      this.$store.commit('SET_PAGE', 'project')
    },
    watch: {
      '$route' (to, from) {
        if (to.path.split('#')[0] !== from.path) { // l'ancre vers le bas etait watch comme un changement d'url x)
          setTimeout(function () {
            window.scrollTo(0, 0)
          }, 300)
        }
        for (var i = 0; i < this.getProjects.length; i++) {
          if (this.getProjects[i].slug === to.path.replace('/', '')) {
            // Update the current project datas
            this.$store.commit('SET_CURRENT_PROJECT', this.getProjects[i])
            // Update the page switcher
            this.setSwitcherPages(i)
            this.enter_switch()
          }
        }
      }
    },
    methods: {
      switchProject (to, next) {
        var that = this
        var bg = this.$el.querySelectorAll('.projectBG')
        var wrapper = this.$el.querySelectorAll('.projectWrapper')
        var animEnter = this.$el.querySelectorAll('.projectWrapper .animEnter')
        var tl = new TimelineLite()

        var projectTo = this.arrayObjectIndexOf(this.getProjects, to.params.project_name, 'slug')
        var projectFrom = this.getCurrentProject.id

        if (projectTo > projectFrom) {
          tl.set(bg, {
            opacity: 1,
            x: '125%',
            zIndex: 10,
            backgroundColor: this.getProjects[projectTo].color_code
          }, 'switch')
          tl.add('stagger')
          tl.staggerFrom(animEnter, 1, {
            opacity: 0,
            y: '10px',
            delay: 1.4
          }, 0.2, 'stagger')
          tl.to(bg, 1.5, {
            opacity: 1,
            x: '-125%',
            delay: 0.5,
            ease: Power2.linear,
            backgroundColor: this.getProjects[projectTo].color_code
          }, 'switch')
          tl.to(wrapper, 0.5, {
            opacity: 0,
            delay: 0.3,
            ease: Power2.easeOut,
            onComplete: next
          }, 'switch')
        } else {
          tl.set(bg, {
            opacity: 1,
            x: '-125%',
            zIndex: 10,
            ease: Power2.easeOut,
            backgroundColor: this.getProjects[projectTo].color_code
          }, 'switch')
          tl.add('stagger')
          tl.staggerFrom(animEnter, 1, {
            opacity: 0,
            y: '10px',
            delay: 1.4
          }, 0.2, 'stagger')
          tl.to(bg, 1.5, {
            opacity: 1,
            x: '125%',
            delay: 0.5,
            ease: Power2.easeOut,
            backgroundColor: this.getProjects[projectTo].color_code
          }, 'switch')
          tl.to(wrapper, 0.5, {
            opacity: 0,
            delay: 0.3,
            ease: Power2.easeOut,
            onComplete: next
          }, 'switch')
        }
      },
      enter_switch () {
        var bg = this.$el.querySelectorAll('.projectBG')
        var wrapper = this.$el.querySelectorAll('.projectWrapper')
        var tl = new TimelineLite()

        tl.set(bg, {
          backgroundColor: this.getCurrentProject.color_code,
          opacity: 1
        })
        tl.set(wrapper, {
          opacity: 0,
          y: '100px'
        })
        tl.add('switch')
        tl.to(bg, 1.5, {
          opacity: 0,
          y: '0%',
          delay: 1,
          ease: Power2.easeOut
        }, 'switch')
        tl.to(wrapper, 1, {
          opacity: 1,
          y: '0%',
          delay: 0.5,
          ease: Power2.easeOut
        }, 'switch')
      },
      enter () {
        var bg = this.$el.querySelectorAll('.projectBG')
        var wrapper = this.$el.querySelectorAll('.projectWrapper')
        var animEnter = this.$el.querySelectorAll('.projectWrapper .animEnter')
        var tl = new TimelineLite()

        tl.set(wrapper, {
          opacity: 0
        })
        tl.set(bg, {
          backgroundColor: this.getCurrentProject.color_bg,
          opacity: 1
        })
        tl.to(bg, 1, {
          opacity: 0,
          y: '0%',
          delay: 0.1,
          ease: Power2.linear
        }, 'switch')
        tl.to(wrapper, 1, {
          opacity: 1,
          y: '0%',
          delay: 0.1,
          ease: Power2.easeOut
        }, 'switch')
        tl.add('stagger')
        tl.staggerFrom(animEnter, 1, {
          opacity: 0,
          y: '10px'
        }, 0.2, 'stagger')
      },
      exit (next) {
        var bg = this.$el.querySelectorAll('.projectBG')
        var wrapper = this.$el.querySelectorAll('.projectWrapper')
        var tl = new TimelineLite()
        tl.set(bg, {
          opacity: 0,
          x: '0%',
          backgroundColor: this.getCurrentProject.color_bg
        }, 'switch')
        tl.to(bg, 1.5, {
          opacity: 1,
          y: '0%',
          delay: 0.5,
          ease: Power2.easeOut,
          onComplete: next
        }, 'switch')
        tl.to(wrapper, 1, {
          opacity: 0,
          y: '50px',
          delay: 0,
          ease: Power2.easeOut
        }, 'switch')
      },
      arrayObjectIndexOf (myArray, searchTerm, property) {
        for (var i = 0, len = myArray.length; i < len; i++) {
          if (myArray[i][property] === searchTerm) return i
        }
        return -1
      },
      setSwitcherPages (currentIndex) {
        var nextProject = null
        var prevProject = null

        if (currentIndex < this.getProjects.length - 1) {
          nextProject = parseInt(this.getCurrentProject.id) + 1
        } else {
          nextProject = 0
        }

        if (currentIndex > 0) {
          prevProject = currentIndex - 1
        } else {
          prevProject = this.getProjects.length - 1
        }

        // Store the next and previous projects datas (will be easy to fetch them then)
        this.nextProject = this.getProjects[nextProject]
        this.prevProject = this.getProjects[prevProject]
      }
    }
  }
</script>


<style scoped lang="sass">
  @import '../stylesheets/common/_color'

  .page-project
    position: relative

  .projectBG
    position : fixed
    left: 0
    right: 0
    top: 0
    bottom: 0

</style>
