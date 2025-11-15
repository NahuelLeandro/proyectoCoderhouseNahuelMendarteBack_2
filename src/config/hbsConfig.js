import exphbs from "express-handlebars";
import path from "path";

export default function setupHandlebars(app, paths) {
    app.engine(".hbs", exphbs.engine({
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(paths.views, "layouts"),
        helpers: {
            eq: (a, b) => a === b
        }
    }));
    app.set("view engine", ".hbs");
    app.set("views", paths.views);
}