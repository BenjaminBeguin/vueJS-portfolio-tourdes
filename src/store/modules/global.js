import * as types from '../mutations-types'

const state = {
  page: null,
  projects: null,
  currentProject: null,
  prevProject: null,
  nextProject: null,
  loaded: false
}

const getters = {
  getPage: state => {
    return state.page
  },
  getProjects: state => {
    return state.projects
  },
  getCurrentProject: state => {
    return state.currentProject
  },
  getPreviousProject: state => {
    return state.prevProject
  },
  getNextProject: state => {
    return state.nextProject
  },
  isLoaded: state => {
    return state.loaded
  }
}

const mutations = {
  [types.SET_PAGE] (state, pageState) {
    state.page = pageState
  },
  [types.STORE_PROJECTS] (state, projectsState) {
    state.projects = projectsState
  },
  [types.SET_CURRENT_PROJECT] (state, currentProjectState) {
    state.currentProject = currentProjectState
  },
  [types.SET_PREV_PROJECT] (state, prevProjectState) {
    state.prevProject = prevProjectState
  },
  [types.SET_NEXT_PROJECT] (state, nextProjectState) {
    state.nextProject = nextProjectState
  },
  [types.SET_LOADING] (state, loadedState) {
    state.loaded = loadedState
  }
}

export default {
  state,
  getters,
  mutations
}
