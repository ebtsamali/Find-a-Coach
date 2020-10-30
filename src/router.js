import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

import CoachesList from './pages/coahes/CoahesList.vue';
// import UserAuth from '@/pages/auth/UserAuth';
// import CoachDetails from './pages/coahes/CoachDetails.vue';
// import CoachRegestration from './pages/coahes/CoachRegestration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsRecieved from './pages/requests/RequestsRecieved.vue';
// import NotFound from './pages/NotFound.vue';
import store from './store/index';

const CoachDetails = defineAsyncComponent(() =>
  import('./pages/coahes/CoachDetails.vue')
);
const CoachRegestration = defineAsyncComponent(() =>
  import('./pages/coahes/CoachRegestration.vue')
);
const ContactCoach = defineAsyncComponent(() =>
  import('./pages/requests/ContactCoach.vue')
);
const RequestsRecieved = defineAsyncComponent(() =>
  import('./pages/requests/RequestsRecieved.vue')
);
const UserAuth = defineAsyncComponent(() =>
  import('./pages/auth/UserAuth')
);
const NotFound = defineAsyncComponent(() =>
  import('./pages/NotFound.vue')
);

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{path: '/', redirect: '/coaches'},
		{path: '/auth', component: UserAuth, meta: {requiresUnAuth: true}},
		{path: '/coaches', component: CoachesList},
		{path: '/coaches/:id', component: CoachDetails, props: true, children: [
			{path: 'contact', component: ContactCoach}, // /coaches/:id/contact
		]},
		{path: '/register', component: CoachRegestration, meta: {requiresAuth: true}},
		{path: '/requests', component: RequestsRecieved, meta: {requiresAuth: true}},
		{path: '/:notFound(.*)', component: NotFound},
	],
});

router.beforeEach(function(to,_, next) {
	const isAuthenticated = store.getters.isAuthenticated;
	if (to.meta.requiresAuth && !isAuthenticated) {
		next('/auth');
	} else if(to.meta.requiresUnAuth && isAuthenticated) {
		next('/coaches')
	} else {
		next();
	}
})

export default router;