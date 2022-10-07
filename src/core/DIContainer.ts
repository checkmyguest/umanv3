/* eslint-disable unicorn/filename-case */
import { Container } from "inversify";
import { IReservationData } from "./@models/reservation-database";
import SERVICE_IDENTIFIER from "./constants/identifiers";
import { ReservationServiceMock } from "./mock/reservation-service-mock";
import { ReservationServiceData } from "./services/reservation-service";

export class DependenciesInjectionContainer{
    public diContainer: Container = new Container;

    constructor(){
        this.configure();
    }

    public configure(){
        this.diContainer = new Container();
        if(process.env.MOCK === 'true'){
            this.configureMockRepositories();
        }else{
            this.configureRepositories();
        }
    }

    public configureRepositories(){
        this.diContainer.bind<IReservationData>(SERVICE_IDENTIFIER.RESERVATION).to(ReservationServiceData).inSingletonScope();
    }

    public configureMockRepositories(){
        this.diContainer.bind<IReservationData>(SERVICE_IDENTIFIER.RESERVATION).to(ReservationServiceMock).inSingletonScope();
    }
}