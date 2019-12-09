"use strict";
/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var QueryAgentConfig_1 = require("./QueryAgentConfig");
var bentleyjs_core_1 = require("@bentley/bentleyjs-core");
var imodeljs_common_1 = require("@bentley/imodeljs-common");
var imodeljs_backend_1 = require("@bentley/imodeljs-backend");
var imodeljs_clients_1 = require("@bentley/imodeljs-clients");
var ChangeSummaryExtractor = /** @class */ (function () {
    function ChangeSummaryExtractor() {
    }
    ChangeSummaryExtractor.prototype.extractChangeSummary = function (accessToken, iModelDb, changeSetId) {
        return __awaiter(this, void 0, void 0, function () {
            var authLogCtx, changeSummaryIds, changeSummary_1, changeContent, _a, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        authLogCtx = new imodeljs_clients_1.AuthorizedClientRequestContext(accessToken);
                        return [4 /*yield*/, imodeljs_backend_1.ChangeSummaryManager.extractChangeSummaries(authLogCtx, iModelDb, { currentVersionOnly: true })];
                    case 1:
                        changeSummaryIds = _b.sent();
                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Extracted summary information from change set \"" + changeSetId + "\"");
                        // Attach a change cache file to the iModel to enable querying the change summary
                        imodeljs_backend_1.ChangeSummaryManager.attachChangeCache(iModelDb);
                        // Find the change summary that was just created
                        bentleyjs_core_1.assert(changeSummaryIds.length === 1);
                        changeSummary_1 = imodeljs_backend_1.ChangeSummaryManager.queryChangeSummary(iModelDb, changeSummaryIds[0]);
                        changeContent = { id: changeSummary_1.id, changeSet: changeSummary_1.changeSet, instanceChanges: {} };
                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + "   Description: " + changeSummary_1.changeSet.description);
                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + "   Push Date: " + new Date(changeSummary_1.changeSet.pushDate).toLocaleString());
                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + "   Author: " + changeSummary_1.changeSet.userCreated);
                        // changeContent.instanceChanges = iModelDb!.withPreparedStatement<any[]>("SELECT ECInstanceId FROM ecchange.change.InstanceChange WHERE Summary.Id=? ORDER BY ECInstanceId", (stmt: ECSqlStatement): any[] => {
                        //     stmt.bindId(1, changeSummary.id);
                        //     const instanceChanges = new Array<any>();
                        //     while (stmt.step() === DbResult.BE_SQLITE_ROW) {
                        //         const row = stmt.getRow();
                        //         const instanceChange: any = ChangeSummaryManager.queryInstanceChange(iModelDb!, row.id);
                        //         switch (instanceChange.opCode) {
                        //             case ChangeOpCode.Insert: {
                        //                 // Get the instance after the insert
                        //                 const rows: any[] = iModelDb!.executeQuery(ChangeSummaryManager.buildPropertyValueChangesECSql(iModelDb!, instanceChange, ChangedValueState.AfterInsert));
                        //                 assert(rows.length === 1);
                        //                 instanceChange.after = rows[0];
                        //                 break;
                        //             }
                        //             case ChangeOpCode.Update: {
                        //                 // Get the instance before the update
                        //                 let rows: any[] = iModelDb!.executeQuery(ChangeSummaryManager.buildPropertyValueChangesECSql(iModelDb!, instanceChange, ChangedValueState.BeforeUpdate));
                        //                 assert(rows.length === 1);
                        //                 instanceChange.before = rows[0];
                        //                 // Get the instance after the update
                        //                 rows = iModelDb!.executeQuery(ChangeSummaryManager.buildPropertyValueChangesECSql(iModelDb!, instanceChange, ChangedValueState.AfterUpdate));
                        //                 assert(rows.length === 1);
                        //                 instanceChange.after = rows[0];
                        //                 break;
                        //             }
                        //             case ChangeOpCode.Delete: {
                        //                 // Get the instance before the delete
                        //                 const rows: any[] = iModelDb!.executeQuery(ChangeSummaryManager.buildPropertyValueChangesECSql(iModelDb!, instanceChange, ChangedValueState.BeforeDelete));
                        //                 assert(rows.length === 1);
                        //                 instanceChange.before = rows[0];
                        //                 break;
                        //             }
                        //         }
                        //         instanceChanges.push(instanceChange);
                        //     }
                        //     return instanceChanges;
                        // });
                        /* tslint:disable:promise-function-async */
                        _a = changeContent;
                        return [4 /*yield*/, iModelDb.withPreparedStatement("SELECT ECInstanceId FROM ecchange.change.InstanceChange WHERE Summary.Id=? ORDER BY ECInstanceId", function (stmt) {
                                /* tslint:enable:promise-function-async */
                                stmt.bindId(1, changeSummary_1.id);
                                return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                    var instanceChanges, row, rows, instanceChange, _a, aItr, aItr_1, aItr_1_1, r, e_1_1, aItrBefore, aItrBefore_1, aItrBefore_1_1, r, e_2_1, aItrAfter, aItrAfter_1, aItrAfter_1_1, r, e_3_1, aItr, aItr_2, aItr_2_1, r, e_4_1, e_5;
                                    var e_1, _b, e_2, _c, e_3, _d, e_4, _e;
                                    return __generator(this, function (_f) {
                                        switch (_f.label) {
                                            case 0:
                                                instanceChanges = new Array();
                                                _f.label = 1;
                                            case 1:
                                                if (!(stmt.step() === bentleyjs_core_1.DbResult.BE_SQLITE_ROW)) return [3 /*break*/, 57];
                                                row = stmt.getRow();
                                                rows = [];
                                                _f.label = 2;
                                            case 2:
                                                _f.trys.push([2, 55, , 56]);
                                                instanceChange = imodeljs_backend_1.ChangeSummaryManager.queryInstanceChange(iModelDb, row.id);
                                                _a = instanceChange.opCode;
                                                switch (_a) {
                                                    case imodeljs_common_1.ChangeOpCode.Insert: return [3 /*break*/, 3];
                                                    case imodeljs_common_1.ChangeOpCode.Update: return [3 /*break*/, 16];
                                                    case imodeljs_common_1.ChangeOpCode.Delete: return [3 /*break*/, 41];
                                                }
                                                return [3 /*break*/, 54];
                                            case 3:
                                                aItr = iModelDb.query(imodeljs_backend_1.ChangeSummaryManager.buildPropertyValueChangesECSql(iModelDb, instanceChange, imodeljs_common_1.ChangedValueState.AfterInsert));
                                                _f.label = 4;
                                            case 4:
                                                _f.trys.push([4, 9, 10, 15]);
                                                aItr_1 = __asyncValues(aItr);
                                                _f.label = 5;
                                            case 5: return [4 /*yield*/, aItr_1.next()];
                                            case 6:
                                                if (!(aItr_1_1 = _f.sent(), !aItr_1_1.done)) return [3 /*break*/, 8];
                                                r = aItr_1_1.value;
                                                rows.push(r);
                                                _f.label = 7;
                                            case 7: return [3 /*break*/, 5];
                                            case 8: return [3 /*break*/, 15];
                                            case 9:
                                                e_1_1 = _f.sent();
                                                e_1 = { error: e_1_1 };
                                                return [3 /*break*/, 15];
                                            case 10:
                                                _f.trys.push([10, , 13, 14]);
                                                if (!(aItr_1_1 && !aItr_1_1.done && (_b = aItr_1.return))) return [3 /*break*/, 12];
                                                return [4 /*yield*/, _b.call(aItr_1)];
                                            case 11:
                                                _f.sent();
                                                _f.label = 12;
                                            case 12: return [3 /*break*/, 14];
                                            case 13:
                                                if (e_1) throw e_1.error;
                                                return [7 /*endfinally*/];
                                            case 14: return [7 /*endfinally*/];
                                            case 15:
                                                bentleyjs_core_1.assert(rows.length === 1);
                                                instanceChange.after = rows[0];
                                                return [3 /*break*/, 54];
                                            case 16:
                                                aItrBefore = iModelDb.query(imodeljs_backend_1.ChangeSummaryManager.buildPropertyValueChangesECSql(iModelDb, instanceChange, imodeljs_common_1.ChangedValueState.BeforeUpdate));
                                                _f.label = 17;
                                            case 17:
                                                _f.trys.push([17, 22, 23, 28]);
                                                aItrBefore_1 = __asyncValues(aItrBefore);
                                                _f.label = 18;
                                            case 18: return [4 /*yield*/, aItrBefore_1.next()];
                                            case 19:
                                                if (!(aItrBefore_1_1 = _f.sent(), !aItrBefore_1_1.done)) return [3 /*break*/, 21];
                                                r = aItrBefore_1_1.value;
                                                rows.push(r);
                                                _f.label = 20;
                                            case 20: return [3 /*break*/, 18];
                                            case 21: return [3 /*break*/, 28];
                                            case 22:
                                                e_2_1 = _f.sent();
                                                e_2 = { error: e_2_1 };
                                                return [3 /*break*/, 28];
                                            case 23:
                                                _f.trys.push([23, , 26, 27]);
                                                if (!(aItrBefore_1_1 && !aItrBefore_1_1.done && (_c = aItrBefore_1.return))) return [3 /*break*/, 25];
                                                return [4 /*yield*/, _c.call(aItrBefore_1)];
                                            case 24:
                                                _f.sent();
                                                _f.label = 25;
                                            case 25: return [3 /*break*/, 27];
                                            case 26:
                                                if (e_2) throw e_2.error;
                                                return [7 /*endfinally*/];
                                            case 27: return [7 /*endfinally*/];
                                            case 28:
                                                bentleyjs_core_1.assert(rows.length === 1);
                                                instanceChange.before = rows[0];
                                                rows.length = 0;
                                                aItrAfter = iModelDb.query(imodeljs_backend_1.ChangeSummaryManager.buildPropertyValueChangesECSql(iModelDb, instanceChange, imodeljs_common_1.ChangedValueState.AfterUpdate));
                                                _f.label = 29;
                                            case 29:
                                                _f.trys.push([29, 34, 35, 40]);
                                                aItrAfter_1 = __asyncValues(aItrAfter);
                                                _f.label = 30;
                                            case 30: return [4 /*yield*/, aItrAfter_1.next()];
                                            case 31:
                                                if (!(aItrAfter_1_1 = _f.sent(), !aItrAfter_1_1.done)) return [3 /*break*/, 33];
                                                r = aItrAfter_1_1.value;
                                                rows.push(r);
                                                _f.label = 32;
                                            case 32: return [3 /*break*/, 30];
                                            case 33: return [3 /*break*/, 40];
                                            case 34:
                                                e_3_1 = _f.sent();
                                                e_3 = { error: e_3_1 };
                                                return [3 /*break*/, 40];
                                            case 35:
                                                _f.trys.push([35, , 38, 39]);
                                                if (!(aItrAfter_1_1 && !aItrAfter_1_1.done && (_d = aItrAfter_1.return))) return [3 /*break*/, 37];
                                                return [4 /*yield*/, _d.call(aItrAfter_1)];
                                            case 36:
                                                _f.sent();
                                                _f.label = 37;
                                            case 37: return [3 /*break*/, 39];
                                            case 38:
                                                if (e_3) throw e_3.error;
                                                return [7 /*endfinally*/];
                                            case 39: return [7 /*endfinally*/];
                                            case 40:
                                                bentleyjs_core_1.assert(rows.length === 1);
                                                instanceChange.after = rows[0];
                                                return [3 /*break*/, 54];
                                            case 41:
                                                aItr = iModelDb.query(imodeljs_backend_1.ChangeSummaryManager.buildPropertyValueChangesECSql(iModelDb, instanceChange, imodeljs_common_1.ChangedValueState.BeforeDelete));
                                                _f.label = 42;
                                            case 42:
                                                _f.trys.push([42, 47, 48, 53]);
                                                aItr_2 = __asyncValues(aItr);
                                                _f.label = 43;
                                            case 43: return [4 /*yield*/, aItr_2.next()];
                                            case 44:
                                                if (!(aItr_2_1 = _f.sent(), !aItr_2_1.done)) return [3 /*break*/, 46];
                                                r = aItr_2_1.value;
                                                rows.push(r);
                                                _f.label = 45;
                                            case 45: return [3 /*break*/, 43];
                                            case 46: return [3 /*break*/, 53];
                                            case 47:
                                                e_4_1 = _f.sent();
                                                e_4 = { error: e_4_1 };
                                                return [3 /*break*/, 53];
                                            case 48:
                                                _f.trys.push([48, , 51, 52]);
                                                if (!(aItr_2_1 && !aItr_2_1.done && (_e = aItr_2.return))) return [3 /*break*/, 50];
                                                return [4 /*yield*/, _e.call(aItr_2)];
                                            case 49:
                                                _f.sent();
                                                _f.label = 50;
                                            case 50: return [3 /*break*/, 52];
                                            case 51:
                                                if (e_4) throw e_4.error;
                                                return [7 /*endfinally*/];
                                            case 52: return [7 /*endfinally*/];
                                            case 53:
                                                bentleyjs_core_1.assert(rows.length === 1);
                                                instanceChange.before = rows[0];
                                                return [3 /*break*/, 54];
                                            case 54:
                                                instanceChanges.push(instanceChange);
                                                return [3 /*break*/, 56];
                                            case 55:
                                                e_5 = _f.sent();
                                                reject(e_5);
                                                return [3 /*break*/, 56];
                                            case 56:
                                                resolve(instanceChanges);
                                                return [3 /*break*/, 1];
                                            case 57: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            })];
                    case 2:
                        // changeContent.instanceChanges = iModelDb!.withPreparedStatement<any[]>("SELECT ECInstanceId FROM ecchange.change.InstanceChange WHERE Summary.Id=? ORDER BY ECInstanceId", (stmt: ECSqlStatement): any[] => {
                        //     stmt.bindId(1, changeSummary.id);
                        //     const instanceChanges = new Array<any>();
                        //     while (stmt.step() === DbResult.BE_SQLITE_ROW) {
                        //         const row = stmt.getRow();
                        //         const instanceChange: any = ChangeSummaryManager.queryInstanceChange(iModelDb!, row.id);
                        //         switch (instanceChange.opCode) {
                        //             case ChangeOpCode.Insert: {
                        //                 // Get the instance after the insert
                        //                 const rows: any[] = iModelDb!.executeQuery(ChangeSummaryManager.buildPropertyValueChangesECSql(iModelDb!, instanceChange, ChangedValueState.AfterInsert));
                        //                 assert(rows.length === 1);
                        //                 instanceChange.after = rows[0];
                        //                 break;
                        //             }
                        //             case ChangeOpCode.Update: {
                        //                 // Get the instance before the update
                        //                 let rows: any[] = iModelDb!.executeQuery(ChangeSummaryManager.buildPropertyValueChangesECSql(iModelDb!, instanceChange, ChangedValueState.BeforeUpdate));
                        //                 assert(rows.length === 1);
                        //                 instanceChange.before = rows[0];
                        //                 // Get the instance after the update
                        //                 rows = iModelDb!.executeQuery(ChangeSummaryManager.buildPropertyValueChangesECSql(iModelDb!, instanceChange, ChangedValueState.AfterUpdate));
                        //                 assert(rows.length === 1);
                        //                 instanceChange.after = rows[0];
                        //                 break;
                        //             }
                        //             case ChangeOpCode.Delete: {
                        //                 // Get the instance before the delete
                        //                 const rows: any[] = iModelDb!.executeQuery(ChangeSummaryManager.buildPropertyValueChangesECSql(iModelDb!, instanceChange, ChangedValueState.BeforeDelete));
                        //                 assert(rows.length === 1);
                        //                 instanceChange.before = rows[0];
                        //                 break;
                        //             }
                        //         }
                        //         instanceChanges.push(instanceChange);
                        //     }
                        //     return instanceChanges;
                        // });
                        /* tslint:disable:promise-function-async */
                        _a.instanceChanges = _b.sent();
                        // Detach change cache file for further extraction
                        imodeljs_backend_1.ChangeSummaryManager.detachChangeCache(iModelDb);
                        return [2 /*return*/, changeContent];
                    case 3:
                        error_1 = _b.sent();
                        bentleyjs_core_1.Logger.logError(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Error while extracting changeset summary " + changeSetId + ": " + error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, undefined];
                }
            });
        });
    };
    return ChangeSummaryExtractor;
}());
exports.ChangeSummaryExtractor = ChangeSummaryExtractor;
