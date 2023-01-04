import { ViewServiceData } from "@/core/services/view-service";
import { useEventStore } from "../../stores/event";

export async function EventFocusFlow(rId: string | string[]){
    const resa = await getResaById(rId)
    getTagsByResaId(rId)
    getSelfieFilesById(rId)
    getPaymentsByResaId(rId)
    getIdentityFilesById(rId)

    getHousingById(resa.housing_id)
    getTipByHousingId(resa.housing_id)
    getStatusByHousingId(resa.housing_id)
    getBedroomByHousingId(resa.housing_id)
    getAccountManagerByHousingId(resa.housing_id)
    getLogsByHousingIdAndResaId(resa.housing_id, rId)

    getChatByPhone(resa.phone)

    getTags()
    getAirbnbTeam()
    getPlatformAccount()
    getIsAccountManager()
}

function getResaById(id: any) {
    console.log("getResaById");
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getResaById(id)
    .then(res => {
        console.log("getResaById", res);
        useEventStore().setCurrentResa(res);
        return res;
    })
    .catch((error) => {
        return error.response?.status
    })
}

function getTagsByResaId(id: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getTagsByResaId(id)
    .then(res => {
        useEventStore().setTagsByResaId(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getSelfieFilesById(id: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getSelfieFilesById(id)
    .then(res => {
        useEventStore().setSelfieFilesById(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getPaymentsByResaId(id: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getPaymentsByResaId(id)
    .then(res => {
        useEventStore().setPaymentsByResaId(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getIdentityFilesById(id: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getIdentityFilesById(id)
    .then(res => {
        useEventStore().setIdentityFilesById(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getHousingById(id: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getHousingById(id)
    .then(res => {
        useEventStore().setHousingById(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getTipByHousingId(id: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getTipByHousingId(id)
    .then(res => {
        useEventStore().setTipByHousingId(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getStatusByHousingId(id: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getStatusByHousingId(id)
    .then(res => {
        useEventStore().setStatusByHousingId(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getBedroomByHousingId(id: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getBedroomByHousingId(id)
    .then(res => {
        useEventStore().setBedroomByHousingId(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getAccountManagerByHousingId(id: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getAccountManagerByHousingId(id)
    .then(res => {
        useEventStore().setAccountManagerByHousingId(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getLogsByHousingIdAndResaId(hId: any, rId: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getLogsByHousingIdAndResaId(hId, rId)
    .then(res => {
        useEventStore().setLogsByHousingIdAndResaId(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getChatByPhone(phone: string) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getChatByPhone(phone)
    .then(res => {
        useEventStore().setChatByPhone(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getTags() {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getTags()
    .then(res => {
        useEventStore().setAllTags(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getAirbnbTeam() {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getAirbnbTeam()
    .then(res => {
        useEventStore().setAirbnbTeam(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getPlatformAccount() {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getPlatformAccount()
    .then(res => {
        useEventStore().setPlatformAccount(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getIsAccountManager() {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getIsAccountManager()
    .then(res => {
        useEventStore().setIsAccountManager(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}


 
// Requests

// https://umanv2.cmg.ovh/phoneCountryCodes.json

// https://partnerapi.igloohome.co/v1/locks/IGK3098f285d