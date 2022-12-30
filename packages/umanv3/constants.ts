export default {
  TABS: [
    {
      title: "Derniers paiements pointés",
      to: "billing",
      slug: "facturation_invoice.php",
    },
    {
      title: "Réservations non pointées",
      to: "billing/not-link",
      slug: "facturation_not_link.php",
    },
    {
      title: "Frais/Débours créés",
      to: "billing/charge",
      slug: "facturation_charge.php",
    },
    {
      title: "Derniers paiements",
      to: "billing/payout",
      slug: "facturation_payout.php",
    },
    {
      title: "Comptes plateformes",
      to: "billing/account",
      slug: "facturation_account.php",
    },
    {
      title: "Facturation des débours",
      to: "billing/debours",
      slug: "facturation_debours.php",
    },
    {
      title: "Formulaire de pointage",
      to: "billing/pointage",
      slug: "facturation_pointage_v2.php",
    },
    {
      title: "Gestion factures",
      to: "billing/invoices",
      slug: "upload_invoices.php",
    },

    {
      title: "Smartlocks",
      to: "access",
      slug: "smartlocks.php",
    },
    {
      title: "Intersim",
      to: "access/intersim",
      slug: "intersims.php",
    },
    {
      title: "Clés",
      to: "access/keys",
      slug: "keys.php",
    },
    {
      title: "Keynest",
      to: "access/keynest",
      slug: "keynest.php",
    },
    {
      title: "Roomonitor",
      to: "access/roomonitor",
      slug: "roomonitor.php",
    },

    {
      title: "Transactions Stripe",
      to: "stripe",
      slug: "stripe.php",
    },
    {
      title: "CSV/XML",
      to: "stripe/xml",
      slug: "xml.php",
    },

    {
      title: "Aircall",
      to: "aircall",
      slug: "aircall.php",
    },
    {
      title: "Liste des opérateurs",
      to: "aircall/agent",
      slug: "aircall_agent.php",
    },

    {
      title: "Dashboard AM",
      to: "am",
      slug: "dasham.php",
    },
    {
      title: "Mon dashboard",
      to: "am/me",
      slug: "am.php",
    },

    {
      title: "Planning Ménage",
      to: "planning",
      slug: "planning.php",
    },
    {
      title: "Planning Maintenance",
      to: "planning/maintenance",
      slug: "planning.php?type=3",
    },
    {
      title: "Planning Runner",
      to: "planning/runner",
      slug: "planning.php?type=4",
    },

    {
      to: "dmin",
      slug: "administrators.php",
    },
    {
      title: "Agents",
      to: "agent",
      slug: "agents_list.php",
    },
    {
      title: "Disponibilité",
      to: "agent/dispo",
      slug: "workingdays.php",
    },
    {
      title: "Recap horaire",
      to: "agent/recap",
      slug: "recap_agent.php",
    },
    {
      title: "Temps supp et malus",
      to: "agent/time",
      slug: "cleaning_validation.php",
    },
    {
      title: "Factures",
      to: "agent/invoices",
      slug: "agent_invoices.php",
    },
    {
      to: "analytic",
      slug: "index.php?page=1",
    },
    {
      to: "communication",
      slug: "communicationsV2.php",
    },
    {
      to: "housing",
      slug: "housings.php",
    },
    {
      to: "mandate",
      slug: "mandates.php",
    },
    {
      to: "mandate/focus",
      slug: "mandate.php",
      params: ["id"],
    },
    {
      to: "mission",
      slug: "missions.php",
    },
    {
      to: "mission/focus",
      slug: "mission.php",
      params: ["mid"],
    },
    {
      to: "owner",
      slug: "hosts.php",
    },
    {
      to: "price",
      slug: "prices.php",
    },
    {
      to: "reservation",
      slug: "reservations.php",
    },
    {
      to: "stock",
      slug: "stock.php",
    },
    {
      to: "translation",
      slug: "translations.php",
    },
    {
      to: "calendar",
      slug: "housing.php",
      params: ["id", "onglet"],
    },
    {
      to: "housing/focus",
      slug: "housing_view.php",
      params: ["hid"],
    },
    {
      to: "owner/focus",
      slug: "host.php",
      params: ["id"],
    },
    {
      to: "agent/focus",
      slug: "agent.php",
      params: ["id"],
    },
    {
      to: "event/focus",
      slug: "reservation_view.php",
      params: ["rid", "hid"],
    },
    {
      to: "event/focus",
      slug: "unavailabilities.php",
      params: ["unid", "hid"],
    },
    {
      to: "caution",
      slug: "deposit_board.php",
    },
    {
      to: "event/focus",
      slug: "reservations_list.php",
      params: ["rid", "hid"],
    },
  ],
  BLENDER_COMPONENTS: [
    "BlenderDescription",
    "GlobalHousing",
    "GlobalDate",
    "GlobalDate",
    "BlenderType",
    "GlobalDatePicker",
    "BlenderOrder",
    "BlenderReservation",
    "BlenderKey",
    "BlenderPurchase",
    "BlenderStatus",
    "BlenderAssigns",
  ],
  BLENDER_CATEGORIES: [
    "Account Manager",
    "Cleaning",
    "Maintenance",
    "Runner",
    "Axa",
    "Remboursement Travel",
    "Case Manager",
    "Objet trouvé",
    "Onboarding",
  ],
  HOURS: [
    { id: 1, hour: ["00:00:00", "00:15:00", "00:30:00", "00:45:00"] },
    { id: 2, hour: ["01:00:00", "01:15:00", "01:30:00", "01:45:00"] },
    { id: 3, hour: ["02:00:00", "02:15:00", "02:30:00", "02:45:00"] },
    { id: 4, hour: ["03:00:00", "03:15:00", "03:30:00", "03:45:00"] },
    { id: 5, hour: ["04:00:00", "04:15:00", "04:30:00", "04:45:00"] },
    { id: 6, hour: ["05:00:00", "05:15:00", "05:30:00", "05:45:00"] },
    { id: 7, hour: ["06:00:00", "06:15:00", "06:30:00", "06:45:00"] },
    { id: 8, hour: ["07:00:00", "07:15:00", "07:30:00", "07:45:00"] },
    { id: 9, hour: ["08:00:00", "08:15:00", "08:30:00", "08:45:00"] },
    { id: 10, hour: ["09:00:00", "09:15:00", "09:30:00", "09:45:00"] },
    { id: 11, hour: ["10:00:00", "10:15:00", "10:30:00", "10:45:00"] },
    { id: 12, hour: ["11:00:00", "11:15:00", "11:30:00", "11:45:00"] },
    { id: 13, hour: ["12:00:00", "12:15:00", "12:30:00", "12:45:00"] },
    { id: 14, hour: ["13:00:00", "13:15:00", "13:30:00", "13:45:00"] },
    { id: 15, hour: ["14:00:00", "14:15:00", "14:30:00", "14:45:00"] },
    { id: 16, hour: ["15:00:00", "15:15:00", "15:30:00", "15:45:00"] },
    { id: 17, hour: ["16:00:00", "16:15:00", "16:30:00", "16:45:00"] },
    { id: 18, hour: ["17:00:00", "17:15:00", "17:30:00", "17:45:00"] },
    { id: 19, hour: ["18:00:00", "18:15:00", "18:30:00", "18:45:00"] },
    { id: 20, hour: ["19:00:00", "19:15:00", "19:30:00", "19:45:00"] },
    { id: 21, hour: ["20:00:00", "20:15:00", "20:30:00", "20:45:00"] },
    { id: 22, hour: ["21:00:00", "21:15:00", "21:30:00", "21:45:00"] },
    { id: 23, hour: ["22:00:00", "22:15:00", "22:30:00", "22:45:00"] },
    { id: 24, hour: ["23:00:00", "23:15:00", "23:30:00", "23:45:00"] },
  ],
}

