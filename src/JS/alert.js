class Alert {
    constructor(options) {
        this.showTime = options.showTime || 3;
        this.text = "";
    }

    setText(text) {
        this.text = text;
    }

    showError(text) {
        this.setText(text || this.text);
        const alert = this.createAlert();
        alert.innerHTML = this.text;

        this.showAlert(alert);

        setTimeout(() => {
            this.hideAlert(alert);
        }, this.showTime * 1000);

        setTimeout(() => {
            this.removeAlert(alert);
        }, this.showTime * 1000 + 1000);
    }

    showSuccess(text) {
        this.setText(text || this.text);
        const alert = this.createAlert();
        alert.innerHTML = this.text;
        alert.style.background = "green";

        this.showAlert(alert);

        setTimeout(() => {
            this.hideAlert(alert);
        }, this.showTime * 1000);

        setTimeout(() => {
            this.removeAlert(alert);
        }, this.showTime * 1000 + 1000);
    }

    createAlert() {
        const alert = document.createElement("div");
        document.body.appendChild(alert);
        alert.classList.add("alert");
        return alert;
    }

    showAlert(alert) {
        setTimeout(() => {
            alert.classList.add("show");
        }, 0);
    }

    hideAlert(alert) {
        alert.classList.remove("show");
    }

    removeAlert(alert) {
        document.body.removeChild(alert);
    }
}

export default Alert;
