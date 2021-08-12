const keyCombo = (pattern) => {
    const {masks, key, keyCode} = parsePattern(pattern);
    // console.log({masks, key, keyCode})
    const mask = masks.reduce((r, m) => ({...r, [m]: true}), {
        shift: false,
        alt:   false,
        meta:  false,
        ctrl:  false,
    });

    return (e) => {
        // console.log(e.key);
        if (Object.keys(mask).find((attr) => e[attr+"Key"] != mask[attr])) {
            return false;
        }
        return keyCode != null ? keyCode === e.keyCode : key === e.key.toLowerCase();
    }
};

exports.keyCombo = keyCombo;

const parsePattern = (pattern) => {
    pattern = pattern.toLowerCase();
    const match = /(\^|ctrl\+|shift\+|alt\+|meta\+)(.+)/i.exec(pattern);
    if (match) {
        const next = parsePattern(match[2]);
        return {
            masks: [masks[match[1]], ...next.masks],
            key: next.key,
            keyCode: next.keyCode,
        };
    } else {
        return {masks: [], key: pattern === "space" ? " " : pattern.toLowerCase(), keyCode: keyCodes(pattern.toLowerCase())};
    }
};

const keyCodes = (keyPtn) => {
    if (!isNaN(keyPtn)) {
        return 48 + +keyPtn;
    }
};

const masks = {
    "^": "ctrl",
    "ctrl+": "ctrl",
    "shift+": "shift",
    "alt+": "alt",
    "meta+": "meta",
};

