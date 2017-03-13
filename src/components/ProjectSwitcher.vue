<template>
	<div class="project-switcher wrapper">

		<router-link :to="prevProject.slug" class="project-link previous-project-link">
      <div class="switcher">
  			<span class="project-part__title">{{ prevProject.name }}</span>
        <div class="project-link__skills slider-subtitle">
          <span v-for="(skill, index) in prevProject.skills" :class="{ last: index === (prevProject.skills.length - 1) }">{{ skill }} <span class="line">- </span></span>
        </div>
        <div class="project-link__rect" :style="{ 'background-color': prevProject.color_code }">
          <div>
             <span class="project-link__info">NAVIGATE TO THE PREVIOUS PROJECT</span>
          </div>
        </div>
      </div>
		</router-link>


		<router-link :to="nextProject.slug" class="project-link next-project-link">
      <div class="switcher">
        <span class="project-part__title">{{ nextProject.name }}</span>
  			<div class="project-link__skills slider-subtitle">
           <span v-for="(skill, index) in nextProject.skills" :class="{ last: index === (nextProject.skills.length - 1) }">{{ skill }} <span class="line">- </span></span>
        </div>
        <span class="project-link__rect" :style="{ 'background-color': nextProject.color_code }">
           <div>
             <span class="project-link__info">NAVIGATE TO THE NEXT PROJECT</span>
          </div>
        </span>
      </div>
		</router-link>

	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import dataJson from '../../static/datas.json'

  export default {
    name: 'projectswitcher',
    computed: {
      ...mapGetters([
        'getProjects',
        'getCurrentProject'
      ])
    },
    props: ['nextProject', 'prevProject']
  }
</script>

<style lang="sass">
  @import '../stylesheets/common/_vars'
  @import '../stylesheets/common/_color'

  .project-switcher
    padding-top: 120px
    padding-bottom: 75px
    overflow: hidden

    @media (max-width: $tablet)
      padding-top: 80px

    @media (max-width: $mobile)
      padding-top: 40px
      padding-bottom: 40px

    .switcher
      width: 100%
      height: 100%
      display: flex
      flex-direction: column
      justify-content: center
      overflow: hidden

    .project-link
      position: relative
      display: flex
      flex-direction: column
      justify-content: center
      height: 120px
      width: 50%
      text-transform: uppercase
      text-decoration: none
      text-align: center
      background-color: #EAEAEA

      @media (max-width: $mobile)
        height: 100px

      .project-part__title,
      &__skills
        transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1)


      .project-link__rect
        position: absolute
        display: flex
        flex-direction: column
        justify-content: center
        top: 0
        height: 100%
        width: 100%
        transition: all .6s cubic-bezier(0.77, 0, 0.175, 1)
        z-index: 1

        .project-link__info
          font-size: 12px
          font-weight: 600
          letter-spacing: 0.86px
          color: white
          position: relative
          opacity: 0
          width: auto

      &.previous-project-link
        float: left

        .project-link__info
          padding-right: 40px
          float: right

          &:before
            content: ''
            position: absolute
            width: 20px;
            border-bottom: 2px solid white
            left: -30px;
            top: 3px;

        &:hover
          .project-link__rect
            transform: translateX(0%) !important
            width: 200% !important
            z-index: 30;

            @media (max-width: $mobile)
              width: 100% !important
              z-index: 0

          .project-part__title,
          .project-link__skills
            z-index: 100000;

          .project-link__skills
            @media (max-width: $mobile)
              z-index: 0

          .project-link__info
            opacity: 1;
            transition: all 0.2s linear 0.3s

            @media (max-width: $mobile)
              opacity: 0


        .project-link__rect
          left: 0
          width: 100%;


      &.next-project-link
        float: right

        .project-link__info
          padding-left: 40px;
          float: left

          &:before
            content: ''
            position: absolute
            width: 20px;
            border-bottom: 2px solid white
            right: -30px;
            top: 3px;

        &:hover
          .project-link__rect
            transform: translateX(0%) !important
            width: 200% !important;
            z-index: 3;

            @media (max-width: $mobile)
              width: 100% !important
              z-index: 0

            .project-link__info
              opacity: 1;
              transition: all 0.2s linear 0.3s

              @media (max-width: $mobile)
                opacity: 0

          .project-part__title,
          .project-link__skills
            z-index: 20;

          .project-link__skills
            @media (max-width: $mobile)
              z-index: 0

        .project-link__rect
          right: 0
          //transform: translateX(-100%)
          width: 100%;

      .project-part__title
        letter-spacing: 3.38px
        color: white
        line-height: 45px
        z-index: 2

        @media (max-width: $mobile)
          font-size: 17px
          line-height: 26px
          letter-spacing: 2px


      &__skills
        color: $dark
        font-size: 12px
        font-weight: 800
        z-index: 2

        @media (max-width: $mobile)
          display: none



</style>
