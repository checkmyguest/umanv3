import { defineStore } from "pinia";

export const useAdminStore = defineStore({
    id: "adminStore",
    state: () => ({
        datas: {
            accountManagers: "",
            admins: []
        },
        vueActive: 0,
        initVue: false,
    })
});