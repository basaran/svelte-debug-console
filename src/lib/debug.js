/*------------------------------------------------------------- patch --*/

import { default as createDebug } from "debug";
import { writable } from "svelte/store";

export const debugStore = createDebugStore();
/*svelte store to hold mirrored debugs*/

export const storePatch = {
    enable: () => {
        createDebug.log = (s, ...args) => {
            const line = consoleToHtml(s, args);
            debugStore.add(line);
            console.debug(s, ...args);
        };
        createDebug.extend = function (namespace, delimiter) {
            const name =
                this.namespace +
                (typeof delimiter === "undefined" ? ":" : delimiter) +
                namespace;

            const newDebug = createDebug(name);
            newDebug.log = createDebug.log;
            return newDebug;
        };
    },

    disable: () => {
        debugStore.set();
        createDebug.log = console.debug || console.log || (() => {});
    },
}; /*
    │when enabled, we inject our svelte store into debugs
    │logger function. this allows us to mirror debug
    │statements without duplicating code. dbg.extend is also
    │modified here to use our custom logging function.
    */

/*----------------------------------------------------------- helpers --*/

const consoleToHtml = (s, args) => {
    const color = getColor(args);
    const statement = stripDebugColors(s);
    const line = appendTime(statement);
    const html = wrapColor(color, line);
    return html;
}; /*
    │converts debug generated console.log line to html
    │friendly colored span tag.
    */

const getColor = (args) => {
    const regex = /(?:color: (#[0-9a-zA-Z]+))/;
    const matches = regex.exec(args.join(" "));
    const color = matches.length > 1 ? matches[1] : "FFFFFF";
    return color;
};

const stripDebugColors = (str) => {
    return str.replace(/%c/gim, "");
};

const wrapColor = (color, str) => {
    return `<span style="color: ${color}">${str}</span>`;
};

export const appendTime = (str) => {
    return str.replace(/^/, new Date().toLocaleString().replace(",", "") + " | ");
};

/*-------------------------------------------------------- debugStore --*/

export function createDebugStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        add: (v) => {
            return update((n) => [...n, v]);
        },
        set: (v) => set([v]),
    };
}
