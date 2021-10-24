import Alert from "./../../src/JS/alert";
import DB from "./../../src/JS/DB";

const alert = new Alert({ showTime: 3 });

const register = (e) => {
    e.preventDefault();

    if (
        Username.value === "" ||
        Password.value === "" ||
        RePassword.value === ""
    )
        return alert.showError("Preencha todos os campos!");

    if (RePassword.value !== Password.value)
        return alert.showError("As senhas não conferem");

    const credentials = {
        username: Username.value,
        password: Password.value,
    };

    DB.insertNew("user", credentials);
    alert.showSuccess("Usuário criado com sucesso!");
    setTimeout(() => {
        window.location.href = "/Login/index.html";
    }, 1500);
};

registerButton.addEventListener("click", register);
