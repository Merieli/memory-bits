

export const useGameStore = defineStore("game", () => {
    const game = ref();

    return {
        game
    }
}, {
    persist: true,
})