export const GCP_PUBLIC_FOLDER = "https://storage.googleapis.com/files-cmg"
export const PLATFORM_CAUTION = [
  "Booking.com",
  "Expedia",
  "Abritel.fr",
  "HomeAway",
  "travel.checkmyguest.fr",
  "www.garegodillot.com",
  "direct",
  "veepee.smily.com",
  "Vrbo",
]

export const DATE_PARAMS = [
  { value: "last_month", label: "Le mois dernier" },
  { value: "before_yesterday", label: "Avant-hier" },
  { value: "yesterday", label: "Hier" },
  { value: "today", label: "Aujourd'hui" },
  { value: "tomorrow", label: "Demain" },
  { value: "after_tomorrow", label: "Après-demain" },
  { value: "current_month", label: "Ce mois-ci" },
  { value: "next_month", label: "Le prochain mois" },
]

const EVENT_TYPE = [
  { value: "reservations", label: "Réservation" },
  { value: "maintenances", label: "Indisponibilité" },
]

const RESERVATION_ORIGINS = [
  { label: "Abritel", value: "Abritel.fr" },
  { label: "Airbnb", value: "Airbnb" },
  { label: "Booking", value: "Booking.com" },
  { label: "Checkmyguest", value: "direct" },
  { label: "Expedia", value: "Expedia" },
  { label: "Homeaway", value: "Homeaway" },
  { label: "Homelike", value: "Homelike" },
  { label: "Marriott", value: "Marriott;HVMI" },
  { label: "Morning Croissant", value: "Morning Croissant" },
  { label: "Plum Guide", value: "Plum Guide" },
  { label: "Studapart", value: "Studapart" },
  { label: "Travel", value: "travel.checkmyguest.fr" },
  { label: "Veepee", value: "veepee.smily.com" },
  { label: "Work", value: "work.checkmyguest.fr" },
]

