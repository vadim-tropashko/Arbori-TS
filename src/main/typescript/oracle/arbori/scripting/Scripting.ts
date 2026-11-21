import { GlobalMap } from "./GlobalMap";

/** Shared native JavaScript values used by Arbori programs and test callbacks. */
export class Scripting {
    protected globals: GlobalMap;

    constructor(globals?: GlobalMap) {
        this.globals = globals ?? new GlobalMap();
    }

    public getGlobals(): GlobalMap {
        return this.globals;
    }
}
