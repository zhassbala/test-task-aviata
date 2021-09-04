<template>
  <div class="card">
		<div class="card-details">
			<div class="logo-wrapper">
				<img :src="this.img_url" alt=""> <span>{{this.company}}</span>
			</div>

			<div class="date-time date-time-arr">
				<span class="date">
					{{this.parseDate(this.arr_date)[0]}}
				</span>
				<span class="time">
					{{this.parseDate(this.arr_date)[1]}}
				</span>
			</div>

			<div class="visual-details">
				<div class="details-upper">
					<span class="des-city">
						{{this.origin_code}}
					</span>

					<span class="flight-time">
						{{this.parseTravelTime()}}
					</span>

					<span class="des-city">
						{{this.destination_code}}
					</span>
				</div>
				<div class="details-center">
					<img src="@/assets/road_line.svg" alt="">
				</div>
			</div>

			<div class="date-time date-time-dep">
				<span class="date">
					{{this.parseDate(this.dep_date)[0]}}
				</span>
				<span class="time">
					{{this.parseDate(this.dep_date)[1]}}
				</span>
			</div>
		</div>
		
		<div class="details-and-conditions">
			<a href="#">Детали перелета</a>
			<a href="#">Условия тарифа</a>
			<span class="dark" v-if="!this.refundable"><img src="@/assets/irrevocable.svg" alt=""> невозвратный</span>
		</div>

		<div class="pricecard">
			<span class="price">{{`${this.price} ${this.currency}`}}</span>
			<button class="button-green">
				Выбрать
			</button>

			<span class="description dark">Цена за всех пассажиров</span>

			<div class="luggage">
				<span>{{this.luggage !== '0PC' ? 'Багаж: ' + this.luggage : 'Нет багажа'}}</span> <button class="button-lightblue">+ Добавить багаж</button>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ResultCard',
	props: {
		img_code: {
			default: function(){
				return '';
			},
			type: String,
			required: true
		},
		price: {
			type: String,
			required: true
		},
		currency: {
			type: String,
			required: true
		},
		company: {
			type: String,
			required: true
		},
		origin_code: {
			type: String,
			required: true
		},
		destination_code: {
			type: String,
			required: true
		},
		refundable: {
			type: Boolean,
			required: true
		},
		travel_time: {
			type: Number,
			required: true
		},
		luggage: {
			type: String,
			default: function(){
				return '0PC'
			}
		},
		dep_date: {
			type: String,
			default: function() {
				return '2019/8/30 11:20'
			}
		},
		arr_date: {
			type: String,
			default: function() {
				return '2019/8/30 13:05'
			}
		},
	},
	computed: {
		img_url(){
			return this.img_code ? `https://aviata.kz/static/airline-logos/80x80/${this.img_code}.png` : 'https://via.placeholder.com/80.png'
		}
	},
	methods: {
		parseTravelTime(){
			// console.log(this.travel_time)
			let hours = Math.floor(this.travel_time/3600)
			let mins = Math.floor((this.travel_time - hours*3600)/60)
			return hours + ' h ' + mins + ' m'
		},
		parseDate(date){
			// YYYY/MM/D HH:MM
			let weekday = [
				'пн',
				'вт',
				'ср',
				'чт',
				'пт',
				'сб',
				'вс',
			]
			let month = [
				'янв',
				'фев',
				'мар',
				'апр',
				'мая',
				'июн',
				'июл',
				'авг',
				'сен',
				'окт',
				'ноя',
				'дек',
			]
			let date_obj = new Date(date)
			return [
				date_obj.getDate() + ' ' + month[date_obj.getMonth()] + ', ' + weekday[date_obj.getDay()], 
				date_obj.getHours() + ':' + (date_obj.getMinutes() > 9 ? date_obj.getMinutes() : '0' + date_obj.getMinutes())
			]
		}
	},
	mounted(){
		this.parseDate(this.dep_date)
	}
}
</script>

<style lang='scss'>
@import '@/style/ResultCard.scss';
</style>