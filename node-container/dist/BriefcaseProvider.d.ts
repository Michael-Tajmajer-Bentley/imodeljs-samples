import { AccessToken } from "@bentley/imodeljs-clients";
import { IModelDb } from "@bentley/imodeljs-backend";
export declare class BriefcaseProvider {
    private _iModelDb?;
    getBriefcase(accessToken: AccessToken, projectId: string, iModelId: string, changeSetId: string): Promise<IModelDb>;
}
//# sourceMappingURL=BriefcaseProvider.d.ts.map