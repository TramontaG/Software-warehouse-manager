class Navigator {
	constructor() {
		this.routes = [];
		this.callbacks = {};
	}

	registerRoute(route) {
		this.routes.push(route);
	}

	registerRoutes(routes) {
		routes.forEach((route) => this.registerRoute(route));
	}

	registerCallBack(route, callback) {
		this.callbacks = {
			...this.callbacks,
			[route]: callback,
		};
	}

	navigate(destiny) {
		this.routes.forEach((route) => {
			if (route === destiny) {
				document.getElementById(route).style.display = 'block';
				if (this.callbacks[destiny]) this.callbacks[destiny]();
			} else {
				document.getElementById(route).style.display = 'none';
			}
		});
	}
}

const navigator = new Navigator();

export const setupNavigation = () => {
	navigator.registerRoutes(['consultarOs', 'criarOs', 'cadastrarCliente', 'rejectedOrders', 'maintainClients']);

	consultaOs.addEventListener('click', () => {
		navigator.navigate('consultarOs');
	});

	criaOs.addEventListener('click', () => {
		navigator.navigate('criarOs');
	});

	cadastraCliente.addEventListener('click', () => {
		navigator.navigate('cadastrarCliente');
	});

	ordensRejeitadas.addEventListener('click', () => {
		navigator.navigate('rejectedOrders');
	});

	gerenciarClientes.addEventListener('click', () => {
		navigator.navigate('maintainClients');
	});

	navigator.navigate('maintainClients');
};

export default navigator;
