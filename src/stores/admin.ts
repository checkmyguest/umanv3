import { defineStore } from "pinia";

export const useAdminStore = defineStore({
    id: "adminStore",
    state: () => ({
        datas: {
            accountManagers: "",
            admins: [],
        },
        vueActive: 0,
        initVue: false,
        logStatus: true,
        allAdmins: [],
    }),
    getters:{
        getLogStatus(): boolean{
            return this.logStatus;
        }
    },
    actions: {
        logIn(){
            this.logStatus = true;
        },
        logOut(){
            this.logStatus = false;
        },
        setAllAdmins(admins: any){
            this.allAdmins = admins;
        },
    }
});