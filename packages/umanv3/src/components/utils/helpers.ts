/* eslint-disable unicorn/no-array-reduce */
import { endOfDay, fromUnixTime, isPast, isWithinInterval, startOfDay } from "date-fns";
import decode from "jwt-decode";
import { DATE_PARAMS } from "../../../constants";
import ReservationMixin from "../../mixins/reservation-mixin";
import { computeDate } from "./date";

const filtersMapper = {
  code: "codeIn",
  front_status: "progression",
  front_statusIn: "statusIn",
  front_building_name: "hid",
  front_housing_name: "hid",
  front_tagList: "tags",
  ts_create: "ts_create",
  front_date_start: "arrival_date",
  front_date_end: "departure_date",
  front_access: "nuki_token_not_null",
  front_totalAmount: "final_price",
  front_totalAmount_min: "final_price_min",
  front_totalAmount_max: "final_price_max",
  origin: "origin",
  front_caution: "ocisCompleted",
  front_access_type: "checkin_type",
  front_account_manager: "account_manager_id",
  event_type: "event_type",
  postal_code_in: "postal_code_in",
}

export const formatFilters = (filters: any[]) => {
  const payload = filters.reduce((result, { filter, key }) => {
    const mappedKey = filtersMapper[key]
    let values = filter.values
    if (filter.type === "date") {
      if (DATE_PARAMS.includes(filter.values)) {
        const computedDate = computeDate(filter.values)
        values = computedDate?.onDate
        result[`${mappedKey}_before`] = computedDate?.beforeDate
        result[`${mappedKey}_after`] = computedDate?.afterDate
      } else {
        values = filter.onDate
        result[`${mappedKey}_before`] = filter.beforeDate
        result[`${mappedKey}_after`] = filter.afterDate
      }
    }
    if (filter.type === "number") {
      values = filter.onNumber
      result[`${mappedKey}_before`] = filter.beforeNumber
      result[`${mappedKey}_after`] = filter.afterNumber
    }

    if (result[mappedKey]) {
      values = [...result[mappedKey], ...filter.values]
    }
    return {
      ...result,
      [mappedKey]: values || undefined,
    }
  }, {})

  return Object.entries(payload).reduce((a, [k, v]) => (!v || v.length === 0 ? a : ((a[k] = v), a)), {})
}

export const cleanObject = (object: { [s: string]: unknown } | ArrayLike<unknown>) =>
  Object.entries(object).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {})

export const formatReservation = (reservation: { front_tagList: any; tags: any[]; status: any; arrival_date: any; date_start: any; departure_date: any; date_end: any; front_statusIn: string; front_status: string; front_totalAmount: any; final_price: any; front_access: string; nuki_token: any; front_housing_name: any; housing_name: any; housing_id: any; front_account_managers: any; front_access_type: any; ciType: { ci_type_name: any }; front_caution: any; front_date_start: any; front_date_end: any }, store: { accountManagers: any[]; admins: any[] }) => {
  reservation.front_tagList = reservation.tags.map((tag) => tag.name)
  const status = reservation.status
  const currentDate = new Date()
  const staying = {
    start: startOfDay(new Date(reservation.arrival_date || reservation.date_start)),
    end: endOfDay(new Date(reservation.departure_date || reservation.date_end)),
  }

  reservation.front_statusIn =
    status === "Tentative"
      ? "Tentative"
      : (status === "1" || status === "Canceled"
      ? "Annulée"
      : "Réservée")

  reservation.front_status =
    currentDate < staying.start
      ? "À venir"
      : (isWithinInterval(currentDate, staying)
      ? "En cours"
      : "Terminée")

  reservation.front_totalAmount = reservation.final_price
  reservation.front_access = reservation.nuki_token ? "Smartlock" : "KeyCafe"
  reservation.front_housing_name = reservation.housing_name

  const accountManagerIds = store.accountManagers.reduce((result, account) => {
    if (account.housing_id === reservation.housing_id) result.push(account.admin_id)
    return result
  }, [])

  const admins =
    accountManagerIds && store.admins.filter((admin) => accountManagerIds.includes(admin.admin_id))

  reservation.front_account_managers = admins.map((admin: { firstname: any; lastname: any }) => `${admin.firstname} ${admin.lastname}`)
  reservation.front_access_type = reservation.ciType?.ci_type_name
  reservation.front_caution = ReservationMixin.methods.cautionStatus(reservation)

  reservation.front_date_start = staying.start
  reservation.front_date_end = staying.end
  return reservation
}

export const formatMaintenance = (maintenance: { arrival_date: any; date_start: any; departure_date: any; date_end: any; front_access: string; nuki_token: any; front_housing_name: any; housing_name: any; housing_id: any; front_status: string; front_account_managers: any; front_access_type: any; ciType: { ci_type_name: string }; front_date_start: Date; front_date_end: Date; front_caution: undefined; front_tagList: never[] }, store: { accountManagers: any[]; admins: any[] }) => {
  const staying = {
    start: new Date(maintenance.arrival_date || maintenance.date_start),
    end: new Date(maintenance.departure_date || maintenance.date_end),
  }
  const currentDate = new Date()
  maintenance.front_access = maintenance.nuki_token ? "Smartlock" : "KeyCafe"
  maintenance.front_housing_name = maintenance.housing_name
  const accountManagerIds = store.accountManagers.reduce((result, account) => {
    if (account.housing_id === maintenance.housing_id) result.push(account.admin_id)
    return result
  }, [])
  const admins =
    accountManagerIds && store.admins.filter((admin) => accountManagerIds.includes(admin.admin_id))
  maintenance.front_status =
    currentDate < staying.start
      ? "À venir"
      : (isWithinInterval(currentDate, staying)
      ? "En cours"
      : "Terminée")
  maintenance.front_account_managers = admins.map((admin: { firstname: any; lastname: any }) => `${admin.firstname} ${admin.lastname}`)
  maintenance.front_access_type = maintenance.ciType?.ci_type_name || ""
  maintenance.front_date_start = staying.start
  maintenance.front_date_end = staying.end
  maintenance.front_caution = undefined
  maintenance.front_tagList = []
  return maintenance
}

export const isValidToken = (token: any) => {
  if (!token) return false
  const decoded = decode(token)
  return !isPast(fromUnixTime(decoded.exp))
}
