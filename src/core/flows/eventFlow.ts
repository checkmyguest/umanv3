import { ViewServiceData } from "@/core/services/view-service";
import { useAdminStore } from "../../stores/admin";


export function EventFlow(){
  getAdmin()
}

function getAdmin(){
  const viewServiceData = new ViewServiceData()
  return viewServiceData.getAdmin()
  .then(res => {
      useAdminStore().setAllAdmins(res);
    })
    .catch((error) => {
      return error.response?.status
    })
}
