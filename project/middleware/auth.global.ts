export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Auth Middleware');

    const loggedIn = true;

    if (to.name !== 'login' && !loggedIn) {
        console.log('User not logged in');
        return navigateTo('/login');
    }
});
