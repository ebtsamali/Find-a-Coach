export default {
	async registerAsCoach(context, data) {
		const userId = context.rootGetters.userId;
		const coachData = {
			firstName: data.first,
			lastName: data.last,
			description: data.desc,
			hourlyRate: data.rate,
			areas: data.areas
		}

		const token  = context.rootGetters.token;
		const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/coaches/${userId}.json?auth=${token}`, {
			method: 'PUT',
			body: JSON.stringify(coachData)
		})
		// const responseData = await response.json();
		if(!response.ok) {
			const error = new Error(response.message || 'faild to fetch coaches!');
			throw error;
		}

		context.commit('registerAsCoach', {
			...coachData,
			userId
		});
	},
	async loadCoaches(context, payload) {
		if(!payload.forceRefresh && !context.getters.shouldUpdate) {
			return;
		}
		const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/coaches.json`)
		const responseData = await response.json();
		if(!response.ok) {
			const error = new Error(response.message || 'faild to fetch coaches!');
			throw error;
		}
		const coaches = [];
		for(let key in responseData) {
			const coach = {
				id: key,
				firstName: responseData[key].firstName,
				lastName: responseData[key].lastName,
				description: responseData[key].description,
				hourlyRate: responseData[key].hourlyRate,
				areas: responseData[key].areas,
			};
			coaches.push(coach);
		}
		
		context.commit('setCoaches', coaches);
		context.commit('setfetchTimestamp');
	}
};