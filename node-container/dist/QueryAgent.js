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
Object.defineProperty(exports, "__esModule", { value: true });
var BriefcaseProvider_1 = require("./BriefcaseProvider");
var ChangeSummaryExtractor_1 = require("./ChangeSummaryExtractor");
var bentleyjs_core_1 = require("@bentley/bentleyjs-core");
var imodeljs_clients_1 = require("@bentley/imodeljs-clients");
var imodeljs_common_1 = require("@bentley/imodeljs-common");
var imodeljs_backend_1 = require("@bentley/imodeljs-backend");
var QueryAgentConfig_1 = require("./QueryAgentConfig");
var imodeljs_clients_backend_1 = require("@bentley/imodeljs-clients-backend");
var fs = require("fs");
var path = require("path");
var actx = new bentleyjs_core_1.ClientRequestContext("");
/** Sleep for ms */
var pause = function (ms) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
}); }); };
/** Agent for querying changesets. Contains backend iModelJs engine. */
var QueryAgent = /** @class */ (function () {
    function QueryAgent(_hubClient, _connectClient, _briefcaseProvider, _changeSummaryExtractor, _oidcClient) {
        if (_hubClient === void 0) { _hubClient = new imodeljs_clients_1.IModelHubClient(new imodeljs_clients_backend_1.AzureFileHandler()); }
        if (_connectClient === void 0) { _connectClient = new imodeljs_clients_1.ConnectClient(); }
        if (_briefcaseProvider === void 0) { _briefcaseProvider = new BriefcaseProvider_1.BriefcaseProvider(); }
        if (_changeSummaryExtractor === void 0) { _changeSummaryExtractor = new ChangeSummaryExtractor_1.ChangeSummaryExtractor(); }
        this._hubClient = _hubClient;
        this._connectClient = _connectClient;
        this._briefcaseProvider = _briefcaseProvider;
        this._changeSummaryExtractor = _changeSummaryExtractor;
        this._oidcClient = _oidcClient;
        this._isInitialized = false;
        QueryAgentConfig_1.QueryAgentConfig.setupConfig();
        bentleyjs_core_1.Logger.initializeToConsole();
        bentleyjs_core_1.Logger.setLevelDefault(bentleyjs_core_1.LogLevel.Error);
        bentleyjs_core_1.Logger.setLevel(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, bentleyjs_core_1.LogLevel.Trace);
        // Following must be done before calling any API in imodeljs
        if (!this._oidcClient)
            this._oidcClient = new imodeljs_clients_backend_1.OidcAgentClient(QueryAgentConfig_1.QueryAgentConfig.oidcAgentClientConfiguration);
        // Startup IModel Host if we need to
        var configuration = new imodeljs_backend_1.IModelHostConfiguration();
        if (!imodeljs_backend_1.IModelHost.configuration)
            imodeljs_backend_1.IModelHost.startup(configuration);
    }
    QueryAgent.prototype._login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jwt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // TODO: remove openid-client.d.ts once imodeljs changes are received
                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Getting JWT access token");
                        return [4 /*yield*/, this._oidcClient.getToken(actx)];
                    case 1:
                        jwt = _a.sent();
                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Got JWT access token");
                        return [2 /*return*/, jwt];
                }
            });
        });
    };
    /** Create listeners and respond to changesets */
    QueryAgent.prototype.listenForAndHandleChangesets = function (listenFor /*ms*/) {
        return __awaiter(this, void 0, void 0, function () {
            var authCtx, changeSetSubscription, deleteChangeSetListener, namedVersionSubscription, deleteNamedVersionListener;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._initialize()];
                    case 1:
                        _a.sent();
                        // Subscribe to change set and named version events
                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Setting up changeset and named version listeners...");
                        authCtx = new imodeljs_clients_1.AuthorizedClientRequestContext(this._accessToken);
                        return [4 /*yield*/, this._hubClient.events.subscriptions.create(authCtx, this._iModelId, ["ChangeSetPostPushEvent"])];
                    case 2:
                        changeSetSubscription = _a.sent();
                        deleteChangeSetListener = this._hubClient.events.createListener(authCtx, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this._accessToken];
                        }); }); }, changeSetSubscription.wsgId, this._iModelId, function (receivedEvent) { return __awaiter(_this, void 0, void 0, function () {
                            var error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Received notification that change set \"" + receivedEvent.changeSetId + "\" was just posted on the Hub");
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, this._extractChangeSummary(receivedEvent.changeSetId)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_1 = _a.sent();
                                        bentleyjs_core_1.Logger.logError(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Unable to extract changeset: " + receivedEvent.changeSetId + ", failed with " + error_1);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, this._hubClient.events.subscriptions.create(authCtx, this._iModelId, ["VersionEvent"])];
                    case 3:
                        namedVersionSubscription = _a.sent();
                        deleteNamedVersionListener = this._hubClient.events.createListener(authCtx, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this._accessToken];
                        }); }); }, namedVersionSubscription.wsgId, this._iModelId, function (receivedEvent) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Received notification that named version \"" + receivedEvent.versionName + "\" was just created on the Hub");
                                return [2 /*return*/];
                            });
                        }); });
                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Listening to changesets for " + listenFor / 1000.0 + " sec.");
                        // Wait for callbacks from events in the iModelHub
                        return [4 /*yield*/, pause(listenFor)];
                    case 4:
                        // Wait for callbacks from events in the iModelHub
                        _a.sent();
                        if (!(this._iModelDb && this._iModelDb.isOpen)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._iModelDb.close(authCtx)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        // Unsubscribe from events (if necessary)
                        if (deleteChangeSetListener)
                            deleteChangeSetListener();
                        if (deleteNamedVersionListener)
                            deleteNamedVersionListener();
                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Finished listening for changesets for " + listenFor / 1000.0 + " sec.");
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Asynchronous initialization */
    QueryAgent.prototype._initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, projectId, iModelId, authCtx, iModels, error_2, error_3, errorStr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._isInitialized) return [3 /*break*/, 9];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        // Initialize (cleanup) output directory
                        this._initializeOutputDirectory();
                        _a = this;
                        return [4 /*yield*/, this._login()];
                    case 2:
                        _a._accessToken = _b.sent();
                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Attempting to find Ids for iModel and Project");
                        projectId = void 0, iModelId = void 0;
                        authCtx = new imodeljs_clients_1.AuthorizedClientRequestContext(this._accessToken);
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, this._connectClient.getProject(authCtx, {
                                $select: "*",
                                $filter: "Name+eq+'" + QueryAgentConfig_1.QueryAgentConfig.projectName + "'",
                            })];
                    case 4:
                        projectId = (_b.sent()).wsgId;
                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Project " + QueryAgentConfig_1.QueryAgentConfig.projectName + " has id: " + projectId);
                        return [4 /*yield*/, this._hubClient.iModels.get(authCtx, projectId, new imodeljs_clients_1.IModelQuery().byName(QueryAgentConfig_1.QueryAgentConfig.iModelName))];
                    case 5:
                        iModels = _b.sent();
                        if (iModels.length === 1)
                            iModelId = iModels[0].wsgId;
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _b.sent();
                        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Error: " + error_2);
                        throw error_2;
                    case 7:
                        if (projectId && iModelId) {
                            this._projectId = projectId;
                            this._iModelId = iModelId;
                            bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Query Agent Initialized with event subscriptions for " + QueryAgentConfig_1.QueryAgentConfig.iModelName);
                            this._isInitialized = true;
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        error_3 = _b.sent();
                        errorStr = new Date().toISOString() + " Unable to verify IModel:'" + QueryAgentConfig_1.QueryAgentConfig.iModelName + "', for project '" + QueryAgentConfig_1.QueryAgentConfig.projectName + "' exists in the iModel Hub: " + error_3;
                        bentleyjs_core_1.Logger.logError(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, errorStr);
                        throw errorStr;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /** Extract a summary of information in the change set - who changed it, when it was changed, what was changed, how it was changed, and write it to a JSON file */
    QueryAgent.prototype._extractChangeSummary = function (changeSetId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, changeContent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._briefcaseProvider.getBriefcase(this._accessToken, this._projectId, this._iModelId, changeSetId)];
                    case 1:
                        _a._iModelDb = _b.sent();
                        return [4 /*yield*/, this._changeSummaryExtractor.extractChangeSummary(this._accessToken, this._iModelDb, changeSetId)];
                    case 2:
                        changeContent = _b.sent();
                        // Write the change summary contents as JSON
                        this._writeChangeSummaryToDisk(changeContent);
                        return [2 /*return*/, changeContent];
                }
            });
        });
    };
    /** Clean up the test output directory to prepare for fresh output */
    QueryAgent.prototype._initializeOutputDirectory = function () {
        var outputDir = QueryAgentConfig_1.QueryAgentConfig.outputDir;
        if (!fs.existsSync(outputDir))
            fs.mkdirSync(outputDir);
        var changeSummaryDir = QueryAgentConfig_1.QueryAgentConfig.changeSummaryDir;
        this._deleteDirectory(changeSummaryDir);
        fs.mkdirSync(changeSummaryDir);
    };
    /** Write the change summary contents as JSON to disk */
    QueryAgent.prototype._writeChangeSummaryToDisk = function (content) {
        var filePath = path.join(QueryAgentConfig_1.QueryAgentConfig.changeSummaryDir, content.id + ".json");
        // Dump the change summary
        fs.writeFileSync(filePath, JSON.stringify(content, function (name, value) {
            if (name === "opCode")
                return imodeljs_common_1.ChangeOpCode[value];
            if (name === "pushDate")
                return new Date(value).toLocaleString();
            return value;
        }, 2));
        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, new Date().toISOString() + " Wrote contents of change summary to " + filePath);
    };
    /** Utility to delete a directory that contains files */
    QueryAgent.prototype._deleteDirectory = function (folderPath) {
        if (!fs.existsSync(folderPath))
            return;
        var files = fs.readdirSync(folderPath);
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            var curPath = path.join(folderPath, file);
            fs.unlinkSync(curPath);
        }
        fs.rmdirSync(folderPath);
    };
    return QueryAgent;
}());
exports.QueryAgent = QueryAgent;
