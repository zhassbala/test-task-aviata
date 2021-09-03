<template>
  <div class="home">
    <!-- <result-card/> -->
    <section class="filters">
      <!-- <span>Filters: {{this.$store.state.filters}}</span> -->
      <BaseFilter Header="Опции тарифа" :FilterList="filtersTariff" FilterType="tariff"/>
      <BaseFilter Header="Авиакомпании" :FilterList="this.$store.state.airlines" FilterType="companies"/>
    </section>

    <section class="results">
      <div class="" v-for="flight in this.$store.getters.flights" :key="flight.id">
        <ResultCard 
        :img_code="flight.validating_carrier" 
        :currency="flight.currency"
        :company="this.$store.state.airlines[flight.validating_carrier]"
        :price="flight.price"
        :origin_code="getOriginCode(flight)"
        :destination_code="getDestinationCode(flight)"
        :refundable="flight.refundable"
        />
      </div>
    </section>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ResultCard from '@/components/ResultCard.vue';
import BaseFilter from '@/components/BaseFilter.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
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
    }
  },
  mounted() {
    this.$store.dispatch('init')
    console.log('homepage mounted!')
    console.log(this.$store.state.airlines)
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
  }
}
</script>


<style lang='scss'>
@import '@/style/home.scss';
</style>