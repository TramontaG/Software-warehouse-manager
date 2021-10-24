import Alert from "../../src/JS/alert";
import DB from "../../src/JS/DB";
import Prompt from "../../src/JS/Prompt";

const alert = new Alert({ showTime: 3 });

class OsSearcher {
    constructor() {
        this.allOS = [];
        this.openOs = [];
        this.closedOs = [];
    }

    createOsComponent(os) {
        return `
        <div class="osContainer">
            <p class="osData osType">${os.osType} - ${os.price}</p>   
            <p class="osData osClient">${os.client}</p> 
            <p class="osData osDescription">${os.description}</p>
            
            <section class="commentsContainer">
                ${
                    os.comments.reduce(
                        (acc, comment) =>
                            (acc += this.getCommentComponent(comment)),
                        ""
                    ) || "Nenhum comentário ainda"
                }
            </section>

            <div class="osButtonsContainer">
                <button id="${
                    os.id
                }comment" class="osButton commentButton">Inserir comentário</button>
                <button id="${
                    os.id
                }baixa" class="osButton finishButton">Dar baixa</button>
            </div>

        </div>
        `;
    }

    createFinishedOs(os) {
        return `
        <div class="osContainer">
            <p class="osData osType">${os.osType} - ${os.price}</p>   
            <p class="osData osClient">${os.client}</p> 
            <p class="osData osDescription">${os.description}</p>
            
            <section class="commentsContainer">
                ${
                    os.comments.reduce(
                        (acc, comment) =>
                            (acc += this.getCommentComponent(comment)),
                        ""
                    ) || "Nenhum comentário ainda"
                }
            </section>
        </div>
        `;
    }

    onNavigate() {
        this.openOs = DB.getEntities("os", (os) => !os.submitionDate);
        this.closedOs = DB.getEntities("os", (os) => os.submitionDate);

        osHolder.innerHTML = "";
        closedOsHolder.innerHTML = "";

        this.openOs.forEach((os) => {
            const osComponent = this.createOsComponent(os);
            const osWrapper = document.createElement("div");
            osWrapper.innerHTML = osComponent;
            osHolder.appendChild(osWrapper);

            document
                .getElementById(`${os.id}comment`)
                .addEventListener("click", () => {
                    this.activeOs = os;
                    this.showCommentPrompt();
                });

            document
                .getElementById(`${os.id}baixa`)
                .addEventListener("click", () => {
                    this.activeOs = os;
                    this.showFinishPrompt();
                });
        });

        this.closedOs.forEach((os) => {
            const osComponent = this.createFinishedOs(os);
            const osWrapper = document.createElement("div");
            osWrapper.innerHTML = osComponent;
            closedOsHolder.appendChild(osWrapper);
        });
    }

    getCommentComponent(comment) {
        return `
            <div class="commentHolder">
                <p class="commentText">${
                    new Date(comment.date).toLocaleString("pt-BR").split(" ")[0]
                } - ${comment.comment}</p>
            </div>
        `;
    }

    showFinishPrompt() {
        const finishPrompt = new Prompt({
            title: "Dar baixa em OS",
            description:
                "Deseja dar baixa nesta OS? Esse processo NÃO é reversível!",
            buttons: [
                {
                    name: "Não!",
                    color: "red",
                    onPress: () => finishPrompt.remove(),
                },
                {
                    name: "Sim",
                    color: "green",
                    onPress: () => {
                        this.finishOs(this.activeOs);
                        finishPrompt.remove();
                    },
                },
            ],
        }).show();
    }

    showCommentPrompt() {
        const commentPrompt = new Prompt({
            title: "Inserir comentário",
            description:
                "Insira algum comentário para ser adicionado à ordem de serviço!",
            children: `<textarea class="textInput textArea commentInput"  id="commentInput"></textarea>`,
            buttons: [
                {
                    name: "Cancelar",
                    color: "red",
                    onPress: () => commentPrompt.remove(),
                },
                {
                    name: "Salvar",
                    color: "green",
                    onPress: () => {
                        commentPrompt.remove();
                        this.addComment();
                    },
                },
            ],
        }).show();
    }

    addComment() {
        const comment = document.getElementById("commentInput").value;
        const newComent = {
            comment,
            date: new Date(),
        };
        this.activeOs.comments.push(newComent);
        DB.updateEntity("os", this.activeOs.id, this.activeOs);
        alert.showSuccess("Comentário adicionado com sucesso!");
        this.onNavigate();
    }

    finishOs(os) {
        console.log(os);
        DB.updateEntity("os", os.id, {
            ...os,
            status: "done",
            submitionDate: new Date(),
        });
        this.onNavigate();
    }
}

export default new OsSearcher();
