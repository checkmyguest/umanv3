import { dayjs } from "element-plus";
import {
  CAUTIONS,
  EVENT_STATUS,
  GUEST_PROFILE_OPTIONS,
  RESERVATION_ORIGINS,
} from "../../../constants";
import DataSample from "./data_example2.json";

type IData = typeof DataSample;

const originFormat = RESERVATION_ORIGINS;
const cautionFormat = CAUTIONS;
const guestProfileFormat = GUEST_PROFILE_OPTIONS;
const statusFormat = EVENT_STATUS;

interface IAccountManager {
  admin_id: number;
  firstname: string;
  lastname: string;
  housing_id: number;
}

interface ITagsEvent {
  tag_id: number;
  name: string;
  reservation_id: number;
}

export interface IDataEvent {
  event: {
    id: number;
    notes: string;
  };
  origin: string;
  guest_name: string;
  phone: string;
  status: string;
  state: string;
  housing: {
    housing_id: number;
    housing_name: string;
  };
  reason: string;
  tags: ITagsEvent[];
  ts_create: string;
  arrival_date: string;
  departure_date: string;
  guestProfileStatus: string;
  caution: string;
  ciType: {
    housing_id: number;
    ci_type_id: string;
    ci_type_name: string;
    auto_validation: number;
  };
  access_device: string;
  accountManagers: IAccountManager[];
  final_price: number;
}

export function dataFormatterEvent(data: IData): IDataEvent[] {
  const dataEvent: IDataEvent[] = [];
  let state: string = "";
  data.forEach((item) => {
    item.origin = originFormat.find(
      (element) => element.value === item.origin
    )!.label;
    item.status = statusFormat.find(
      (element) => element.value === item.status
    )!.label;
    if (
      dayjs().diff(item.departure_date) > 0 &&
      dayjs(item.arrival_date).diff(dayjs()) > 0
    )
      state = "En cours";
    else if (dayjs().diff(item.departure_date) < 0) state = "À venir";
    else state = "Terminée";
    item.ts_create = dayjs(item.ts_create).format("DD.MM.YYYY HH:mm");
    item.arrival_date = dayjs(item.arrival_date).format("DD.MM.YYYY");
    item.departure_date = dayjs(item.departure_date).format("DD.MM.YYYY");
    item.guestProfileStatus = guestProfileFormat.find(
      (element) => element.value === item.guestProfileStatus
    )!.label;
    item.caution = cautionFormat.find(
      (element) => element.value === item.caution
    )!.label;
    dataEvent.push({
      event: {
        id: item.id,
        notes: item.notes,
      },
      origin: item.origin,
      guest_name: item.guest_name,
      phone: item.phone,
      status: item.status,
      state: state,
      housing: {
        housing_id: item.housing_id,
        housing_name: item.housing_name,
      },
      reason: "",
      tags: item.tags,
      ts_create: item.ts_create,
      arrival_date: item.arrival_date,
      departure_date: item.departure_date,
      guestProfileStatus: item.guestProfileStatus,
      caution: item.caution,
      ciType: {
        housing_id: item.ciType.housing_id,
        ci_type_id: item.ciType.ci_type_id,
        ci_type_name: item.ciType.ci_type_name,
        auto_validation: item.ciType.auto_validation,
      },
      access_device: "",
      accountManagers: item.accountManagers,
      final_price: item.final_price,
    });
  });
  return dataEvent;
}
