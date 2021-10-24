class Prompt {
    constructor(options) {
        this.title = options.title;
        this.description = options.description;
        this.children = options?.children?.toString();
        this.buttons = options.buttons || [];
        this.promptId = new Date().getTime();

        this.promptReference;
    }

    show() {
        const prompt = this.makePrompt();
        document.body.appendChild(prompt);
        this.addEvents();
        setTimeout(() => {
            this.toggleVisible();
        }, 0);
        return this;
    }

    remove() {
        this.toggleVisible();
        setTimeout(() => {
            document.body.removeChild(this.promptReference);
        }, 300);
    }

    toggleVisible() {
        this.promptReference.classList.toggle("bodyActive");
        document
            .getElementById(`prompt${this.id}`)
            .classList.toggle("visiblePrompt");
    }

    makePrompt() {
        const prompt = document.createElement("div");
        prompt.classList.add("bodyWrapper");

        prompt.id = this.promptId;

        //create plainHTML;
        prompt.innerHTML = `        
            <div class="promptContainer" id="prompt${this.id}">
                <h1 class="promptTitle">${this.title}</h1>
                <p class="promptDesctiption">${this.description}</p>

                <div class="childrenContainer">
                    ${this.children || ""}
                </div>

                <div class="buttonsContainer">

                    ${this.buttons.reduce((acc, button, index) => {
                        return (acc += `
                            <button class="promptButton" style="background: ${button.color}" id="op${index}">${button.name}</button>
                        `);
                    }, "")}

                </div>
            </div>`;

        this.promptReference = prompt;

        return prompt;
    }

    addEvents() {
        this.buttons.forEach((button, index) => {
            document
                .getElementById(`op${index}`)
                .addEventListener("click", button.onPress);
        });
    }
}

export default Prompt;
