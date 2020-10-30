<template>
	<div>
		<base-dialog :show="!!error" title="An Error occurred" @close="handleError">
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<base-card>
				<header>
					<h2>Requests Recieved</h2>
				</header>
				<base-spinner v-if="isLoading"></base-spinner>
				<ul v-else-if="!isLoading && hasRequests">
					<request-item v-for="request in requests" :key="request.id" :email="request.userEmail" :message="request.message"> </request-item>
				</ul>
				<h3 v-else>You have not recieved any requests yet!</h3>
			</base-card>
		</section>
	</div>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem';

export default {
	components: {
		RequestItem,
	},
	data() {
		return{
			isLoading: false,
			error: null,
		};
	},
	computed: {
		hasRequests() {
			return this.$store.getters['requests/hasRequests'];
		},
		requests() {
			return this.$store.getters['requests/requests'];
		},
	},
	methods: {
		async loadRequets() {
			this.isLoading = true
			try{
				await this.$store.dispatch('requests/fetchRequests');
			} catch(error) {
				this.error = 'faild to get requests!';
			}
			this.isLoading = false;
		},
		handleError() {
			this.error = null;
		}
	},
	created() {
		this.loadRequets();
	},
}
</script>

<style scoped>
	header {
		text-align: center;
	}

	ul {
		list-style: none;
		margin: 2rem auto;
		padding: 0;
		max-width: 30rem;
	}

	h3 {
		text-align: center;
	}
</style>