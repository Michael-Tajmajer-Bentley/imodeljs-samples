"use strict";
/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var imodeljs_clients_1 = require("@bentley/imodeljs-clients");
/**
 * Configuration for Query Agent: uses provided command if necessary first, second it will attempt to look
 * for the npm config generated environment variable, third it will use hard coded values.
 */
var QueryAgentConfig = /** @class */ (function () {
    function QueryAgentConfig() {
    }
    QueryAgentConfig.setupConfig = function () {
        var _a, _b;
        imodeljs_clients_1.Config.App.merge({
            // -----------------------------------------------------------------------------------------------------------
            // Client registration details (REQUIRED)
            // Must set these variables before testing - create a client registration using
            // the developer registration procedure here - https://git.io/fx8YP.
            // Note: These can be set in the environment also - e.g., "set ims_agent_client_id=agent_test_client"
            // -----------------------------------------------------------------------------------------------------------
            imjs_agent_client_id: "service-THNhTC9wS0OI9Jy2JieeD5auX",
            imjs_agent_client_secret: "C2rdPNMHWBCoUoCimuxrT2NuNFnzLX1Sgwe/8psJqOYMK3T80sAGS0XlNmZefwv2kVPqmxyZ7D15GMiMAlJMHg==",
            // -----------------------------------------------------------------------------------------------------------
            // Test project and iModel (REQUIRED)
            // Must set these variables before testing - create a new project and iModel with the
            // developer registration procedure here - https://git.io/fx8YP
            // Note: These can be set in the environment also - e.g., "set imjs_agent_project_name=MyProject"
            // -----------------------------------------------------------------------------------------------------------
            imjs_agent_project_name: "mdt-example-imodel-project",
            imjs_agent_imodel_name: "mdt-example-imodel-project",
            // -----------------------------------------------------------------------------------------------------------
            // Other application settings (NOT REQUIRED)
            // Note: These can be set in the environment also - e.g., "set agent_app_port=3000"
            // -----------------------------------------------------------------------------------------------------------
            agent_app_port: (_a = process.env.AGENT_APP_PORT, (_a !== null && _a !== void 0 ? _a : 3030)),
            agent_app_listen_time: (_b = process.env.AGENT_APP_LISTEN_TIME, (_b !== null && _b !== void 0 ? _b : 1000 * 60 * 10)),
            imjs_buddi_resolve_url_using_region: process.env.IMJS_BUDDI_RESOLVE_URL_USING_REGION,
            imjs_default_relying_party_uri: "https://connect-wsg20.bentley.com",
        });
    };
    Object.defineProperty(QueryAgentConfig, "iModelName", {
        get: function () {
            return imodeljs_clients_1.Config.App.getString("imjs_agent_imodel_name");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryAgentConfig, "projectName", {
        get: function () {
            return imodeljs_clients_1.Config.App.getString("imjs_agent_project_name");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryAgentConfig, "oidcAgentClientConfiguration", {
        get: function () {
            return {
                clientId: imodeljs_clients_1.Config.App.getString("imjs_agent_client_id"),
                clientSecret: imodeljs_clients_1.Config.App.getString("imjs_agent_client_secret"),
                scope: "urlps-third-party context-registry-service:read-only imodelhub",
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryAgentConfig, "outputDir", {
        get: function () {
            return path.join(__dirname, "output");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryAgentConfig, "changeSummaryDir", {
        get: function () {
            return path.join(QueryAgentConfig.outputDir, "changeSummaries");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryAgentConfig, "port", {
        get: function () {
            return imodeljs_clients_1.Config.App.getNumber("agent_app_port");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryAgentConfig, "listenTime", {
        get: function () {
            return imodeljs_clients_1.Config.App.getNumber("agent_app_listen_time");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryAgentConfig, "loggingCategory", {
        get: function () {
            return "imodel-query-agent";
        },
        enumerable: true,
        configurable: true
    });
    return QueryAgentConfig;
}());
exports.QueryAgentConfig = QueryAgentConfig;
