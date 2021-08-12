
setImmediate(async () => {
    const {wbBuildWeb} = require("../../../tools/web-builder/web-builder");

    const {paths} = require("./paths");

    await wbBuildWeb({
        paths,
    });

    // await deploy
});