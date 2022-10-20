import http from "@/http-common";
import { injectable } from "inversify";
import { View } from "../@models/view";
import { IViewData, Type } from "../@models/view-database";

@injectable()
export class ViewServiceData implements IViewData{
    public getView(): Promise<View[]> {
        return http.get("/v2/view");
    }
    public postView(position: number, filters: JSON, name: string, type: Type): Promise<void> {
        const data = {
            position,
            filters,
            name,
            type
        }
        return http.post("/v2/view", data);
    }
    public putView(id: number): Promise<View[]> {
        return http.put(`/v2/view/${id}`);
    }
    public deleteView(id: number): Promise<void> {
        return http.delete(`/v2/view/${id}`);
    }
    public postViewChangeOrder(id: number): Promise<void> {
        return http.delete(`/v2/view/${id}/change-order`);
    }
}

export default new ViewServiceData();