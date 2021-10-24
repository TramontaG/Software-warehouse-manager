import DB from "./../../src/JS/DB";
import Alert from "./../../src/JS/alert";
loginForm.addEventListener("submit", (e) => e.preventDefault());

const alert = new Alert({ showTime: 3 });

const authUser = (credentials) =>
    DB.getEntities("user", (user) => {
        return (
            user.username === credentials.username &&
            user.password === credentials.password
        );
    })[0];

const goToAdmPage = () => {
    console.log("GOING TO ADM PAGE");
    window.location.href = "../Dashboard/index.html";
};

loginButton.addEventListener("click", (e) => {
    try {
        const credentials = {
            username: Username.value,
            password: Password.value,
        };

        const authenticatedUser = authUser(credentials);

        if (!authenticatedUser)
            return alert.showError("Usuário / senha inválidos");

        goToAdmPage();
    } catch (e) {
        alert.showError(e);
    }
});
