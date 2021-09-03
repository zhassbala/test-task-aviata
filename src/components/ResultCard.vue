<template>
  <div class="card">
		<div class="card-details">
			<div class="logo-wrapper">
				<img :src="this.img_url" alt=""> <span>{{this.company}}</span>
			</div>

			<div class="date-time date-time-arr">
				<span class="date">
					25 jan, Mon
				</span>
				<span class="time">
					23:25
				</span>
			</div>

			<div class="visual-details">
				<div class="details-upper">
					<span class="des-city">
						{{this.origin_code}}
					</span>

					<span class="flight-time">
						4 h 20 m
					</span>

					<span class="des-city">
						{{this.destination_code}}
					</span>
				</div>
				<div class="details-center">
					<img src="@/assets/road_line.svg" alt="">
				</div>
			</div>

			<div class="date-time date-time-arr">
				<span class="date">
					25 jan, Mon
				</span>
				<span class="time">
					23:25
				</span>
			</div>
		</div>
		
		<div class="details-and-conditions">
			<a href="#">Flight Details</a>
			<a href="#">Tariff Terms</a>
			<span class="dark" v-if="!this.refundable"><img src="@/assets/irrevocable.svg" alt=""> irrefundable</span>
		</div>

		<div class="pricecard">
			<span class="price">{{`${this.price} ${this.currency}`}}</span>
			<button class="button-green">
				Select
			</button>

			<span class="description dark">Price for all the passengers</span>

			<div class="luggage">
				<span>No luggage</span> <button class="button-lightblue">+ Add Luggage</button>
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
		}
	},
	computed: {
		img_url(){
			return this.img_code ? `https://aviata.kz/static/airline-logos/80x80/${this.img_code}.png` : 'https://via.placeholder.com/80.png'
		}
	}
}
</script>

<style lang='scss'>
@import '@/style/ResultCard.scss';
</style>