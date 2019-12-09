import { IModelDb } from "@bentley/imodeljs-backend";
import { AccessToken } from "@bentley/imodeljs-clients";
export declare class ChangeSummaryExtractor {
    extractChangeSummary(accessToken: AccessToken, iModelDb: IModelDb, changeSetId: string): Promise<{
        id: string;
        changeSet: {
            wsgId: string;
            parentWsgId: string;
            description: string;
            pushDate: string;
            userCreated: string;
        };
        instanceChanges: {};
    } | undefined>;
}
//# sourceMappingURL=ChangeSummaryExtractor.d.ts.map