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
var chai_1 = require("chai");
var imodeljs_clients_1 = require("@bentley/imodeljs-clients");
var QueryAgent_1 = require("../QueryAgent");
var QueryAgentWebServer_1 = require("../QueryAgentWebServer");
var QueryAgentConfig_1 = require("../QueryAgentConfig");
var imodel_changeset_test_utility_1 = require("@bentley/imodel-changeset-test-utility");
var bentleyjs_core_1 = require("@bentley/bentleyjs-core");
var TestMockObjects_1 = require("./TestMockObjects");
var Main_1 = require("../Main");
var ChangeSummaryExtractor_1 = require("../ChangeSummaryExtractor");
var request = require("supertest");
var path = require("path");
// Unit Tests
describe("QueryAgent", function () {
    var agent;
    before(function () {
        TestMockObjects_1.TestMockObjects.setupMockAppConfig();
    });
    after(function () {
        TestMockObjects_1.TestMockObjects.clearMockAppConfig();
    });
    it("Extracts changeset information published to an iModel", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    agent = new QueryAgent_1.QueryAgent(TestMockObjects_1.TestMockObjects.getMockHubClient(), TestMockObjects_1.TestMockObjects.getMockConnectClient(), TestMockObjects_1.TestMockObjects.getMockBriefcaseProvider(), TestMockObjects_1.TestMockObjects.getMockChangeSummaryExtractor(), TestMockObjects_1.TestMockObjects.getMockOidcAgentClient());
                    return [4 /*yield*/, agent.listenForAndHandleChangesets(10)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, agent.listenForAndHandleChangesets(10)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Throws error when async initialization fails", function () { return __awaiter(void 0, void 0, void 0, function () {
        var throwError, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    throwError = true;
                    agent = new QueryAgent_1.QueryAgent(TestMockObjects_1.TestMockObjects.getMockHubClient(), TestMockObjects_1.TestMockObjects.getMockConnectClient(), TestMockObjects_1.TestMockObjects.getMockBriefcaseProvider(), TestMockObjects_1.TestMockObjects.getMockChangeSummaryExtractor(), TestMockObjects_1.TestMockObjects.getMockOidcAgentClient(throwError));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, agent.listenForAndHandleChangesets(10)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    chai_1.expect(error_1 !== undefined).equals(true);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
describe("QueryAgentConfig", function () {
    before(function () {
        TestMockObjects_1.TestMockObjects.setupMockAppConfig();
    });
    after(function () {
        TestMockObjects_1.TestMockObjects.clearMockAppConfig();
    });
    it("Uses __dirname/output as default output directory", function () {
        chai_1.expect(QueryAgentConfig_1.QueryAgentConfig.outputDir).equals(path.join(__dirname, "../", "output"));
    });
});
describe("QueryAgentWebServer", function () {
    var agentWebServer;
    before(function () {
        TestMockObjects_1.TestMockObjects.setupMockAppConfig();
        var agent = new QueryAgent_1.QueryAgent(TestMockObjects_1.TestMockObjects.getMockHubClient(), TestMockObjects_1.TestMockObjects.getMockConnectClient(), TestMockObjects_1.TestMockObjects.getMockBriefcaseProvider(), TestMockObjects_1.TestMockObjects.getMockChangeSummaryExtractor(), TestMockObjects_1.TestMockObjects.getMockOidcAgentClient());
        var webServer = TestMockObjects_1.TestMockObjects.getMockExpressWebServer();
        agentWebServer = new QueryAgentWebServer_1.QueryAgentWebServer(webServer, agent);
    });
    after(function () {
        TestMockObjects_1.TestMockObjects.clearMockAppConfig();
        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, "Cleaning up test resources, may take some time...");
        if (agentWebServer)
            agentWebServer.close();
    });
    it("Extracts changeset information published to an iModel", function () { return __awaiter(void 0, void 0, void 0, function () {
        var listened;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, agentWebServer.run(10)];
                case 1:
                    listened = _a.sent();
                    chai_1.expect(listened).equals(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Returns false when listen for changesets routine throws error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var throwError, agent, webServer, listened;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    throwError = true;
                    agent = new QueryAgent_1.QueryAgent(TestMockObjects_1.TestMockObjects.getMockHubClient(), TestMockObjects_1.TestMockObjects.getMockConnectClient(), TestMockObjects_1.TestMockObjects.getMockBriefcaseProvider(), TestMockObjects_1.TestMockObjects.getMockChangeSummaryExtractor(), TestMockObjects_1.TestMockObjects.getMockOidcAgentClient(throwError));
                    webServer = TestMockObjects_1.TestMockObjects.getMockExpressWebServer();
                    agentWebServer = new QueryAgentWebServer_1.QueryAgentWebServer(webServer, agent);
                    return [4 /*yield*/, agentWebServer.run()];
                case 1:
                    listened = _a.sent();
                    chai_1.expect(listened).equals(false);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Main", function () {
    var mockQueryAgentWebServer;
    var mockProcess = TestMockObjects_1.TestMockObjects.getMockProcess();
    before(function () {
        TestMockObjects_1.TestMockObjects.setupMockAppConfig();
    });
    after(function () {
        TestMockObjects_1.TestMockObjects.clearMockAppConfig();
    });
    it("runs the Query Agent Web Server and handles process when invoked", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockQueryAgentWebServer = TestMockObjects_1.TestMockObjects.getMockQueryAgentWebServer();
                    return [4 /*yield*/, Main_1.main(mockProcess, mockQueryAgentWebServer)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Catches error thrown when running Query Agent Web Server", function () { return __awaiter(void 0, void 0, void 0, function () {
        var runThrowsError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    runThrowsError = true;
                    mockQueryAgentWebServer = TestMockObjects_1.TestMockObjects.getMockQueryAgentWebServer(runThrowsError);
                    return [4 /*yield*/, Main_1.main(mockProcess, mockQueryAgentWebServer)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Executes properly when run result is false", function () { return __awaiter(void 0, void 0, void 0, function () {
        var runThrowsError, runResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    runThrowsError = false;
                    runResult = false;
                    mockQueryAgentWebServer = TestMockObjects_1.TestMockObjects.getMockQueryAgentWebServer(runThrowsError, runResult);
                    return [4 /*yield*/, Main_1.main(mockProcess, mockQueryAgentWebServer)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("ChangeSummaryExtractor", function () {
    var changeSummaryExtractor;
    before(function () {
        TestMockObjects_1.TestMockObjects.setupMockAppConfig();
        changeSummaryExtractor = new ChangeSummaryExtractor_1.ChangeSummaryExtractor();
    });
    after(function () {
        TestMockObjects_1.TestMockObjects.clearMockAppConfig();
    });
    it("Catches errors in its method", function () { return __awaiter(void 0, void 0, void 0, function () {
        var ret;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, changeSummaryExtractor.extractChangeSummary(TestMockObjects_1.TestMockObjects.getFakeAccessToken(), TestMockObjects_1.TestMockObjects.getMockIModelDb(), "FAKE_CHANGESET_ID")];
                case 1:
                    ret = _a.sent();
                    chai_1.expect(ret).equals(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
});
// Basic Code Level Integration Tests
describe("IModelQueryAgentWebServer (#integration)", function () {
    var agentWebServer;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            imodeljs_clients_1.Config.App.appendSystemVars();
            QueryAgentConfig_1.QueryAgentConfig.setupConfig();
            agentWebServer = new QueryAgentWebServer_1.QueryAgentWebServer();
            return [2 /*return*/];
        });
    }); });
    after(function () {
        agentWebServer.close();
    });
    it("Web server responds to '/' and '/ping'", function () { return __awaiter(void 0, void 0, void 0, function () {
        var server, ret;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    server = agentWebServer.getServer();
                    return [4 /*yield*/, request(server).get("/")];
                case 1:
                    ret = _a.sent();
                    chai_1.expect(ret.status).equals(200);
                    return [4 /*yield*/, request(server).get("/ping")];
                case 2:
                    ret = _a.sent();
                    chai_1.expect(ret.status).equals(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Extracts changeset information published to an iModel", function () { return __awaiter(void 0, void 0, void 0, function () {
        var listened;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, agentWebServer.run(10)];
                case 1:
                    listened = _a.sent();
                    chai_1.expect(listened).equals(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("Main (#integration)", function () {
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            imodeljs_clients_1.Config.App.appendSystemVars();
            QueryAgentConfig_1.QueryAgentConfig.setupConfig();
            return [2 /*return*/];
        });
    }); });
    it("Runs the Query Agent Web Server when invoked", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Use mock process to avoid exiting the test process
                return [4 /*yield*/, Main_1.main(TestMockObjects_1.TestMockObjects.getMockProcess(), new QueryAgentWebServer_1.QueryAgentWebServer(), 10)];
                case 1:
                    // Use mock process to avoid exiting the test process
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("IModelQueryAgent Running with Changesets (#integration)", function () {
    var changesetHarness;
    var agentWebServer;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imodeljs_clients_1.Config.App.appendSystemVars();
                    QueryAgentConfig_1.QueryAgentConfig.setupConfig();
                    // Set up changeset generation harness and agent web server
                    changesetHarness = new imodel_changeset_test_utility_1.ChangesetGenerationHarness(undefined, undefined, QueryAgentConfig_1.QueryAgentConfig.outputDir);
                    // initialize iModel in the hub before listening for changesets on it
                    return [4 /*yield*/, changesetHarness.initialize()];
                case 1:
                    // initialize iModel in the hub before listening for changesets on it
                    _a.sent();
                    agentWebServer = new QueryAgentWebServer_1.QueryAgentWebServer();
                    return [2 /*return*/];
            }
        });
    }); });
    after(function () {
        bentleyjs_core_1.Logger.logTrace(QueryAgentConfig_1.QueryAgentConfig.loggingCategory, "Cleaning up test resources, may take some time...");
        agentWebServer.close();
    });
    it("Extracts changeset information published to an iModel", function () { return __awaiter(void 0, void 0, void 0, function () {
        var changesetSequence, _a, changesetGenerated, listened;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    changesetSequence = new imodel_changeset_test_utility_1.TestChangesetSequence(5, 12, 2000);
                    return [4 /*yield*/, Promise.all([changesetHarness.generateChangesets(changesetSequence), agentWebServer.run()])];
                case 1:
                    _a = _b.sent(), changesetGenerated = _a[0], listened = _a[1];
                    chai_1.expect(changesetGenerated).equals(true);
                    chai_1.expect(listened).equals(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
