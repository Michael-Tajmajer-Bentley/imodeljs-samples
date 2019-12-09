/// <reference types="node" />
import { QueryAgent } from "./QueryAgent";
import * as express from "express";
import * as http from "http";
/** Container class for web server and the iModelJS backend run in the QueryAgent */
export declare class QueryAgentWebServer {
    private _server;
    private _agent;
    constructor(webServer?: express.Express, agent?: QueryAgent);
    private _handlePortError;
    getServer(): http.Server;
    run(listenTime?: number): Promise<boolean>;
    close(): void;
}
//# sourceMappingURL=QueryAgentWebServer.d.ts.map