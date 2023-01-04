import http from "@/http-common";
import { IViews } from "@/stores/event";
import { injectable } from "inversify";
import { IViewData, Type } from "../@models/view-database";


@injectable()
export class ViewServiceData implements IViewData{
    public getView(type: string): Promise<any[]> {
        return http.get(`/v2/view?type=${type}`);
    }
    public postView(position: number, filters: JSON, name: string, type: Type): Promise<IViews> {
        const data = {
            position,
            filters,
            name,
            type
        }
        return http.post("/v2/view", data);
    }
    public putView(id: number): Promise<IViews> {
        return http.put(`/v2/view/${id}`);
    }
    public deleteView(id: number): Promise<void> {
        return http.delete(`/v2/view/${id}`);
    }
    public postViewChangeOrder(id: number): Promise<void> {
        return http.delete(`/v2/view/${id}/change-order`);
    }
    public getReservation(id: number): Promise<any> {
        return http.get(`/v1/reservations/${id}`);
    }
    public getMaintenance(id: number): Promise<any> {
        return http.get(`/v1/maintenances/${id}`);
    }
    public getAdmin(): Promise<any> {
        return http.get(`/v1/admin?active=1`)
    }

    // FOCUS
    public getAdminById(id: string): Promise<any> {
        return http.get(`/v1/admin/${id}`)
    }
    public getResaById(id: string): Promise<any> {
        return http.get(`/v2/reservations/${id}`)
    }
    public getTags(): Promise<any> {
        return http.get(`/v1/tag`)
    }
    public getTagsByResaId(id: string): Promise<any> {
        return http.get(`/v1/reservation/tags?reservation_id=${id}`)
    }
    public getPaymentsByResaId(id: string): Promise<any> {
        return http.get(`/v1/payments/reservation/${id}/all/`)
    }
    public getIdentityFilesById(id: string): Promise<any> {
        return http.get(`/v1/file?reservation_id=${id}&entity_type=ocis_id`)
    }
    public getSelfieFilesById(id: string): Promise<any> {
        return http.get(`/v1/file?reservation_id=${id}&entity_type=ocis_selfie`)
    }
    public getHousingById(id: string): Promise<any> {
        return http.get(`/v1/housing/${id}`)
    }
    public getTipByHousingId(id: string): Promise<any> {
        return http.get(`/v1/housing/${id}/tip`)
    }
    public getAccountManagerByHousingId(id: string): Promise<any> {
        return http.get(`/v1/housing/${id}/account_manager`)
    }
    public getStatusByHousingId(id: string): Promise<any> {
        return http.get(`/v1/housing/${id}/alert?status=progress`)
    }
    public getLogsByHousingIdAndResaId(hId: string, rId: string): Promise<any> {
        return http.get(`/v1/housing/${hId}/reservation/${rId}/logs`)
    }
    public getBedroomByHousingId(id: string): Promise<any> {
        return http.get(`/v1/bedroom?housing_id=${id}`)
    }
    public getChatByPhone(phone: string): Promise<any> {
        return http.get(`/v1/infobip?chat_with=${phone}`)
    }
    public getAirbnbTeam(): Promise<any> {
        return http.get(`/v1/airbnb_team`)
    }
    public getIsAccountManager(): Promise<any> {
        return http.get(`/v1/admin?is_account_manager=1`)
    }
    public getPlatformAccount(): Promise<any> {
        return http.get(`/v1/platform_account`)
    }




}

export default new ViewServiceData();