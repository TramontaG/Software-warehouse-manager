import Alert from '../../src/JS/alert';
import DB from '../../src/JS/DB';
const alert = new Alert({ showTime: 3 });

class ClientsCreator {
	constructor() {
		clientsForm.addEventListener('submit', (e) => {
			e.preventDefault();
			this.onSubmit();
		});
		this.nameInput = nameInput;
		this.emailInput = emailInput;
		this.phoneInput = phoneInput;
	}

	onSubmit() {
		const credentials = this.getFormData();
		if (!credentials.email || !credentials.name || !credentials.phone) return alert.showError('Preencha todos os campos');

		DB.insertNew('client', credentials);
		alert.showSuccess('Cliente cadastrado com sucesso!');
		this.clearForm();
	}

	getFormData() {
		return {
			name: this.nameInput.value,
			email: this.emailInput.value,
			phone: this.phoneInput.value,
			id: new Date().getTime(),
		};
	}

	clearForm() {
		this.nameInput.value = '';
		this.emailInput.value = '';
		this.phoneInput.value = '';
	}
}

export default new ClientsCreator();
