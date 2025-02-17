/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { Config } from "@bentley/imodeljs-clients";

/**
 * List of possible backends that ninezone-sample-app can use
 */
export enum UseBackend {
  /** Use local ninezone-sample-app backend */
  Local = 0,

  /** Use deployed Navigator backend */
  Navigator = 1,
}

/**
 * Setup configuration for the application
 *
 * **Note:** this part of configuration is in addition to the unique configuration stored in
 * the config file at `src/common/config.json`.
 */
export default function setupEnv() {
  Config.App.merge({
    // -----------------------------------------------------------------------------------------------------------
    // Client registration (RECOMMENDED but OPTIONAL)
    // Must set these variables before deployment, but the supplied defaults can be used for testing on localhost.
    // Create a client registration using the procedure here - https://git.io/fx8YP (Developer registration). For the purpose
    // of running this sample on localhost, ensure your registration includes http://localhost:3000/signin-oidc as a
    // valid redirect URI.
    // -----------------------------------------------------------------------------------------------------------

    // Set this to the registered clientId
    // Note: "imodeljs-spa-test-2686" is setup to work with the (default) localhost redirect URI below
    imjs_browser_test_client_id: "mdt-example-imodel-project",

    // Use this client id when running electron app
    imjs_electron_test_client_id: "spa-4wcyvFPwsFEBnGHqanVldricG",

    // Set this to be the registered redirect URI
    // Note: "http://localhost:3000/signin-callback" is setup to work with the (default) web clientId above
    imjs_browser_test_redirect_uri: "http://localhost:3000/signin-callback",

    // This redirect uri is set up to be used with the electron clientId above
    imjs_electron_test_redirect_uri: "electron://frontend/signin-callback",

    // Set this to be the scopes of services the application needs to access
    // Note: The default value set above ensures the minimal working of the application
    imjs_browser_test_scope: "openid email profile organization imodelhub context-registry-service:read-only product-settings-service",
  });
}
