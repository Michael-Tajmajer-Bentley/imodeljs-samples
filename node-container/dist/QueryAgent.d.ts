import { BriefcaseProvider } from "./BriefcaseProvider";
import { ChangeSummaryExtractor } from "./ChangeSummaryExtractor";
import { ConnectClient, IModelHubClient } from "@bentley/imodeljs-clients";
import { OidcAgentClient } from "@bentley/imodeljs-clients-backend";
/** Agent for querying changesets. Contains backend iModelJs engine. */
export declare class QueryAgent {
    private _hubClient;
    private _connectClient;
    private _briefcaseProvider;
    private _changeSummaryExtractor;
    private _oidcClient?;
    private _accessToken?;
    private _projectId?;
    private _iModelId?;
    private _iModelDb?;
    private _isInitialized;
    constructor(_hubClient?: IModelHubClient, _connectClient?: ConnectClient, _briefcaseProvider?: BriefcaseProvider, _changeSummaryExtractor?: ChangeSummaryExtractor, _oidcClient?: OidcAgentClient | undefined);
    private _login;
    /** Create listeners and respond to changesets */
    listenForAndHandleChangesets(listenFor: number): Promise<void>;
    /** Asynchronous initialization */
    private _initialize;
    /** Extract a summary of information in the change set - who changed it, when it was changed, what was changed, how it was changed, and write it to a JSON file */
    private _extractChangeSummary;
    /** Clean up the test output directory to prepare for fresh output */
    private _initializeOutputDirectory;
    /** Write the change summary contents as JSON to disk */
    private _writeChangeSummaryToDisk;
    /** Utility to delete a directory that contains files */
    private _deleteDirectory;
}
//# sourceMappingURL=QueryAgent.d.ts.map