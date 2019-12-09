/// <reference types="node" />
import { BriefcaseProvider } from "../BriefcaseProvider";
import { QueryAgentWebServer } from "../QueryAgentWebServer";
import { ChangeSummaryExtractor } from "../ChangeSummaryExtractor";
import { AccessToken, IModelHubClient, EventSubscription, EventHandler, EventSubscriptionHandler, ConnectClient, IModelsHandler } from "@bentley/imodeljs-clients";
import { IModelDb } from "@bentley/imodeljs-backend";
import * as express from "express";
import { OidcAgentClient } from "@bentley/imodeljs-clients-backend";
/** Static test mock objects */
export declare class TestMockObjects {
    static setupMockAppConfig(): void;
    static clearMockAppConfig(): void;
    static readonly fakeAccessToken: string;
    static getMockChangeSummaryExtractor(): ChangeSummaryExtractor;
    static getMockExpressWebServer(): express.Express;
    static getMockConnectClient(): ConnectClient;
    static getMockProcess(): NodeJS.Process;
    static getMockQueryAgentWebServer(runThrowsError?: boolean, runResult?: boolean): QueryAgentWebServer;
    static getMockOidcAgentClient(throwsError?: boolean): OidcAgentClient;
    static getMockIModelDb(): IModelDb;
    static getMockBriefcaseProvider(throwsError?: boolean): BriefcaseProvider;
    static getMockHubClient(): IModelHubClient;
    static getMockIModelsHandler(): IModelsHandler;
    static getMockEventHandler(): EventHandler;
    static getMockEventSubscriptionHandler(): EventSubscriptionHandler;
    static getMockEventSubscription(): EventSubscription;
    static getFakeAccessToken(): AccessToken;
    static getFakeIModelId(): string;
    static getFakeProjectId(): string;
}
//# sourceMappingURL=TestMockObjects.d.ts.map