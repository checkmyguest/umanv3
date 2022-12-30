import { IViews } from "@/stores/event";

export enum Type{
    HOUSING = "HOUSING",
    CALENDAR = "CALENDAR",
    EVENT = "EVENT",
    TODO = "TODO"
}

export interface IViewData{
    getView(type: string): Promise<any[]>;
    postView(
        position: number,
        filters: JSON,
        name: string,
        type: Type
    ): Promise<IViews>;
    putView(id: number): Promise<IViews>;
    deleteView(id: number): Promise<void>;
    postViewChangeOrder(id: number): Promise<void>;
}