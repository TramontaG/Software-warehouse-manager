import navigator, { setupNavigation } from "./navigator";
import Clients from "./clientsCreator";
import OsCreator from "./osCreator";
import OsSearcher from "./osSearcher";

navigator.registerCallBack("criarOs", OsCreator.onNavigate.bind(OsCreator));
navigator.registerCallBack(
    "consultarOs",
    OsSearcher.onNavigate.bind(OsSearcher)
);

setupNavigation();

OsSearcher.onNavigate();
