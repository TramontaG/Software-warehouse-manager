import Alert from '../../src/JS/alert';
import DB from '../../src/JS/DB';
const alert = new Alert({ showTime: 3 });

class ClientsCreator {
	constructor() {
		this.clients = DB.getEntities('client', () => true);
		this.searchInput = document.getElementById('clientSearchInput');
		this.searchInput.addEventListener('input', () => {
			this.filterClients(this.searchInput.value);
		});

		document.getElementById('submitClientChanges').addEventListener('click', () => {
			this.updateClient();
		});

		document.getElementById('deleteCliente').addEventListener('click', () => {
			this.deleteClient();
		});

		this.activeClient = undefined;
	}

	onNavigate() {
		this.filterClients(this.searchInput.value);
	}

	filterClients(query) {
		this.clients = DB.getEntities('client', (client) => client.name.toUpperCase().startsWith(query.toUpperCase()));
		this.updateHtml();
	}

	updateHtml() {
		const clientsContainer = document.getElementById('clientsContainer');
		clientsContainer.innerHTML = '';

		this.clients.forEach((client) => {
			const singleClientContainer = document.createElement('div');
			singleClientContainer.innerHTML = this.createClientHTML(client);
			clientsContainer.appendChild(singleClientContainer);
			singleClientContainer.addEventListener('click', () => {
				this.setActiveClient(client);
			});

			if (!this.activeClient?.id) return;

			if (client.id === this.activeClient.id) {
				document.getElementById(client.id).classList.add('activeClient');
			} else {
				document.getElementById(client.id).classList.remove('activeClient');
			}
		});
	}

	setActiveClient(client) {
		this.activeClient = client;
		clientName.value = client.name;
		clientEmail.value = client.email;
		clientPhone.value = client.phone;
		this.updateHtml();
	}

	getCredentials() {
		return {
			name: clientName.value,
			email: clientEmail.value,
			phone: clientPhone.value,
		};
	}

	updateClient() {
		if (!this.activeClient) return alert.showError('Nenhum cliente selecionado!');
		const credentials = this.getCredentials();
		DB.updateEntity('client', this.activeClient.id, { ...this.activeClient, ...credentials });
		alert.showSuccess('Informações atualizadas com sucesso!');
		this.onNavigate();
	}

	deleteClient() {
		if (!this.activeClient) return alert.showError('Nenhum cliente selecionado!');
		DB.deleteEntities('client', (client) => client.id === this.activeClient.id);
		alert.showSuccess('Cliente deletado com sucesso');
		this.onNavigate();
	}

	createClientHTML(client) {
		return `
        <div class="clientContainer" id="${client.id}">
            <p class="clientData">${client.name}</p> 
            <p class="clientData clientEmail">${client.email}</p>
            <p class="clientData clientPhone">${client.phone}</p>
        </div>
        `;
	}
}

export default new ClientsCreator();
