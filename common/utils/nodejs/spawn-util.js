const {spawn} = require('child_process');

function cmd(cmd, options = {}) {
    options.stdio = options.stdio || "inherit";

    let split = cmd.split(" ");

    return spawn1(split[0], split.slice(1), options);
}
exports.cmd = cmd;

const cmd1 = async (command, options = {}) => {
    return (await cmd2(command, options)).out;
};
exports.cmd1 = cmd1;

const cmd2 = async (command, options = {}) => {
    const p = cmd(command, {...options, stdio: "pipe"});
    return await getOutput(p);
};
exports.cmd2 = cmd2;

const getOutput = async (p) => {
    let out = "";
    let err = "";
    p.stdout.on("data", (data) => {
        out += data.toString();
    });
    p.stderr.on("data", (data) => {
        err += data.toString();
    });

    await waitProcess(p);
    return {out, err};
};
exports.getOutput = getOutput;


function spawn1(cmd, args, options = {}) {
    if (!/^win/.test(process.platform)) { // linux
        return spawn(cmd, args, options);
    } else {
        return spawn('cmd', ['/s', "/c", cmd, ...args], options);
    }
}
exports.spawn1 = spawn1;

const waitProcess = (p) => {
    return new Promise((resolve, reject) => {
        p.on('exit', resolve);
        p.on('error', (e) => {
            console.log("Error: " + e);
        });
    });

};
exports.waitProcess = waitProcess;