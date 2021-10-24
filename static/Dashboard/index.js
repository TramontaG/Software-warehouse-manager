import navigator, { setupNavigation } from "./navigator";
import OsCreator from "./osCreator";
import OsSearcher from "./osSearcher";
import RejectedOrders from "./rejectedOrders";
import ClientsCreator from "./clientsCreator";

console.log(RejectedOrders.onNavigate);

navigator.registerCallBack(
    "consultarOs",
    OsSearcher.onNavigate.bind(OsSearcher)
);

navigator.registerCallBack(
    "rejectedOrders",
    RejectedOrders.onNavigate.bind(RejectedOrders)
);
setupNavigation();
