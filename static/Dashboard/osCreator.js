import Alert from "../../src/JS/alert";
import DB from "../../src/JS/DB";
const alert = new Alert({ showTime: 3 });

class OsCreator {
    constructor() {
        osForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.onSubmit();
        });

        this.allClients = this.getAllClients();
        this.validClient = false;
        this.client = "";

        clientInput.addEventListener("input", (e) => {
            const query = clientInput.value.toLowerCase();
            const clients = DB.getEntities("client", (client) =>
                client.name.toLowerCase().startsWith(query)
            );
            this.updateClientsAutocomplete(clients);
            this.styleClientsSearchBar(query);
        });

        priceInput.value = priceInput.addEventListener("input", (e) => {
            const amountString = priceInput.value
                .split("")
                .filter((char) => char.match(/[\d]/))
                .join("");

            //bring it to cents
            const amount = (Number(amountString) / 100).toFixed(2);

            this.amount = amount;

            //padding with 0
            priceInput.value = `R$ ${
                amount + (amount === 0 ? ".00" : "")
            }`.replace(".", ",");
        });
        priceInput.value = "R$ 0,00";
    }

    onNavigate() {
        console.log(this);
    }

    getAllClients() {
        return DB.getEntities("client", (n) => n);
    }

    updateClientsAutocomplete(clients) {
        document.getElementById("clientList").innerHTML = "";
        clients.forEach((client) => {
            const clientOption = document.createElement("option");
            clientOption.value = client.name;
            document.getElementById("clientList").appendChild(clientOption);
        });
    }

    styleClientsSearchBar(query) {
        this.validClient = false;
        if (clientInput.value === "")
            return (clientInput.style.boxShadow = "1px 1px 2px 1px #000");

        const foundClient = this.getAllClients().filter(
            (client) => client.name.toLowerCase() === query
        );

        if (foundClient.length > 0) {
            clientInput.style.boxShadow = "2px 2px 4px 2px green";
            this.validClient = true;
            return (this.client = foundClient[0].name);
        }

        clientInput.style.boxShadow = "2px 2px 3px 1px red";
    }

    onSubmit() {
        const credentials = this.getFormData();
        console.log(credentials);
        if (
            !credentials.client ||
            !credentials.osType ||
            !credentials.description ||
            !credentials.price
        )
            return alert.showError("Preencha todos os campos");

        if (!this.validClient)
            return alert.showError(
                "Cliente inválido. Cadastre um novo cliente se necessário"
            );

        DB.insertNew("os", {
            ...credentials,
            comments: [],
        });
        alert.showSuccess("OS cadastrada com sucesso!");
        this.clearForm();
    }

    getFormData() {
        return {
            client: clientInput.value,
            osType: osTypeInput.value,
            description: descriptionInput.value,
            price: priceInput.value,
            creationDate: new Date().toLocaleString("pt-BR"),
            submitionDate: null,
            id: new Date().getTime(),
        };
    }

    clearForm() {
        clientInput.value = "";
        osTypeInput.value = "";
        descriptionInput.value = "";
        priceInput.value = "R$ 0,00";
    }
}

export default new OsCreator();
