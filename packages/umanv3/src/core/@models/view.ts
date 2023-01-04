export class View{
    id: number;
    filters: JSON;
    position: number;
    name: string;

    constructor(id: number, filters: JSON, position: number, name: string){
        this.id = id,
        this.filters = filters,
        this.position = position,
        this.name = name
    }
}