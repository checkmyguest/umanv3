import { View } from "./view";

export enum Type{
    HOUSING = "HOUSING",
    CALENDAR = "CALENDAR",
    EVENT = "EVENT",
    TODO = "TODO"
}

export interface IViewData{
    getView(): Promise<View[]>;
    postView(
        position: number,
        filters: JSON,
        name: string,
        type: Type
    ): Promise<void>;
    putView(id: number): Promise<View[]>;
    deleteView(id: number): Promise<void>;
    postViewChangeOrder(id: number): Promise<void>;
}