import { ViewServiceData } from "@/core/services/view-service";
import { useEventStore } from "../../stores/event";

export function EventFocusFlow(rId: string | string[] ){
    console.log("EventFocusFlow")
    getResa(rId)
    getTags()
}

function getResa(id: any) {
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getResaById(id)
    .then(res => {
        console.log("getResaById", res)
        useEventStore().setCurrentResa(res);
    })
    .catch((error) => {
        return error.response?.status
    })
}
  
function getTags() {
    console.log("getTags", useEventStore().allTags.length)
    if(useEventStore().allTags.length > 0) return;
    console.log("getTags ELSE")
    const viewServiceData = new ViewServiceData()
    return viewServiceData.getTags()
    .then(res => {
        console.log("getTags", res)
        useEventStore().setAllTags(res);
    })
    .catch((error) => {  
        return error.response?.status
    })
}
  



  // LEFT
  // https://api.cmg.ovh:3000/v2/reservations/434007
  // https://api.cmg.ovh:3000/v1/tag


        // ?? https://api.cmg.ovh:3000/v1/reservation/tags?reservation_id=434007

    // CENTER

    // RIGHT






    // Requests
    
    // https://api.cmg.ovh:3000/v1/payments/reservation/434007/all/
    // https://api.cmg.ovh:3000/v1/infobip?chat_with=+351938530198
    // https://api.cmg.ovh:3000/v1/housing/1280
    // https://api.cmg.ovh:3000/v1/housing/1280/tip
    // https://api.cmg.ovh:3000/v1/housing/1280/alert?status=progress
    // https://api.cmg.ovh:3000/v1/housing/1280/account_manager
    // https://api.cmg.ovh:3000/v1/housing/1280/reservation/434007/logs
    // https://api.cmg.ovh:3000/v1/airbnb_team
    // https://api.cmg.ovh:3000/v1/file?reservation_id=434007&entity_type=ocis_id
    // https://api.cmg.ovh:3000/v1/file?reservation_id=434007&entity_type=ocis_selfie
    // https://api.cmg.ovh:3000/v1/admin?is_account_manager=1
    // https://api.cmg.ovh:3000/v1/platform_account
    // https://api.cmg.ovh:3000/v1/bedroom?housing_id=1280

    // https://umanv2.cmg.ovh/phoneCountryCodes.json
    
    // https://partnerapi.igloohome.co/v1/locks/IGK3098f285d