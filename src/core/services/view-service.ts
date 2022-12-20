import http from "@/http-common";
import { IViews } from "@/stores/event";
import { injectable } from "inversify";
import { IViewData, Swapi, Type } from "../@models/view-database";
import axios, { AxiosResponse } from "axios";


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





    public getSwapi(): Promise<AxiosResponse<Swapi>> {
        return axios.get(`https://swapi.dev/api/planets/1/`);
    }
}

export default new ViewServiceData();