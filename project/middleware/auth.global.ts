export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Auth Middleware');

    const loggedIn = true;

    // TODO: criar a lógica para verificar se o usuário está logado

    if (to.name !== 'login' && !loggedIn) {
        console.log('User not logged in');
        return navigateTo('/login');
    }

    return ;
});
