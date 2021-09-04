<template>
  <div class="filter-wrapper">
		<span class="header">{{this.Header}}
			<span class="filter-clear-img" @click="this.clear"></span>
		</span>
		<br>
		<ul class="filter-list">
			<li v-for="filter in FilterList" :key="filter"> 
				<input type="checkbox" 
				:id="filter" 
				:name="filter" 
				v-on:change="handleChange"
				v-model="this.filterListState[filter]"
				>
				<label class="noselect" :for="filter">{{filter}}</label>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'BaseFilter',
	props: {
		Header: String,
		FilterList: {
			required: true
		},
		FilterType: String,
	},
	data: function(){
		return {
			filterListState: {

			},
		}
	},
	methods: {
		...mapActions['addFilter', 'removeFilter', 'removeAllFilters'],
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
		},
		clear(){
			for (let filter of this.FilterList){
				this.filterListState[filter] = false
			}
			this.$store.dispatch('removeAllFilters', this.FilterType)
		}
	},
	mounted(){
		this.clear()
	}
}
</script>

<style lang='scss'>
	@import '@/style/BaseFilter.scss';
</style>