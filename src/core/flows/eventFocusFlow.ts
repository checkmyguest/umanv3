import { ViewServiceData } from "@/core/services/view-service";
import { useEventStore } from "../../stores/event";

export function EventFocusFlow(rId: string | string[], hId: string | string[], phone: string){
    getResaById(rId)
    getTags()
    getTagsByResaId(rId)
    getPaymentsByResaId(rId)
    getIdentityFilesById(rId)
    getSelfieFilesById(rId)
    getHousingById(hId)
    getTipByHousingId(hId)
    getAccountManagerByHousingId(hId)
    getStatusByHousingId(hId)
    getLogsByHousingIdAndResaId(hId, rId)
    getBedroomByHousingId(hId)
    getChatByPhone(phone)
    getAirbnbTeam()
    getIsAccountManager()
    getPlatformAccount()
}

function getResaById(id: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getResaById(id)
    .then(res => {
        useEventStore().setCurrentResa(res);
    })
    .catch((error) => {
        return error.response?.status
    })
}

function getTags() {
    if(useEventStore().allTags.length > 0) return;
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getTags()
    .then(res => {
        useEventStore().setAllTags(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getTagsByResaId(id: any) {
    if(useEventStore().tagsByResaId.length > 0) return;
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getTagsByResaId(id)
    .then(res => {
        useEventStore().setTagsByResaId(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getPaymentsByResaId(id: any) {
    if(useEventStore().paymentsByResaId.length > 0) return;
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
    if(useEventStore().identityFilesById.length > 0) return;
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getIdentityFilesById(id)
    .then(res => {
        useEventStore().setIdentityFilesById(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}

function getSelfieFilesById(id: any) {
    if(useEventStore().selfieFilesById.length > 0) return;
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getSelfieFilesById(id)
    .then(res => {
        useEventStore().setSelfieFilesById(res);
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

function getChatByPhone(phone: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getChatByPhone(phone)
    .then(res => {
        useEventStore().setChatByPhone(res);
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




 
    // Requests
    
    // https://api.cmg.ovh:3000/v1/platform_account

    // https://umanv2.cmg.ovh/phoneCountryCodes.json
    
    // https://partnerapi.igloohome.co/v1/locks/IGK3098f285d