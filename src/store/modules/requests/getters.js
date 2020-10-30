export default {
	requests(state) {
		// const coachId = rootGetters.userId;
		// return state.requests.filter(req => req.coachId === coachId);
		return state.requests;
	},
	hasRequests(_,getters) {
		return getters.requests && getters.requests.length > 0;
	}
};