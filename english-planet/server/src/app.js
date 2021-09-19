const express = require("express");
const Path = require("path");
const cors = require("cors");
const routes = require("./routes/auth-routes");
const guestRoutes = require("./routes/guest-routes");
const {authenticateJWT} = require("./middleware/auth-middleware");

const serverApp = ({port}) => {
    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: 'http://localhost:3000'
    }));

    app.use(express.static(Path.resolve(__dirname + "/../../client/deploy/dist")));

    app.use('/api', guestRoutes);

    app.use(authenticateJWT);

    app.use('/api', routes);

    app.use(require('./middleware/error-middleware').all);

    return app;
};
exports.serverApp = serverApp;
