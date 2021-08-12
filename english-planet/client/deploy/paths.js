const Path = require("path");

const appDir = Path.resolve(__dirname, "..");

const paths = {
    appPath: appDir,
    appPackageJson: Path.resolve(appDir, "package.json"),
    appIndexJs: Path.resolve(appDir, "src/index.jsx"),
    appPublic: Path.resolve(appDir, "public"),
    appSrc: Path.resolve(appDir, "src"),
    appHtml: Path.resolve(appDir, "public/index.html"),
    appBuild: Path.resolve(appDir, "deploy/dist"),
    appNodeModules: Path.resolve(appDir, "node_modules"),
    publicUrl: undefined,
    // servedPath: "/client",
};
exports.paths = paths;
