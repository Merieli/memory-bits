import { useMatchStore } from '~/stores/match'

export default defineNuxtRouteMiddleware((to) => {
    const matchStore = useMatchStore()

    // if (to.name !== 'login' && !matchStore.match.user_id)
    //     return navigateTo('/login')
})
