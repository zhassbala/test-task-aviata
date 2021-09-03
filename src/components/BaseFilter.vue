<template>
  <div class="filter-wrapper">
		<span class="header">{{this.Header}}</span><br>
		<!-- <span>Filter type: {{this.FilterType}}</span> -->
		<ul>
			<li v-for="filter in FilterList" :key="filter"> 
				<input type="checkbox" :id="filter" :name="filter" v-on:change="handleChange">
				<label :for="filter">{{filter}}</label>
			</li>
		</ul>

		<!-- <div class="results">
			<span>Filters:</span>
			{{this.filters ? this.filters : "there's no filters :)"}}
		</div> -->
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'BaseFilter',
	props: {
		Header: String,
		FilterList: {
			default: function(){
				return []
			}
		},
		FilterType: String,
	},
	methods: {
		...mapActions['addFilter', 'removeFilter'],
		handleChange(event){
			event.target.checked ? this.$store.dispatch('addFilter', ({
				target: this.FilterType,
				value: event.target.name
			}))
			:
			this.$store.dispatch('removeFilter', ({
				target: this.FilterType,
				value: event.target.name
			}))
			console.log('handleChange method invoked!', event.target.checked, event)
		}
	},
	computed: {
		// filters: function(){
		// 	return this.$store.getters.filters
		// }
	}
}
</script>

<style lang='scss'>
	@import '@/style/BaseFilter.scss';
</style>