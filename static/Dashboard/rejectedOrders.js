import DB from "../../src/JS/DB";

class RejectedOrders {
    constructor() {
        this.closedOs = [];
    }

    onNavigate() {
        this.rejectedOs = DB.getEntities("os", (os) => os.status == "rejected");
        rejectedOsHolder.innerHTML = "";

        this.rejectedOs.forEach((os) => {
            const osComponent = this.createFinishedOs(os);
            const osWrapper = document.createElement("div");
            osWrapper.innerHTML = osComponent;
            rejectedOsHolder.appendChild(osWrapper);
        });
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

    getCommentComponent(comment) {
        return `
            <div class="commentHolder">
                <p class="commentText">${
                    new Date(comment.date).toLocaleString("pt-BR").split(" ")[0]
                } - ${comment.comment}</p>
            </div>
        `;
    }
}

export default new RejectedOrders();
