import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ButtonPageVue from "../pages/ButtonPage.vue";
import CellPageVue from "../pages/CellPage.vue";
import CheckboxPageVue from "../pages/CheckboxPage.vue";
import DropdownPageVue from "../pages/DropdownPage.vue";
import InputPageVue from "../pages/InputPage.vue";
import InputPhonePageVue from "../pages/InputPhonePage.vue";
import InputSearchPageVue from "../pages/InputSearchPage.vue";
import PaginationPageVue from "../pages/PaginationPage.vue";
import SelectPageVue from "../pages/SelectPage.vue";
import TablePageVue from "../pages/TablePage.vue";
import TogglePageVue from "../pages/TogglePage.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/button", name: "Button", component: ButtonPageVue },
  { path: "/dropdown", name: "Dropdown", component: DropdownPageVue },
  { path: "/input", name: "Input", component: InputPageVue },
  { path: "/inputSearch", name: "Input Search", component: InputSearchPageVue },
  { path: "/pagination", name: "Pagination", component: PaginationPageVue },
  { path: "/select", name: "Select", component: SelectPageVue },
  { path: "/input-phone", name: "Input Phone", component: InputPhonePageVue },
  { path: "/checkbox", name: "Checkbox", component: CheckboxPageVue },
  { path: "/toggle", name: "Toggle", component: TogglePageVue },
  { path: "/table", name: "Table", component: TablePageVue },
  { path: "/table/cell", name: "Cell", component: CellPageVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
