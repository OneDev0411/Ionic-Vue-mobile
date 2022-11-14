<template>
	<ion-page class="loading">
		<div v-if="!loadingFlag" class="loader"></div>
		<div v-else class="success-loading" >
			<div class="checkmark" @click="goToNextPage">
				<ion-icon class="success-check" :icon="checkmarkOutline"></ion-icon>
			</div>
			<ion-label class="success-des">Your Gift has been sent!</ion-label>
		</div>
	</ion-page>
</template>

<script>
import {
	IonPage
} from '@ionic/vue'

import {
	checkmarkOutline
} from 'ionicons/icons'

export default {
	setup() {
		return {
			checkmarkOutline
		}
	},
	components: {
		IonPage
	},
	data() {
		return {
			loadingFlag: false
		}
	},
	methods: {
		nextPage() {
			this.loadingFlag = true	
		},
		goToNextPage() {
			console.log('test')
			this.$router.push({name: 'dreamCreation'})
		}
	},
	mounted() {
		this.$nextTick(() => {
			setTimeout(() => {
				this.nextPage()
			}, 3000)
		})
	}
}
</script>

<style>
.loading {
	display: flex;
	justify-content: center;
	align-items: center;
}
.loader {
  margin: auto;
  border: 15px solid #EAF0F6;
  border-radius: 50%;
  border-top: 15px solid #866EE1;
  width: 70px;
  height: 70px;
  animation: spinner 2.5s linear infinite;
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.success-loading {
	display: inline-block;
	justify-content: center;
	align-items: center;
}
.checkmark {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0px;
	width: 92px;
	height: 92px;
	border: 3px solid #866EE1;
	border-radius: 50%;
	margin-left: calc((100% - 92px)/2);
}
.success-check {
	font-size: 50px;
	color: #866EE1;
}
.success-des {
	font-family: 'Manrope';
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 25px;
	text-align: center;
	color: #866EE1;
	margin-top: 24px;
}
</style>