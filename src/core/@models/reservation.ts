interface IEdges{
    id: number,
    housing_id: number,
    housing_name: string,
    guests: boolean,
    origin: string,
    arrival_date: Date,
    departure_date: Date,
    arrival_time: string,
    departure_time: string,
    status: string,
    guest_name: string,
    firstname: string,
    lastname: string,
    phone: string,
    phone2: string,
    phone3: string,
    email: string, 
    real_email: string,
    guest_origin_id: string,
    guest_city: string,
    guest_address: string,
    guest_id: boolean,
    guest_selfie: boolean,
    ids_validation: boolean,
    final_price: number,
    code: string,
    cleaning_fees: number,
    ocisCompleted: number,
    ocisEnabled: number,
    notes: string,
    ts_create: Date,
    ts_update: Date,
    tags: Object,
    ciType:{
        housing_id: number,
        ci_type_id: string,
        ci_type_name: string
    }
}

export class Reservation{
    pageInfos:{
        total: number,
        totalPage: number
    };
    cursor: string;
    edges: Array<IEdges>


    constructor(pageInfos: {total: number, totalPage: number}, cursor: string, edges: Array<IEdges>){
        this.pageInfos = pageInfos,
        this.cursor = cursor,
        this.edges = edges
    }
}
