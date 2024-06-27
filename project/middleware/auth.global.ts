import { useMatchStore } from "~/stores/match";

export default defineNuxtRouteMiddleware((to, from) => {
    const matchStore = useMatchStore();

    if (to.name !== 'login' && !matchStore.match.user_id) {
        // TODO: voltar linha abaixo
        // return navigateTo('/login');
    }

    return ;
});
