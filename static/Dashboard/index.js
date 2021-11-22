import navigator, { setupNavigation } from './navigator';
import OsCreator from './osCreator';
import OsSearcher from './osSearcher';
import RejectedOrders from './rejectedOrders';
import ClientsCreator from './clientsCreator';
import ClientsManager from './clientManager';

navigator.registerCallBack('consultarOs', OsSearcher.onNavigate.bind(OsSearcher));
navigator.registerCallBack('rejectedOrders', RejectedOrders.onNavigate.bind(RejectedOrders));
navigator.registerCallBack('maintainClients', ClientsManager.onNavigate.bind(ClientsManager));

setupNavigation();
