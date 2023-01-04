import { defineStore } from "pinia";

export const useHousingStore = defineStore({
    id: "housingStore",
    state: () => ({
        datas: {
            housings: ''
        },
        overlay: undefined,
        reload: 0
    })
});