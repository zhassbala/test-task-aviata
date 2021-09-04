<template>
  <div class="home container">
    <section class="filters">
      <BaseFilter Header="Опции тарифа" 
      :FilterList="filtersTariff" 
      FilterType="tariff"
      ref="tariffFilter"
      />
      <BaseFilter Header="Авиакомпании" 
      :FilterList="Object.keys(this.$store.state.airlinesReversed)" 
      FilterType="companies"
      ref="companiesFilter"
      />
      <button class="remove-filters" @click="removeAllFilters">Сбросить все фильтры</button>
    </section>

    <section class="results">
        <ResultCard 
        v-for="flight in this.$store.getters.flights"
        :key="flight.id"
        :img_code="flight.validating_carrier" 
        :currency="flight.currency"
        :company="this.$store.state.airlines[flight.validating_carrier]"
        :price="flight.price"
        :origin_code="getOriginCode(flight)"
        :destination_code="getDestinationCode(flight)"
        :refundable="flight.refundable"
        :travel_time="flight.best_time"
        :luggage="Object.keys(flight.services)[0]"
        :arr_date="flight.itineraries[0][0].arr_date"
        :dep_date="flight.itineraries[0][0].dep_date"
        />
    </section>
    
  </div>
</template>

<script>
// @ is an alias to /src
import ResultCard from '@/components/ResultCard.vue';
import BaseFilter from '@/components/BaseFilter.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    ResultCard,
    BaseFilter,
  },
  methods: {
    ...mapActions['initAirlines'],
    getOriginCode(flight){
      let code = flight.itineraries[0][0].segments[0].origin_code
      return code
    },
    getDestinationCode(flight){
      let code = flight.itineraries[0][0].segments
      code = code[code.length-1].dest_code
      return code
    },
    removeAllFilters(){
      this.$refs.tariffFilter.clear()
      this.$refs.companiesFilter.clear()
    }
  },
  beforeMount() {
    this.$store.dispatch('init')
  },
  data() {
    return {
      filtersTariff: [
        'Только прямые',
        'Только с багажом',
        'Только возвратные'
      ]
      
    }
  },
  computed: {
    ...mapGetters['flights'],
  },
}
</script>


<style lang='scss'>
@import '@/style/home.scss';
</style>