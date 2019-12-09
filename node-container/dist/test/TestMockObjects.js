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
var BriefcaseProvider_1 = require("../BriefcaseProvider");
var imodeljs_clients_1 = require("@bentley/imodeljs-clients");
var TypeMoq = require("typemoq");
var imodeljs_clients_2 = require("@bentley/imodeljs-clients");
/** Static test mock objects */
var TestMockObjects = /** @class */ (function () {
    function TestMockObjects() {
    }
    TestMockObjects.setupMockAppConfig = function () {
        imodeljs_clients_2.Config.App.merge({
            imjs_agent_client_id: "FAKE_CLIENT_ID",
            imjs_agent_client_secret: "FAKE_CLIENT_SECRET",
            imjs_agent_service_user_email: "FAKE_USER_EMAIL",
            imjs_agent_service_user_password: "FAKE_USER_PASS",
            imjs_agent_project_name: "FAKE_PROJECT_NAME",
            imjs_agent_imodel_name: "FAKE_IMODEL_NAME",
            agent_app_port: 3000,
            agent_app_listen_time: 20,
            imjs_buddi_resolve_url_using_region: "103",
            imjs_default_relying_party_uri: "https://fake.com",
        });
    };
    TestMockObjects.clearMockAppConfig = function () {
        imodeljs_clients_2.Config.App.remove("imjs_agent_client_id");
        imodeljs_clients_2.Config.App.remove("imjs_agent_client_secret");
        imodeljs_clients_2.Config.App.remove("imjs_agent_service_user_email");
        imodeljs_clients_2.Config.App.remove("imjs_agent_service_user_password");
        imodeljs_clients_2.Config.App.remove("imjs_agent_project_name");
        imodeljs_clients_2.Config.App.remove("imjs_agent_imodel_name");
        imodeljs_clients_2.Config.App.remove("agent_app_port");
        imodeljs_clients_2.Config.App.remove("agent_app_listen_time");
        imodeljs_clients_2.Config.App.remove("imjs_buddi_resolve_url_using_region");
        imodeljs_clients_2.Config.App.remove("imjs_default_relying_party_uri");
    };
    TestMockObjects.getMockChangeSummaryExtractor = function () {
        var mockExtractor = TypeMoq.Mock.ofType();
        return mockExtractor.object;
    };
    TestMockObjects.getMockExpressWebServer = function () {
        var mockServer = TypeMoq.Mock.ofType();
        var mockHttpServer = TypeMoq.Mock.ofType();
        mockHttpServer.setup(function (_) { return _.on(TypeMoq.It.isAny(), TypeMoq.It.isAny()); }).returns(function () { return mockHttpServer.object; });
        mockServer.setup(function (_) { return _.listen(TypeMoq.It.isAny(), TypeMoq.It.isAny()); }).returns(function () { return mockHttpServer.object; });
        return mockServer.object;
    };
    TestMockObjects.getMockConnectClient = function () {
        var _this = this;
        var mockConnectClient = TypeMoq.Mock.ofType();
        var project = new imodeljs_clients_1.Project();
        project.wsgId = "FAKE_WSG_ID";
        mockConnectClient.setup(function (_) { return _.getProject(TypeMoq.It.isAny(), TypeMoq.It.isAny()); }).returns(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, project];
        }); }); });
        return mockConnectClient.object;
    };
    TestMockObjects.getMockProcess = function () {
        var mockProcess = TypeMoq.Mock.ofType();
        mockProcess.setup(function (_) { return _.exit(TypeMoq.It.isAny()); });
        return mockProcess.object;
    };
    TestMockObjects.getMockQueryAgentWebServer = function (runThrowsError, runResult) {
        var _this = this;
        if (runThrowsError === void 0) { runThrowsError = false; }
        if (runResult === void 0) { runResult = true; }
        var mockAgentWebServer = TypeMoq.Mock.ofType();
        if (runThrowsError)
            mockAgentWebServer.setup(function (_) { return _.run(); }).throws(new Error("Mock web server run failure"));
        else
            mockAgentWebServer.setup(function (_) { return _.run(); }).returns(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, runResult];
            }); }); });
        return mockAgentWebServer.object;
    };
    TestMockObjects.getMockOidcAgentClient = function (throwsError) {
        var _this = this;
        if (throwsError === void 0) { throwsError = false; }
        var mockOidcAgentClient = TypeMoq.Mock.ofType();
        if (throwsError)
            mockOidcAgentClient.setup(function (_) { return _.getToken(TypeMoq.It.isAny()); }).throws(new Error("Mock login failure"));
        else
            mockOidcAgentClient.setup(function (_) { return _.getToken(TypeMoq.It.isAny()); }).returns(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this.getFakeAccessToken()];
            }); }); });
        return mockOidcAgentClient.object;
    };
    TestMockObjects.getMockIModelDb = function () {
        var mockIModelDb = TypeMoq.Mock.ofType();
        return mockIModelDb.object;
    };
    TestMockObjects.getMockBriefcaseProvider = function (throwsError) {
        var _this = this;
        if (throwsError === void 0) { throwsError = false; }
        var mockBriefcaseProvider = TypeMoq.Mock.ofType(BriefcaseProvider_1.BriefcaseProvider);
        if (throwsError) {
            mockBriefcaseProvider.setup(function (_) { return _.getBriefcase(TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny()); }).throws(new Error("MOCK Briefcase provider failure"));
        }
        else {
            mockBriefcaseProvider.setup(function (_) { return _.getBriefcase(TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny()); }).returns(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.getMockIModelDb()];
                });
            }); });
        }
        return mockBriefcaseProvider.object;
    };
    TestMockObjects.getMockHubClient = function () {
        var _this = this;
        var mockHubClient = TypeMoq.Mock.ofType(imodeljs_clients_1.IModelHubClient);
        mockHubClient.setup(function (_) { return _.events; }).returns(function () { return _this.getMockEventHandler(); });
        mockHubClient.setup(function (_) { return _.iModels; }).returns(function () { return _this.getMockIModelsHandler(); });
        return mockHubClient.object;
    };
    TestMockObjects.getMockIModelsHandler = function () {
        var _this = this;
        var hubIModel = new imodeljs_clients_1.HubIModel();
        hubIModel.wsgId = "FAKE_WSG_ID";
        var hubIModels = [hubIModel];
        var mockIModelHandler = TypeMoq.Mock.ofType();
        mockIModelHandler.setup(function (_) { return _.get(TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny()); }).returns(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, hubIModels];
        }); }); });
        return mockIModelHandler.object;
    };
    TestMockObjects.getMockEventHandler = function () {
        var _this = this;
        var mockEventHandler = TypeMoq.Mock.ofType(imodeljs_clients_1.EventHandler);
        mockEventHandler.setup(function (_) { return _.subscriptions; }).returns(function () { return _this.getMockEventSubscriptionHandler(); });
        var listener = function (event) { event; };
        mockEventHandler.setup(function (_) { return _.createListener(TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny(), listener); }).returns(function () { return function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); }; });
        return mockEventHandler.object;
    };
    TestMockObjects.getMockEventSubscriptionHandler = function () {
        var _this = this;
        var mockEventSubscriptionHandler = TypeMoq.Mock.ofType(imodeljs_clients_1.EventSubscriptionHandler);
        mockEventSubscriptionHandler.setup(function (_) { return _.create(TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny()); }).returns(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.getMockEventSubscription()];
        }); }); });
        return mockEventSubscriptionHandler.object;
    };
    TestMockObjects.getMockEventSubscription = function () {
        var mockEventSubscription = TypeMoq.Mock.ofType(imodeljs_clients_1.EventSubscription);
        return mockEventSubscription.object;
    };
    TestMockObjects.getFakeAccessToken = function () {
        var token = imodeljs_clients_1.AccessToken.fromForeignProjectAccessTokenJson(this.fakeAccessToken);
        return token;
    };
    TestMockObjects.getFakeIModelId = function () {
        return "FAKE_IMODEL_ID";
    };
    TestMockObjects.getFakeProjectId = function () {
        return "FakePhysicalModelId";
    };
    TestMockObjects.fakeAccessToken = "FAKE_ACCESS_TOKEN";
    return TestMockObjects;
}());
exports.TestMockObjects = TestMockObjects;