const UNAVAILABILITIES_REASONS = [
  { label: "Propriétaire", value: "owner" },
  { label: "Maintenance", value: "cleaning" },
  { label: "Ménage", value: "maintenance" },
  { label: "Autre", value: "other" },
]

const EVENT_STATUS = [
  { label: "Réservée", value: "Booked" },
  { label: "Tentative", value: "Tentative" },
  { label: "Annulée", value: "Canceled" },
]

const PROGRESSIONS = [
  { label: "En cours", value: "inProgress" },
  { label: "Terminée", value: "past" },
  { label: "À venir", value: "incoming" },
]

const REGIONS = [
  { label: "Normandie", value: "50;14;61;27;76" },
  { label: "PACA", value: "05;06;04;84;13;83" },
]

const CAUTIONS = [
  { label: "Réglée", value: 1 },
  { label: "Non réglée", value: 0 },
]

const CHECKIN_TYPE = [
  { label: "Boîte à clés", value: "bac" },
  { label: "Boîte à clés connectée", value: "bac_connected" },
  { label: "Checkin manuel", value: "checkin_manual" },
  { label: "Digicode", value: "digicode" },
  { label: "KeyCafe", value: "key_cafe" },
  { label: "KeyNest", value: "key_nest" },
  { label: "Serrure électronique", value: "serrure_electronique" },
]

interface IOptions{
  label: string,
  value: string | number
}

export interface IEventFilters{
  key: string;
  label: string;
  type: string;
  search?: boolean;
  multi?: boolean;
  icon?: string | boolean;
  options?: IOptions[];
  dependsOn?:{
    key: string,
    values: string[],
  };
  external?: boolean;
  interval?: boolean;
  placeholder?: string
}

