const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const serverApp = ({port}) => {
    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: 'http://localhost:3000'
    }));


    app.use('/api', routes);

    app.use(require('./middleware/error-middleware').all);

    return app;
};
exports.serverApp = serverApp;
