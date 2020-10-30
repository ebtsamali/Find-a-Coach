<template>
	<div>
		<base-dialog :show="!!error" title="An Error occurred" @close="handleError">
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<coach-filter @change-filter="setFilter"></coach-filter>
		</section>
		<section>
			<base-card>
				<div class="controls">
					<base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
					<base-button link to="/auth?redirect=register" v-if="!isLoggedIn" >Login to Register As Coach</base-button>
					<base-button link to="/register" v-if="isLoggedIn && !isLoading && !alreadyRegistered ">Register As Coach</base-button>
				</div>
				<base-spinner v-if="isLoading"></base-spinner>
				<ul v-else-if="hasCoaches">
					<coach-item
						v-for="coach in filteredCoaches"
						:key="coach.id"
						:id="coach.id"
						:firstName="coach.firstName"
						:lastName="coach.lastName"
						:areas="coach.areas"
						:rate="coach.hourlyRate"
					></coach-item>
				</ul>
				<h3 v-else>No Coaches Found</h3>
			</base-card>
		</section>
	</div>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem';
import CoachFilter from '@/components/coaches/CoachFilter';

export default {
	components: {
		CoachItem,
		CoachFilter,
	},
	data() {
		return {
			filters: {
				backend: true,
				frontend: true,
				career: true,
			},
			isLoading: false,
			error: null,
		};
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated;
		},
		alreadyRegistered() {
			return this.$store.getters['coaches/isCoach'];
		},
		filteredCoaches() {
			const coaches = this.$store.getters['coaches/coaches'];
			return coaches.filter(coach => {
				if(this.filters.backend && coach.areas.includes('backend')) {
					return coach;
				}
				if(this.filters.frontend && coach.areas.includes('frontend')) {
					return coach;
				}
				if(this.filters.career && coach.areas.includes('career')) {
					return coach;
				}
				return false;
			})
		},
		hasCoaches() {
			return this.$store.getters['coaches/hasCoaches'];
		}
	},
	methods: {
		setFilter(updatedFilters) {
			this.filters = updatedFilters;
		},
		async loadCoaches(refresh = false) {
			this.isLoading = true;
			try {
				await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh});
			} catch(error) {
				this.error = 'Something went Wrong!, TRY AGAIN';
			}
			this.isLoading = false;
		},
		handleError() {
			this.error = null;
		}
	},
	created() {
		this.loadCoaches();
	},
}
</script>

<style scoped>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.controls {
		display: flex;
		justify-content: space-between;
	}
</style>
