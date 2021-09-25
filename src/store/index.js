import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [],
    charactersFilter: []
  },
  mutations: {
    setCharacters(state, payload) {
      state.characters = payload
    },
    setCharactersFilter(state, payload) {
      state.charactersFilter = payload
    }
  },
  actions: {
    /**
     * 
     * @param {string} commit 
     */
    async getCharacters({commit}) {
      try {
        /**
         * https://rickandmortyapi.com/documentation
         */
        const response = await fetch('https://rickandmortyapi.com/api/character')
        const data = await response.json()
        commit('setCharacters', data.results)
        commit('setCharactersFilter', data.results)
      } catch (error) {
        console.error(error)
      }
    },
    /**
     * @param {string} commit
     * @param {string} state 
     * @param {string} status 
     */
    filterByStatus({ commit, state }, status) {
      /**
       * Get all character
       * @function filter
       */
      const filter = state.characters.filter((character) => {
        return character.status.includes(status)
      })
      commit('setCharactersFilter', filter)
    },
    /**
     * @param {string} commit
     * @param {string} state 
     * @param {string} name 
     */
    filterByName({commit, state}, name) {
      const formatName = name.toLowerCase()
      const filter = state.characters.filter((character) => {
        const characterName = character.name.toLowerCase()
        if(characterName.includes(formatName)) {
          return character
        }
      })
      commit('setCharactersFilter', filter)
    }
  },
  modules: {
  }
})
