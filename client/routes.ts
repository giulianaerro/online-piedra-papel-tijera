import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "initiation-page" },
  { path: "/roomid", component: "initiationid-page" },
  { path: "/roomuser", component: "initiationname-page" },
  { path: "/sharecode", component: "sharecode-page" },
  { path: "/instruction", component: "instruction-page" },
]);
