export default {
	registerAsCoach(state, payload) {
		state.coaches.push(payload);
	},
	setCoaches(state, payload) {
		state.coaches = payload;
	},
	setfetchTimestamp (state) {
		state.lastFetch = new Date().getTime();
	}
};