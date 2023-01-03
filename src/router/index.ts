// import HelloWorldVue from "@/components/hello-world.vue";
import Blender from "@/components/pages/blender/index.vue";
import Calendar from "@/components/pages/calendar/index.vue";

// Event
import Event from "@/components/pages/event/index.vue";
import EventFocus from "@/components/pages/event/focus/index.vue";

import Housing from "@/components/pages/housing/index.vue";
import Login from "@/components/pages/login/login.vue";
import Price from "@/components/pages/price/index.vue";
import Reservation from "@/components/pages/reservation/_id.vue";
import Maintenance from "@/components/pages/maintenance/_id.vue";
import TestRouter from "@/components/test-router/test-router.vue";
import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized } from "vue-router";

// flows
import { EventFlow } from "@/core/flows/EventFlow";
import { EventFocusFlow } from "@/core/flows/EventFocusFlow";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Event",
    component: Event,
    beforeEnter: (_, __) => {
      EventFlow()
    }
  },
  {
    path: "/event/:id",
    name: "EventFocus",
    component: EventFocus,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const id: string | string[] = to.params.id;
      console.log("to.params.id", to.params.id)
      EventFocusFlow(id)
    }
  },
  { path: "/blender", name: "Blender", component: Blender },
  { path: "/login", name: "Login", component: Login},
  { path: "/housing", name: "Housing", component: Housing },
  { path: "/calendar", name: "Calendar", component: Calendar },
  { path: "/price", name: "Price", component: Price },
  { path: "/reservation/:id", name: "Reservation", component: Reservation },
  { path: "/maintenance/:id", name: "Maintenance", component: Maintenance },
  { path: "/test-router", name: "TestRouter", component: TestRouter },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;


