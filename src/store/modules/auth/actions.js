let timer;

export default {
	// login() {},
	async auth(context, payload) {
		let url = '';
		if (payload.mode === 'login') {
			url = process.env.VUE_APP_FIREBASE_AUTH_LOGIN_URL;
		} else {
			url = process.env.VUE_APP_FIREBASE_AUTH_SIGNUP_URL;
		}
		const response = await fetch(`${url}${process.env.VUE_APP_KEY}`, {
			method: 'POST',
			body: JSON.stringify({
				email: payload.email,
				password: payload.password,
				returnSecureToken: true
			})
		});

		const responseData = await response.json();
		if(!response.ok) {
			const error = new Error(responseData.message || 'faild to register!');
			throw error;
		}

		const expiresIn = +responseData.expiresIn * 1000;
		// const expiresIn = 5000;
		const expiresDate = new Date().getTime() + expiresIn;

		localStorage.setItem('user', JSON.stringify({
			token: responseData.idToken,
			userId: responseData.localId,
			tokenExpiration: expiresDate
		}));

		timer = setTimeout(function() {
			context.dispatch('autoLogout');
		}, expiresIn);

		context.commit('setUser', {
			token: responseData.idToken,
			userId: responseData.localId,
		})
	},
	tryLogin(context) {
		const user = JSON.parse(localStorage.getItem('user'));
		const expiresIn = user? +user.tokenExpiration - new Date().getTime() : '';

		if (expiresIn < 0) {
			return;
		}

		timer = setTimeout(function() {
			context.dispatch('autoLogout');
		}, expiresIn);

		if (user) {
			context.commit('setUser', user);
		}
	},
	logout(context) {
		localStorage.removeItem('user');
		clearInterval(timer);

		context.commit('setUser', {
			userId: null,
			token: null,
		})
	},
	autoLogout(context) {
		context.dispatch('logout');
		context.commit('setAutoLogout');
	}
};