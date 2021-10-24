class DB {
    constructor() {}

    getJson(model) {
        const models = {
            user: true,
            os: true,
            client: true,
        };
        if (models[model]) {
            return (
                JSON.parse(localStorage.getItem(model)) || {
                    entities: [],
                }
            );
        } else {
            return null;
        }
    }

    updateDb(model, json) {
        return localStorage.setItem(model, JSON.stringify(json));
    }

    insertNew(model, entity) {
        const json = this.getJson(model);
        if (!json) throw "Modelo inválido";
        json.entities.push(entity);
        this.updateDb(model, json);
    }

    getEntities(model, validationFn) {
        const json = this.getJson(model);
        if (!json) throw "Modelo inválido";
        return json.entities.filter(validationFn);
    }

    updateEntity(model, id, updatedVersion) {
        const entity = this.getEntities(model, (entity) => entity.id === id)[0];
        if (!entity) throw "No entity with the prodived ID was found";

        const allEntities = this.getEntities(model, () => true);

        const updatedJson = {
            entities: allEntities.map((e) => {
                return e.id === entity.id ? updatedVersion : e;
            }),
        };

        this.updateDb(model, updatedJson);
    }

    deleteEntities(model, validationFn) {
        const affectedEntities = this.getEntities(model, validationFn);

        const json = (this.getJson(model).entities = this.getJson(
            model
        ).entities.fiter((entity) => {
            for (affectedEntity in affectedEntities) {
                if (this.compareObjects(entity, affectedEntity)) return false;
            }
            return true;
        }));

        this.updateDb(model, json);
    }

    compareObjects(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
}

export default new DB();
