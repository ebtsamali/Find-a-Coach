export default {
	async contactCoach(context, payload) {
		const newRequest = {
			userEmail: payload.email,
			message: payload.message,
		}
		const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/requests/${payload.coachId}.json`, {
			method: 'POST',
			body: JSON.stringify(newRequest)
		})

		const responseData = response.json();
		if(!response.ok) {
			const error = new Error(response.message || 'faild to send request!');
			throw error;
		}
		newRequest.id = responseData.name;
		newRequest.coachId = payload.coachId,
		context.commit('contactCoach', newRequest);
	},
	async fetchRequests(context) {
		const coachId = context.rootGetters.userId;
		const token  = context.rootGetters.token;
		const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/requests/${coachId}.json?auth=${token}`);
		const responseData = await response.json();

		if(!response.ok) {
			const error = new Error(response.message || 'faild to fetch Requests!');
			throw error;
		}
		const requests = [];
		for(let key in responseData) {
			const request = {
				id: key,
				coachId,
				userEmail: responseData[key].userEmail,
				message: responseData[key].message,
			};
			requests.push(request);
		}
		context.commit('setRequests', requests)
	}
};