import { createStore } from 'vuex'
import validated_data from '@/api/results.json'

/*

flights is an array of objects.
each objects contains information about the flight:
  - itineraries
  - price
  - currency
  - bonus_usage
  - validating_carrier !IMPORTANT - this is the code of the company 
                                    that carries the flight. 
                                    Ex. KC - Air Astana, DV - SCAT Airlines, etc.
  - 


FILTERS

filters have only 2 options: tariff and companies
both are arrays, i.e. they only have those filters that are checked in the ui
Ex: 'tariff': [
          'direct_only',
          'luggage_only'
        ],
        'companies': ['KC', 'EK']
*/

export default createStore({
  state: {
    airlines: {},
    flights: [],
    filters: {
      tariff: [],
      companies: []
    },
    filterParser: {
      'Только прямые': 'direct_only',
    },
    airlinesReversed: {}

  },
  mutations: {
    initAirlines(state){
      state.airlines = {...validated_data['airlines']}
      let airlinesReversed = {}

      for (let airline of Object.keys(state.airlines)){
        airlinesReversed[state.airlines[airline]] = airline
      }

      state.airlinesReversed = {...airlinesReversed}
    },
    initFlights(state){
      state.flights = {...validated_data['flights']}
    },
    addFilter(state, filter){
      if (!state.filters[filter.target].includes(filter.value)){
        state.filters[filter.target].push(filter.value)
      }
    },
    removeFilter(state, filter){
      // if (!state.filters[filter.target].includes(filter.value)){
      //   state.filters[filter.target].push(filter.value)
      // }
      let res = []

      for (let elem of state.filters[filter.target]){
        if (elem !== filter.value){
          console.log(elem)
          res.push(elem)
        }
      }
      state.filters[filter.target] = [...res]
    }
  },
  actions: {
    init({commit, dispatch}){
      commit('initAirlines')
      commit('initFlights')
    },
    addFilter({commit}, filter){
      // filter is on object that has 2 keys: target and value
      // Ex. {target: 'tariff', value: 'KC'}
      commit('addFilter', filter)
    },
    removeFilter({commit}, filter){
      commit('removeFilter', filter)
    }
  },
  getters: {
    airlines(state){
      return state.airlines
    },
    airlinesReversed(state){
      return state.airlinesReversed
    },
    filters(state){
      return state.filters
    },
    flights(state){
      return state.flights
    }
  },
  modules: {
  }
})
