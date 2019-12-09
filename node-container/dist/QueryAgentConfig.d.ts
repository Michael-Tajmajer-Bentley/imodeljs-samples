import { OidcAgentClientConfiguration } from "@bentley/imodeljs-clients-backend";
/**
 * Configuration for Query Agent: uses provided command if necessary first, second it will attempt to look
 * for the npm config generated environment variable, third it will use hard coded values.
 */
export declare class QueryAgentConfig {
    static setupConfig(): void;
    static get iModelName(): string;
    static get projectName(): string;
    static get oidcAgentClientConfiguration(): OidcAgentClientConfiguration;
    static get outputDir(): string;
    static get changeSummaryDir(): string;
    static get port(): number;
    static get listenTime(): number;
    static get loggingCategory(): string;
}
//# sourceMappingURL=QueryAgentConfig.d.ts.map