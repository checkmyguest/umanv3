import { IViews } from "@/stores/event";
import { AxiosResponse } from "axios";

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
    getSwapi(): Promise<AxiosResponse<Swapi>>;
}

export interface Swapi{
    climate: String,
    diameter: Number,
    gravity: String,
    name: String,
    orbital_period: Number,
    population: Number,
    residents: Array<string>,
    rotation_period: Number,
    surface_water: Number,
    terrain: String,
    url: String    
}