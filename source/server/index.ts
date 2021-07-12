import { buildApp } from "./app";

buildApp()
    .then(app => new Promise<void>(resolve => {
        app.listen(8080, () => {
            resolve();
        });
    }))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
