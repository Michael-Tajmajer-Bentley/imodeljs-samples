/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";

import {
  WidgetControl,
  ConfigurableCreateInfo,
} from "@bentley/ui-framework";

import SimpleTableComponent from "../../components/Table";

/** A widget control for displaying the Table React component */
export class TableWidget extends WidgetControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    if (options.iModelConnection) {
      this.reactElement = <SimpleTableComponent imodel={options.iModelConnection} rulesetId={options.rulesetId} />;
    }
  }
}