export const EVENT_FILTERS: Array<IEventFilters>= [
  {
    key: "eventType",
    label: "Type Événements",
    options: EVENT_TYPE,
    type: "select",
    search: false,
    multi: false,
    icon: false,
  },
  {
    key: "statusIn",
    label: "Statut",
    options: EVENT_STATUS,
    type: "select",
    search: false,
    multi: true,
    dependsOn: {
      key: "eventType",
      values: ["reservations"],
    },
    icon: "color",
  },
  {
    key: "progression",
    label: "État",
    options: PROGRESSIONS,
    type: "select",
    search: false,
    multi: true,
    icon: "color",
    dependsOn: {
      key: "eventType",
      values: ["reservations", "maintenances"],
    },
  },
  {
    key: "origin",
    label: "Plateforme",
    options: RESERVATION_ORIGINS,
    type: "select",
    search: false,
    multi: true,
    dependsOn: {
      key: "eventType",
      values: ["reservations"],
    },
    icon: "platform",
  },
  {
    key: "postal_code_in",
    label: "Région",
    type: "select",
    options: REGIONS,
    search: false,
    multi: true,
    dependsOn: {
      key: "eventType",
      values: ["reservations", "maintenances"],
    },
  },
  {
    key: "building_name",
    label: "Etablissement",
    type: "select",
    search: true,
    multi: true,
    dependsOn: {
      key: "eventType",
      values: ["reservations", "maintenances"],
    },
    external: true,
  },
  {
    key: "hid",
    label: "Logement",
    type: "select",
    search: true,
    multi: true,
    dependsOn: {
      key: "eventType",
      values: ["reservations", "maintenances"],
    },
    external: true,
  },
  {
    key: "reason",
    label: "Motif indisponibilité",
    type: "select",
    options: UNAVAILABILITIES_REASONS,
    multi: true,
    search: false,
    dependsOn: {
      key: "eventType",
      values: ["maintenances"],
    },
    icon: "platform",
  },
  {
    key: "tags",
    label: "Tags",
    type: "select",
    multi: true,
    search: true,
    dependsOn: {
      key: "eventType",
      values: ["reservations"],
    },
    external: true,
  },
  {
    key: "ts_create",
    label: "Date de création",
    type: "date",
    interval: true,
    options: DATE_PARAMS,
    dependsOn: {
      key: "eventType",
      values: ["reservations", "maintenances"],
    },
  },
  {
    key: "arrival_date",
    label: "Date de début",
    type: "date",
    interval: true,
    options: DATE_PARAMS,
    dependsOn: {
      key: "eventType",
      values: ["reservations", "maintenances"],
    },
  },
  {
    key: "departure_date",
    label: "Date de fin",
    type: "date",
    interval: true,
    options: DATE_PARAMS,
    dependsOn: {
      key: "eventType",
      values: ["reservations", "maintenances"],
    },
  },
  {
    key: "ocisCompleted",
    label: "Caution",
    options: CAUTIONS,
    type: "select",
    multi: true,
    search: false,
    dependsOn: {
      key: "eventType",
      values: ["reservations"],
    },
    icon: "color",
  },
  {
    key: "checkin_type",
    label: "Type d'accès",
    type: "select",
    options: CHECKIN_TYPE,
    multi: true,
    dependsOn: {
      key: "eventType",
      values: ["reservations", "maintenances"],
    },
    external: true,
  },
  {
    key: "account_manager_id",
    label: "Account managers",
    type: "select",
    multi: true,
    search: true,
    icon: "initial",
    dependsOn: {
      key: "eventType",
      values: ["reservations", "maintenances"],
    },
    external: true,
  },
  {
    key: "final_price",
    label: "Montant (€)",
    type: "number",
    interval: true,
    dependsOn: {
      key: "eventType",
      values: ["reservations", "maintenances"],
    },
  },
]

export const EVENT_COLUMNS = [
  {
    label: "événements",
    key: "id",
    sticky: true,
    sort: false,
  },
  {
    label: "plateforme",
    key: "origin",
    sort: true,
  },
  {
    label: "voyageur",
    sort: false,
  },
  {
    label: "statut",
    key: "status",
    sort: true,
  },
  {
    label: "état",
    sort: false,
  },
  {
    label: "établissement",
    key: "housing_name",
    sort: true,
  },
  {
    label: "logement",
    key: "housing_name",
    sort: true,
  },
  {
    label: "motif indisponibilité",
    sort: false,
  },
  {
    label: "tags",
    sort: false,
  },
  {
    label: "date de création",
    key: "ts_create",
    sort: true,
  },
  {
    label: "date de début",
    key: "arrival_date",
    sort: true,
  },
  {
    label: "date de fin",
    key: "departure_date",
    sort: true,
  },
  {
    label: "caution",
    sort: false,
  },
  {
    label: "type d'accès",
    sort: false,
  },
  {
    label: "dispositif d'accès",
    sort: false,
  },
  {
    label: "account managers",
    sort: false,
  },
  {
    label: "montant",
    key: "amount",
    sort: true,
  },
]
