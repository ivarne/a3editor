/* eslint-disable */

"use strict";
module.exports = validate20;
module.exports.default = validate20;
const schema22 = {
  $id: "https://altinncdn.no/schemas/json/layout/layout.schema.v1.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Altinn layout",
  description:
    "Schema that describes the layout configuration for Altinn applications.",
  type: "object",
  additionalProperties: true,
  properties: { data: { $ref: "#/definitions/data" } },
  definitions: {
    data: {
      title: "The layout data",
      description: "Contains data describing the layout configuration.",
      type: "object",
      properties: { layout: { $ref: "#/definitions/layout" } },
    },
    layout: {
      title: "The layout",
      description: "Array of components to be presented in the layout.",
      type: "array",
      items: { $ref: "#/definitions/component" },
    },
    component: {
      type: "object",
      properties: {
        id: {
          type: "string",
          title: "id",
          pattern: "^[0-9a-zA-Z][0-9a-zA-Z-]*[0-9a-zA-Z]$",
          description:
            "The component ID. Must be unique within a given layout.",
        },
        type: {
          type: "string",
          title: "Type",
          description: "The component type.",
          enum: [
            "AddressComponent",
            "AttachmentList",
            "Button",
            "Checkboxes",
            "Datepicker",
            "Dropdown",
            "FileUpload",
            "Group",
            "Header",
            "Image",
            "Input",
            "InstantiationButton",
            "NavigationButtons",
            "Paragraph",
            "RadioButtons",
            "Summary",
            "TextArea",
          ],
        },
        required: {
          type: "boolean",
          title: "Required",
          description:
            "Boolean value indicating if the component is required when filling in the form. Defaults to false.",
          default: false,
        },
        readOnly: {
          type: "boolean",
          title: "Read only",
          description:
            "Boolean value indicating if the component should be presented as read only. Defaults to false.",
          default: false,
        },
        textResourceBindings: {
          type: "object",
          title: "Text resource bindings",
          description: "Text resource bindings for a component.",
          additionalProperties: { type: "string" },
          examples: [
            { title: "some.text.binding", help: "some.other.text.binding" },
          ],
        },
        dataModelBindings: {
          type: "object",
          title: "Data model bindings",
          description: "Data model bindings for a component.",
          additionalProperties: { type: "string" },
          examples: [{ simpleBinding: "some.data.binding" }],
        },
        triggers: { $ref: "#/definitions/triggers" },
        labelSettings: {
          type: "object",
          title: "Label settings",
          description:
            "A collection of settings for how the component label should be rendered.",
          properties: {
            optionalIndicator: {
              type: "boolean",
              title: "Optional indicator",
              description:
                "Controls whether the text that is indicating that a field is optional should be displayed.",
              default: true,
            },
          },
        },
        grid: {
          type: "object",
          title: "Grid",
          description:
            "Settings for the components grid. Used for controlling horizontal alignment.",
          $ref: "#/definitions/gridSettings",
          examples: [{ xs: 12 }],
        },
      },
      required: ["id", "type"],
      allOf: [
        {
          if: { properties: { type: { const: "AddressComponent" } } },
          then: { $ref: "#/definitions/addressComponent" },
        },
        {
          if: { properties: { type: { const: "AttachmentList" } } },
          then: { $ref: "#/definitions/attachmentListComponent" },
        },
        {
          if: { properties: { type: { const: "Checkboxes" } } },
          then: { $ref: "#/definitions/selectionComponents" },
        },
        {
          if: { properties: { type: { const: "Datepicker" } } },
          then: { $ref: "#/definitions/datepickerComponent" },
        },
        {
          if: { properties: { type: { const: "Dropdown" } } },
          then: { $ref: "#/definitions/selectionComponents" },
        },
        {
          if: { properties: { type: { const: "FileUpload" } } },
          then: { $ref: "#/definitions/fileUploadComponent" },
        },
        {
          if: { properties: { type: { const: "Group" } } },
          then: { $ref: "#/definitions/groupComponent" },
        },
        {
          if: { properties: { type: { const: "Image" } } },
          then: { $ref: "#/definitions/imageComponent" },
        },
        {
          if: { properties: { type: { const: "Input" } } },
          then: { $ref: "#/definitions/inputComponent" },
        },
        {
          if: { properties: { type: { const: "InstantiationButton" } } },
          then: { $ref: "#/definitions/instantiationButtonComponent" },
        },
        {
          if: { properties: { type: { const: "NavigationButtons" } } },
          then: { $ref: "#/definitions/navigationButtonsComponent" },
        },
        {
          if: { properties: { type: { const: "RadioButtons" } } },
          then: { $ref: "#/definitions/selectionComponents" },
        },
        {
          if: { properties: { type: { const: "Summary" } } },
          then: { $ref: "#/definitions/summaryComponent" },
        },
        {
          if: { properties: { type: { const: "Header" } } },
          then: { $ref: "#/definitions/headerComponent" },
        },
      ],
    },
    headerComponent: {
      properties: {
        size: {
          title: "Header size",
          description: "'L'=<h2>, 'M'=<h3>, 'S'=<h4>",
          type: "string",
          enum: ["L", "M", "S", "h2", "h3", "h4"],
        },
      },
      required: ["size"],
    },
    fileUploadComponent: {
      properties: {
        maxFileSizeInMB: {
          title: "Maximum file size in MB",
          description: "Sets the maximum file size allowed in megabytes.",
          type: "integer",
          minimum: 0,
        },
        maxNumberOfAttachments: {
          title: "Maximum allowed attachments",
          description:
            "Sets the maximum number of attachments allowed to upload.",
          type: "integer",
          minimum: 0,
        },
        minNumberOfAttachments: {
          title: "Minimum allowed attachments",
          description: "Sets the minimum number of attachments to upload",
          type: "integer",
          minimum: 0,
        },
        displayMode: {
          title: "Display mode",
          description: "Sets the display mode for the file upload component.",
          type: "string",
          enum: ["simple", "list"],
        },
        hasCustomFileEndings: {
          title: "Has custom file endings",
          description:
            "Boolean value indicating if the component has valid file endings",
          type: "boolean",
        },
        validFileEndings: {
          title: "Valid file endings",
          description:
            "A separated string of valid file endings to upload. If not set all endings are accepted.",
          type: "string",
          examples: ["csv", "doc", "docx", "gif", "jpeg", "pdf", "txt"],
        },
      },
      required: [
        "displayMode",
        "maxFileSizeInMB",
        "maxNumberOfAttachments",
        "minNumberOfAttachments",
      ],
    },
    datepickerComponent: {
      properties: {
        minDate: {
          type: "string",
          title: "Minimum allowed date",
          description:
            "Sets the minimum allowed date. Can also use keyword 'today' to disable all past dates dynamically based on the current date. Defaults to 1900-01-01T12:00:00.000Z.",
          default: "1900-01-01T12:00:00.000Z",
        },
        maxDate: {
          type: "string",
          title: "Maximum allowed date",
          description:
            "Sets the maximum allowed date. Can also use keyword 'today' to disable all future dates dynamically based on the current date. Defaults to 2100-01-01T12:00:00.000Z.",
          default: "2100-01-01T12:00:00.000Z.",
        },
        timeStamp: {
          type: "boolean",
          title: "Time stamp",
          description:
            "Boolean value indicating if the date time should be stored as a timeStamp. Defaults to true.",
          default: true,
        },
      },
      required: [],
    },
    navigationButtonsComponent: {
      properties: {
        showBackButton: {
          type: "boolean",
          title: "Show back button",
          description: "Shows two buttons (back/next) instead of just 'next'.",
        },
      },
    },
    instantiationButtonComponent: {
      properties: {
        mapping: {
          type: "object",
          title: "Mapping",
          description:
            "Creates a new app instance with data collected from a stateless part of the app.",
          examples: [
            { "some.source.field": "key1", "some.other.source": "key2" },
          ],
          additionalProperties: { type: "string" },
        },
      },
    },
    gridValue: { type: "integer", maximum: 12, minimum: 1, examples: [12] },
    gridSettings: {
      allOf: [{ $ref: "#/definitions/gridProps" }],
      properties: {
        labelGrid: {
          title: "labelGrid",
          description:
            "Optional grid for the component label. Used in combination with innerGrid to align labels on the side.",
          examples: [{ xs: 12 }],
          $ref: "#/definitions/gridProps",
        },
        innerGrid: {
          title: "innerGrid",
          description:
            "Optional grid for inner component content like input field or dropdown. Used to avoid inner content filling the component width.",
          examples: [{ xs: 12 }],
          $ref: "#/definitions/gridProps",
        },
      },
    },
    gridProps: {
      properties: {
        xs: {
          $ref: "#/definitions/gridValue",
          title: "xs",
          description: "Grid breakpoint at 0px",
        },
        sm: {
          $ref: "#/definitions/gridValue",
          title: "sm",
          description: "Grid breakpoint at 600px",
        },
        md: {
          $ref: "#/definitions/gridValue",
          title: "md",
          description: "Grid breakpoint at 960px",
        },
        lg: {
          $ref: "#/definitions/gridValue",
          title: "lg",
          description: "Grid breakpoint at 1280px",
        },
        xl: {
          $ref: "#/definitions/gridValue",
          title: "xl",
          description: "Grid breakpoint at 1920px",
        },
      },
    },
    groupComponent: {
      properties: {
        children: {
          title: "Children",
          description:
            'An array of the "id" of child components belonging to the group.',
          type: "array",
          items: { type: "string" },
          uniqueItems: true,
        },
        edit: {
          title: "Edit",
          description: "Alternatives for edit view of repeating group",
          $ref: "#/definitions/groupEditOptions",
        },
        maxCount: {
          type: "integer",
          title: "Maximum count",
          description:
            "The maximum number of iterations of a group. Only relevant if group is repeating.",
          minimum: 0,
        },
        tableHeaders: {
          title: "Table Headers",
          description:
            "An array of the id of child components that should be included as table headers. If not defined all components are shown.",
          type: "array",
          items: { type: "string" },
          uniqueItems: true,
        },
      },
      required: ["children"],
    },
    groupEditOptions: {
      properties: {
        mode: {
          title: "Edit mode",
          description:
            "Mode for how repeating group table is displayed in edit mode",
          type: "string",
          enum: ["hideTable", "showAll", "showTable"],
        },
        filter: {
          title: "Filter",
          description:
            "Conditions for filtering visible items in repeating group",
          type: "array",
          items: { $ref: "#/definitions/groupFilterItem" },
        },
        saveButton: {
          title: "Save button",
          description:
            "Boolean value indicating whether save button should be shown or not in edit mode of repeating group item.",
          type: "boolean",
        },
        deleteButton: {
          title: "Delete button",
          description:
            "Boolean value indicating whether delete button should be shown or not in edit mode of repeating group item.",
          type: "boolean",
        },
        multiPage: {
          title: "Multi-page",
          description:
            "Boolean value indicating if form components in edit mode should be shown over multiple pages/views.",
          type: "boolean",
        },
        addButton: {
          title: "Add button",
          description:
            "Boolean value indicating whether add new button should be shown or not under the table.",
          type: "boolean",
        },
      },
    },
    groupFilterItem: {
      properties: {
        key: {
          title: "Key",
          description: "Key representing field in data model to check.",
          type: "string",
        },
        value: {
          title: "Value",
          description: "Value to check against.",
          type: "string",
        },
      },
    },
    options: {
      properties: {
        label: {
          type: "string",
          title: "Label",
          description:
            "The option label. Can be plain text or a text resource binding.",
        },
        value: {
          type: "string",
          title: "Value",
          description: "The option value.",
        },
      },
      required: ["label", "value"],
    },
    triggers: {
      title: "Triggers",
      description:
        "An array of actions that should be triggered when data connected to this component changes.",
      type: "array",
      items: {
        type: "string",
        enum: [
          "validation",
          "validatePage",
          "validateAllPages",
          "calculatePageOrder",
        ],
      },
    },
    selectionComponents: {
      properties: {
        optionsId: {
          type: "string",
          title: "Options ID",
          description: "Reference to connected options by id.",
        },
        options: {
          type: "array",
          title: "Options",
          description:
            "An array of options. Only relevant if no optionsId is set.",
          items: { $ref: "#/definitions/options" },
        },
        preselectedOptionIndex: {
          type: "integer",
          title: "Preselected option index",
          description: "Sets a preselected index.",
          minimum: 0,
        },
      },
    },
    addressComponent: {
      properties: {
        simplified: {
          type: "boolean",
          title: "Simplified",
          description:
            "Boolean value indicating if the address component should be shown in simple mode.",
          default: false,
        },
      },
    },
    summaryComponent: {
      properties: {
        componentRef: {
          type: "string",
          title: "Component reference",
          description:
            "String value indicating which layout component (by ID) the summary is for.",
        },
        pageRef: {
          type: "string",
          title: "Page reference",
          description:
            "String value indicating which layout page the referenced component is defined on.",
        },
      },
    },
    attachmentListComponent: {
      properties: {
        dataTypeIds: {
          type: "array",
          items: { type: "string" },
          title: "Data type IDs",
          description: "List of data type IDs for the attachment list to show.",
          examples: [["SomeDataType", "SomeOtherDataType"]],
        },
      },
    },
    imageComponent: {
      properties: {
        image: {
          type: "object",
          title: "Image properties",
          description: "Set of options for image field.",
          properties: {
            src: {
              title: "Image source",
              description: "",
              type: "object",
              properties: {
                nb: { type: "string", title: "Bokmål" },
                nn: { type: "string", title: "Nynorsk" },
                en: { type: "string", title: "English" },
              },
              additionalProperties: true,
            },
            width: { type: "string", title: "Image width", examples: ["100%"] },
            align: {
              type: "string",
              title: "Align image",
              enum: [
                "flex-start",
                "center",
                "flex-end",
                "space-between",
                "space-around",
                "space-evenly",
              ],
            },
          },
        },
      },
    },
    inputComponent: {
      properties: {
        formatting: {
          title: "Input formatting",
          description: "Set of options for formatting input fields.",
          $ref: "#/definitions/inputFormatting",
        },
      },
    },
    inputFormatting: {
      properties: {
        number: {
          $ref: "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json",
        },
        align: {
          type: "string",
          title: "Align input",
          description:
            "The alignment for Input field (eg. right aligning a series of numbers)",
          enum: ["left", "center", "right"],
        },
      },
    },
  },
};
const schema23 = {
  title: "The layout data",
  description: "Contains data describing the layout configuration.",
  type: "object",
  properties: { layout: { $ref: "#/definitions/layout" } },
};
const schema24 = {
  title: "The layout",
  description: "Array of components to be presented in the layout.",
  type: "array",
  items: { $ref: "#/definitions/component" },
};
const schema25 = {
  type: "object",
  properties: {
    id: {
      type: "string",
      title: "id",
      pattern: "^[0-9a-zA-Z][0-9a-zA-Z-]*[0-9a-zA-Z]$",
      description: "The component ID. Must be unique within a given layout.",
    },
    type: {
      type: "string",
      title: "Type",
      description: "The component type.",
      enum: [
        "AddressComponent",
        "AttachmentList",
        "Button",
        "Checkboxes",
        "Datepicker",
        "Dropdown",
        "FileUpload",
        "Group",
        "Header",
        "Image",
        "Input",
        "InstantiationButton",
        "NavigationButtons",
        "Paragraph",
        "RadioButtons",
        "Summary",
        "TextArea",
      ],
    },
    required: {
      type: "boolean",
      title: "Required",
      description:
        "Boolean value indicating if the component is required when filling in the form. Defaults to false.",
      default: false,
    },
    readOnly: {
      type: "boolean",
      title: "Read only",
      description:
        "Boolean value indicating if the component should be presented as read only. Defaults to false.",
      default: false,
    },
    textResourceBindings: {
      type: "object",
      title: "Text resource bindings",
      description: "Text resource bindings for a component.",
      additionalProperties: { type: "string" },
      examples: [
        { title: "some.text.binding", help: "some.other.text.binding" },
      ],
    },
    dataModelBindings: {
      type: "object",
      title: "Data model bindings",
      description: "Data model bindings for a component.",
      additionalProperties: { type: "string" },
      examples: [{ simpleBinding: "some.data.binding" }],
    },
    triggers: { $ref: "#/definitions/triggers" },
    labelSettings: {
      type: "object",
      title: "Label settings",
      description:
        "A collection of settings for how the component label should be rendered.",
      properties: {
        optionalIndicator: {
          type: "boolean",
          title: "Optional indicator",
          description:
            "Controls whether the text that is indicating that a field is optional should be displayed.",
          default: true,
        },
      },
    },
    grid: {
      type: "object",
      title: "Grid",
      description:
        "Settings for the components grid. Used for controlling horizontal alignment.",
      $ref: "#/definitions/gridSettings",
      examples: [{ xs: 12 }],
    },
  },
  required: ["id", "type"],
  allOf: [
    {
      if: { properties: { type: { const: "AddressComponent" } } },
      then: { $ref: "#/definitions/addressComponent" },
    },
    {
      if: { properties: { type: { const: "AttachmentList" } } },
      then: { $ref: "#/definitions/attachmentListComponent" },
    },
    {
      if: { properties: { type: { const: "Checkboxes" } } },
      then: { $ref: "#/definitions/selectionComponents" },
    },
    {
      if: { properties: { type: { const: "Datepicker" } } },
      then: { $ref: "#/definitions/datepickerComponent" },
    },
    {
      if: { properties: { type: { const: "Dropdown" } } },
      then: { $ref: "#/definitions/selectionComponents" },
    },
    {
      if: { properties: { type: { const: "FileUpload" } } },
      then: { $ref: "#/definitions/fileUploadComponent" },
    },
    {
      if: { properties: { type: { const: "Group" } } },
      then: { $ref: "#/definitions/groupComponent" },
    },
    {
      if: { properties: { type: { const: "Image" } } },
      then: { $ref: "#/definitions/imageComponent" },
    },
    {
      if: { properties: { type: { const: "Input" } } },
      then: { $ref: "#/definitions/inputComponent" },
    },
    {
      if: { properties: { type: { const: "InstantiationButton" } } },
      then: { $ref: "#/definitions/instantiationButtonComponent" },
    },
    {
      if: { properties: { type: { const: "NavigationButtons" } } },
      then: { $ref: "#/definitions/navigationButtonsComponent" },
    },
    {
      if: { properties: { type: { const: "RadioButtons" } } },
      then: { $ref: "#/definitions/selectionComponents" },
    },
    {
      if: { properties: { type: { const: "Summary" } } },
      then: { $ref: "#/definitions/summaryComponent" },
    },
    {
      if: { properties: { type: { const: "Header" } } },
      then: { $ref: "#/definitions/headerComponent" },
    },
  ],
};
const schema26 = {
  properties: {
    simplified: {
      type: "boolean",
      title: "Simplified",
      description:
        "Boolean value indicating if the address component should be shown in simple mode.",
      default: false,
    },
  },
};
const schema27 = {
  properties: {
    dataTypeIds: {
      type: "array",
      items: { type: "string" },
      title: "Data type IDs",
      description: "List of data type IDs for the attachment list to show.",
      examples: [["SomeDataType", "SomeOtherDataType"]],
    },
  },
};
const schema30 = {
  properties: {
    minDate: {
      type: "string",
      title: "Minimum allowed date",
      description:
        "Sets the minimum allowed date. Can also use keyword 'today' to disable all past dates dynamically based on the current date. Defaults to 1900-01-01T12:00:00.000Z.",
      default: "1900-01-01T12:00:00.000Z",
    },
    maxDate: {
      type: "string",
      title: "Maximum allowed date",
      description:
        "Sets the maximum allowed date. Can also use keyword 'today' to disable all future dates dynamically based on the current date. Defaults to 2100-01-01T12:00:00.000Z.",
      default: "2100-01-01T12:00:00.000Z.",
    },
    timeStamp: {
      type: "boolean",
      title: "Time stamp",
      description:
        "Boolean value indicating if the date time should be stored as a timeStamp. Defaults to true.",
      default: true,
    },
  },
  required: [],
};
const schema31 = {
  properties: {
    maxFileSizeInMB: {
      title: "Maximum file size in MB",
      description: "Sets the maximum file size allowed in megabytes.",
      type: "integer",
      minimum: 0,
    },
    maxNumberOfAttachments: {
      title: "Maximum allowed attachments",
      description: "Sets the maximum number of attachments allowed to upload.",
      type: "integer",
      minimum: 0,
    },
    minNumberOfAttachments: {
      title: "Minimum allowed attachments",
      description: "Sets the minimum number of attachments to upload",
      type: "integer",
      minimum: 0,
    },
    displayMode: {
      title: "Display mode",
      description: "Sets the display mode for the file upload component.",
      type: "string",
      enum: ["simple", "list"],
    },
    hasCustomFileEndings: {
      title: "Has custom file endings",
      description:
        "Boolean value indicating if the component has valid file endings",
      type: "boolean",
    },
    validFileEndings: {
      title: "Valid file endings",
      description:
        "A separated string of valid file endings to upload. If not set all endings are accepted.",
      type: "string",
      examples: ["csv", "doc", "docx", "gif", "jpeg", "pdf", "txt"],
    },
  },
  required: [
    "displayMode",
    "maxFileSizeInMB",
    "maxNumberOfAttachments",
    "minNumberOfAttachments",
  ],
};
const schema35 = {
  properties: {
    image: {
      type: "object",
      title: "Image properties",
      description: "Set of options for image field.",
      properties: {
        src: {
          title: "Image source",
          description: "",
          type: "object",
          properties: {
            nb: { type: "string", title: "Bokmål" },
            nn: { type: "string", title: "Nynorsk" },
            en: { type: "string", title: "English" },
          },
          additionalProperties: true,
        },
        width: { type: "string", title: "Image width", examples: ["100%"] },
        align: {
          type: "string",
          title: "Align image",
          enum: [
            "flex-start",
            "center",
            "flex-end",
            "space-between",
            "space-around",
            "space-evenly",
          ],
        },
      },
    },
  },
};
const schema39 = {
  properties: {
    mapping: {
      type: "object",
      title: "Mapping",
      description:
        "Creates a new app instance with data collected from a stateless part of the app.",
      examples: [{ "some.source.field": "key1", "some.other.source": "key2" }],
      additionalProperties: { type: "string" },
    },
  },
};
const schema40 = {
  properties: {
    showBackButton: {
      type: "boolean",
      title: "Show back button",
      description: "Shows two buttons (back/next) instead of just 'next'.",
    },
  },
};
const schema41 = {
  properties: {
    componentRef: {
      type: "string",
      title: "Component reference",
      description:
        "String value indicating which layout component (by ID) the summary is for.",
    },
    pageRef: {
      type: "string",
      title: "Page reference",
      description:
        "String value indicating which layout page the referenced component is defined on.",
    },
  },
};
const schema42 = {
  properties: {
    size: {
      title: "Header size",
      description: "'L'=<h2>, 'M'=<h3>, 'S'=<h4>",
      type: "string",
      enum: ["L", "M", "S", "h2", "h3", "h4"],
    },
  },
  required: ["size"],
};
const schema43 = {
  title: "Triggers",
  description:
    "An array of actions that should be triggered when data connected to this component changes.",
  type: "array",
  items: {
    type: "string",
    enum: [
      "validation",
      "validatePage",
      "validateAllPages",
      "calculatePageOrder",
    ],
  },
};
const schema28 = {
  properties: {
    optionsId: {
      type: "string",
      title: "Options ID",
      description: "Reference to connected options by id.",
    },
    options: {
      type: "array",
      title: "Options",
      description: "An array of options. Only relevant if no optionsId is set.",
      items: { $ref: "#/definitions/options" },
    },
    preselectedOptionIndex: {
      type: "integer",
      title: "Preselected option index",
      description: "Sets a preselected index.",
      minimum: 0,
    },
  },
};
const schema29 = {
  properties: {
    label: {
      type: "string",
      title: "Label",
      description:
        "The option label. Can be plain text or a text resource binding.",
    },
    value: { type: "string", title: "Value", description: "The option value." },
  },
  required: ["label", "value"],
};
function validate24(
  data,
  { instancePath = "", parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.optionsId !== undefined) {
      const _errs0 = errors;
      if (typeof data.optionsId !== "string") {
        validate24.errors = [
          {
            instancePath: instancePath + "/optionsId",
            schemaPath: "#/properties/optionsId/type",
            keyword: "type",
            params: { type: "string" },
            message: "must be string",
          },
        ];
        return false;
      }
      var valid0 = _errs0 === errors;
    } else {
      var valid0 = true;
    }
    if (valid0) {
      if (data.options !== undefined) {
        let data1 = data.options;
        const _errs2 = errors;
        if (errors === _errs2) {
          if (Array.isArray(data1)) {
            var valid1 = true;
            const len0 = data1.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data2 = data1[i0];
              const _errs4 = errors;
              if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
                let missing0;
                if (
                  (data2.label === undefined && (missing0 = "label")) ||
                  (data2.value === undefined && (missing0 = "value"))
                ) {
                  validate24.errors = [
                    {
                      instancePath: instancePath + "/options/" + i0,
                      schemaPath: "#/definitions/options/required",
                      keyword: "required",
                      params: { missingProperty: missing0 },
                      message: "must have required property '" + missing0 + "'",
                    },
                  ];
                  return false;
                } else {
                  if (data2.label !== undefined) {
                    const _errs6 = errors;
                    if (typeof data2.label !== "string") {
                      validate24.errors = [
                        {
                          instancePath:
                            instancePath + "/options/" + i0 + "/label",
                          schemaPath:
                            "#/definitions/options/properties/label/type",
                          keyword: "type",
                          params: { type: "string" },
                          message: "must be string",
                        },
                      ];
                      return false;
                    }
                    var valid3 = _errs6 === errors;
                  } else {
                    var valid3 = true;
                  }
                  if (valid3) {
                    if (data2.value !== undefined) {
                      const _errs8 = errors;
                      if (typeof data2.value !== "string") {
                        validate24.errors = [
                          {
                            instancePath:
                              instancePath + "/options/" + i0 + "/value",
                            schemaPath:
                              "#/definitions/options/properties/value/type",
                            keyword: "type",
                            params: { type: "string" },
                            message: "must be string",
                          },
                        ];
                        return false;
                      }
                      var valid3 = _errs8 === errors;
                    } else {
                      var valid3 = true;
                    }
                  }
                }
              }
              var valid1 = _errs4 === errors;
              if (!valid1) {
                break;
              }
            }
          } else {
            validate24.errors = [
              {
                instancePath: instancePath + "/options",
                schemaPath: "#/properties/options/type",
                keyword: "type",
                params: { type: "array" },
                message: "must be array",
              },
            ];
            return false;
          }
        }
        var valid0 = _errs2 === errors;
      } else {
        var valid0 = true;
      }
      if (valid0) {
        if (data.preselectedOptionIndex !== undefined) {
          let data5 = data.preselectedOptionIndex;
          const _errs10 = errors;
          if (
            !(
              typeof data5 == "number" &&
              !(data5 % 1) &&
              !isNaN(data5) &&
              isFinite(data5)
            )
          ) {
            validate24.errors = [
              {
                instancePath: instancePath + "/preselectedOptionIndex",
                schemaPath: "#/properties/preselectedOptionIndex/type",
                keyword: "type",
                params: { type: "integer" },
                message: "must be integer",
              },
            ];
            return false;
          }
          if (errors === _errs10) {
            if (typeof data5 == "number" && isFinite(data5)) {
              if (data5 < 0 || isNaN(data5)) {
                validate24.errors = [
                  {
                    instancePath: instancePath + "/preselectedOptionIndex",
                    schemaPath: "#/properties/preselectedOptionIndex/minimum",
                    keyword: "minimum",
                    params: { comparison: ">=", limit: 0 },
                    message: "must be >= 0",
                  },
                ];
                return false;
              }
            }
          }
          var valid0 = _errs10 === errors;
        } else {
          var valid0 = true;
        }
      }
    }
  }
  validate24.errors = vErrors;
  return errors === 0;
}
const schema32 = {
  properties: {
    children: {
      title: "Children",
      description:
        'An array of the "id" of child components belonging to the group.',
      type: "array",
      items: { type: "string" },
      uniqueItems: true,
    },
    edit: {
      title: "Edit",
      description: "Alternatives for edit view of repeating group",
      $ref: "#/definitions/groupEditOptions",
    },
    maxCount: {
      type: "integer",
      title: "Maximum count",
      description:
        "The maximum number of iterations of a group. Only relevant if group is repeating.",
      minimum: 0,
    },
    tableHeaders: {
      title: "Table Headers",
      description:
        "An array of the id of child components that should be included as table headers. If not defined all components are shown.",
      type: "array",
      items: { type: "string" },
      uniqueItems: true,
    },
  },
  required: ["children"],
};
const schema33 = {
  properties: {
    mode: {
      title: "Edit mode",
      description:
        "Mode for how repeating group table is displayed in edit mode",
      type: "string",
      enum: ["hideTable", "showAll", "showTable"],
    },
    filter: {
      title: "Filter",
      description: "Conditions for filtering visible items in repeating group",
      type: "array",
      items: { $ref: "#/definitions/groupFilterItem" },
    },
    saveButton: {
      title: "Save button",
      description:
        "Boolean value indicating whether save button should be shown or not in edit mode of repeating group item.",
      type: "boolean",
    },
    deleteButton: {
      title: "Delete button",
      description:
        "Boolean value indicating whether delete button should be shown or not in edit mode of repeating group item.",
      type: "boolean",
    },
    multiPage: {
      title: "Multi-page",
      description:
        "Boolean value indicating if form components in edit mode should be shown over multiple pages/views.",
      type: "boolean",
    },
    addButton: {
      title: "Add button",
      description:
        "Boolean value indicating whether add new button should be shown or not under the table.",
      type: "boolean",
    },
  },
};
const schema34 = {
  properties: {
    key: {
      title: "Key",
      description: "Key representing field in data model to check.",
      type: "string",
    },
    value: {
      title: "Value",
      description: "Value to check against.",
      type: "string",
    },
  },
};
const func0 = require("ajv/dist/runtime/equal").default;
function validate28(
  data,
  { instancePath = "", parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.mode !== undefined) {
      let data0 = data.mode;
      const _errs0 = errors;
      if (typeof data0 !== "string") {
        validate28.errors = [
          {
            instancePath: instancePath + "/mode",
            schemaPath: "#/properties/mode/type",
            keyword: "type",
            params: { type: "string" },
            message: "must be string",
          },
        ];
        return false;
      }
      if (
        !(data0 === "hideTable" || data0 === "showAll" || data0 === "showTable")
      ) {
        validate28.errors = [
          {
            instancePath: instancePath + "/mode",
            schemaPath: "#/properties/mode/enum",
            keyword: "enum",
            params: { allowedValues: schema33.properties.mode.enum },
            message: "must be equal to one of the allowed values",
          },
        ];
        return false;
      }
      var valid0 = _errs0 === errors;
    } else {
      var valid0 = true;
    }
    if (valid0) {
      if (data.filter !== undefined) {
        let data1 = data.filter;
        const _errs2 = errors;
        if (errors === _errs2) {
          if (Array.isArray(data1)) {
            var valid1 = true;
            const len0 = data1.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data2 = data1[i0];
              const _errs4 = errors;
              if (data2 && typeof data2 == "object" && !Array.isArray(data2)) {
                if (data2.key !== undefined) {
                  const _errs6 = errors;
                  if (typeof data2.key !== "string") {
                    validate28.errors = [
                      {
                        instancePath: instancePath + "/filter/" + i0 + "/key",
                        schemaPath:
                          "#/definitions/groupFilterItem/properties/key/type",
                        keyword: "type",
                        params: { type: "string" },
                        message: "must be string",
                      },
                    ];
                    return false;
                  }
                  var valid3 = _errs6 === errors;
                } else {
                  var valid3 = true;
                }
                if (valid3) {
                  if (data2.value !== undefined) {
                    const _errs8 = errors;
                    if (typeof data2.value !== "string") {
                      validate28.errors = [
                        {
                          instancePath:
                            instancePath + "/filter/" + i0 + "/value",
                          schemaPath:
                            "#/definitions/groupFilterItem/properties/value/type",
                          keyword: "type",
                          params: { type: "string" },
                          message: "must be string",
                        },
                      ];
                      return false;
                    }
                    var valid3 = _errs8 === errors;
                  } else {
                    var valid3 = true;
                  }
                }
              }
              var valid1 = _errs4 === errors;
              if (!valid1) {
                break;
              }
            }
          } else {
            validate28.errors = [
              {
                instancePath: instancePath + "/filter",
                schemaPath: "#/properties/filter/type",
                keyword: "type",
                params: { type: "array" },
                message: "must be array",
              },
            ];
            return false;
          }
        }
        var valid0 = _errs2 === errors;
      } else {
        var valid0 = true;
      }
      if (valid0) {
        if (data.saveButton !== undefined) {
          const _errs10 = errors;
          if (typeof data.saveButton !== "boolean") {
            validate28.errors = [
              {
                instancePath: instancePath + "/saveButton",
                schemaPath: "#/properties/saveButton/type",
                keyword: "type",
                params: { type: "boolean" },
                message: "must be boolean",
              },
            ];
            return false;
          }
          var valid0 = _errs10 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.deleteButton !== undefined) {
            const _errs12 = errors;
            if (typeof data.deleteButton !== "boolean") {
              validate28.errors = [
                {
                  instancePath: instancePath + "/deleteButton",
                  schemaPath: "#/properties/deleteButton/type",
                  keyword: "type",
                  params: { type: "boolean" },
                  message: "must be boolean",
                },
              ];
              return false;
            }
            var valid0 = _errs12 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.multiPage !== undefined) {
              const _errs14 = errors;
              if (typeof data.multiPage !== "boolean") {
                validate28.errors = [
                  {
                    instancePath: instancePath + "/multiPage",
                    schemaPath: "#/properties/multiPage/type",
                    keyword: "type",
                    params: { type: "boolean" },
                    message: "must be boolean",
                  },
                ];
                return false;
              }
              var valid0 = _errs14 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.addButton !== undefined) {
                const _errs16 = errors;
                if (typeof data.addButton !== "boolean") {
                  validate28.errors = [
                    {
                      instancePath: instancePath + "/addButton",
                      schemaPath: "#/properties/addButton/type",
                      keyword: "type",
                      params: { type: "boolean" },
                      message: "must be boolean",
                    },
                  ];
                  return false;
                }
                var valid0 = _errs16 === errors;
              } else {
                var valid0 = true;
              }
            }
          }
        }
      }
    }
  }
  validate28.errors = vErrors;
  return errors === 0;
}
function validate27(
  data,
  { instancePath = "", parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    let missing0;
    if (data.children === undefined && (missing0 = "children")) {
      validate27.errors = [
        {
          instancePath,
          schemaPath: "#/required",
          keyword: "required",
          params: { missingProperty: missing0 },
          message: "must have required property '" + missing0 + "'",
        },
      ];
      return false;
    } else {
      if (data.children !== undefined) {
        let data0 = data.children;
        const _errs0 = errors;
        if (errors === _errs0) {
          if (Array.isArray(data0)) {
            var valid1 = true;
            const len0 = data0.length;
            for (let i0 = 0; i0 < len0; i0++) {
              const _errs2 = errors;
              if (typeof data0[i0] !== "string") {
                validate27.errors = [
                  {
                    instancePath: instancePath + "/children/" + i0,
                    schemaPath: "#/properties/children/items/type",
                    keyword: "type",
                    params: { type: "string" },
                    message: "must be string",
                  },
                ];
                return false;
              }
              var valid1 = _errs2 === errors;
              if (!valid1) {
                break;
              }
            }
            if (valid1) {
              let i1 = data0.length;
              let j0;
              if (i1 > 1) {
                const indices0 = {};
                for (; i1--; ) {
                  let item0 = data0[i1];
                  if (typeof item0 !== "string") {
                    continue;
                  }
                  if (typeof indices0[item0] == "number") {
                    j0 = indices0[item0];
                    validate27.errors = [
                      {
                        instancePath: instancePath + "/children",
                        schemaPath: "#/properties/children/uniqueItems",
                        keyword: "uniqueItems",
                        params: { i: i1, j: j0 },
                        message:
                          "must NOT have duplicate items (items ## " +
                          j0 +
                          " and " +
                          i1 +
                          " are identical)",
                      },
                    ];
                    return false;
                    break;
                  }
                  indices0[item0] = i1;
                }
              }
            }
          } else {
            validate27.errors = [
              {
                instancePath: instancePath + "/children",
                schemaPath: "#/properties/children/type",
                keyword: "type",
                params: { type: "array" },
                message: "must be array",
              },
            ];
            return false;
          }
        }
        var valid0 = _errs0 === errors;
      } else {
        var valid0 = true;
      }
      if (valid0) {
        if (data.edit !== undefined) {
          const _errs4 = errors;
          if (
            !validate28(data.edit, {
              instancePath: instancePath + "/edit",
              parentData: data,
              parentDataProperty: "edit",
              rootData,
            })
          ) {
            vErrors =
              vErrors === null
                ? validate28.errors
                : vErrors.concat(validate28.errors);
            errors = vErrors.length;
          }
          var valid0 = _errs4 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.maxCount !== undefined) {
            let data3 = data.maxCount;
            const _errs5 = errors;
            if (
              !(
                typeof data3 == "number" &&
                !(data3 % 1) &&
                !isNaN(data3) &&
                isFinite(data3)
              )
            ) {
              validate27.errors = [
                {
                  instancePath: instancePath + "/maxCount",
                  schemaPath: "#/properties/maxCount/type",
                  keyword: "type",
                  params: { type: "integer" },
                  message: "must be integer",
                },
              ];
              return false;
            }
            if (errors === _errs5) {
              if (typeof data3 == "number" && isFinite(data3)) {
                if (data3 < 0 || isNaN(data3)) {
                  validate27.errors = [
                    {
                      instancePath: instancePath + "/maxCount",
                      schemaPath: "#/properties/maxCount/minimum",
                      keyword: "minimum",
                      params: { comparison: ">=", limit: 0 },
                      message: "must be >= 0",
                    },
                  ];
                  return false;
                }
              }
            }
            var valid0 = _errs5 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.tableHeaders !== undefined) {
              let data4 = data.tableHeaders;
              const _errs7 = errors;
              if (errors === _errs7) {
                if (Array.isArray(data4)) {
                  var valid3 = true;
                  const len1 = data4.length;
                  for (let i2 = 0; i2 < len1; i2++) {
                    const _errs9 = errors;
                    if (typeof data4[i2] !== "string") {
                      validate27.errors = [
                        {
                          instancePath: instancePath + "/tableHeaders/" + i2,
                          schemaPath: "#/properties/tableHeaders/items/type",
                          keyword: "type",
                          params: { type: "string" },
                          message: "must be string",
                        },
                      ];
                      return false;
                    }
                    var valid3 = _errs9 === errors;
                    if (!valid3) {
                      break;
                    }
                  }
                  if (valid3) {
                    let i3 = data4.length;
                    let j1;
                    if (i3 > 1) {
                      const indices1 = {};
                      for (; i3--; ) {
                        let item1 = data4[i3];
                        if (typeof item1 !== "string") {
                          continue;
                        }
                        if (typeof indices1[item1] == "number") {
                          j1 = indices1[item1];
                          validate27.errors = [
                            {
                              instancePath: instancePath + "/tableHeaders",
                              schemaPath:
                                "#/properties/tableHeaders/uniqueItems",
                              keyword: "uniqueItems",
                              params: { i: i3, j: j1 },
                              message:
                                "must NOT have duplicate items (items ## " +
                                j1 +
                                " and " +
                                i3 +
                                " are identical)",
                            },
                          ];
                          return false;
                          break;
                        }
                        indices1[item1] = i3;
                      }
                    }
                  }
                } else {
                  validate27.errors = [
                    {
                      instancePath: instancePath + "/tableHeaders",
                      schemaPath: "#/properties/tableHeaders/type",
                      keyword: "type",
                      params: { type: "array" },
                      message: "must be array",
                    },
                  ];
                  return false;
                }
              }
              var valid0 = _errs7 === errors;
            } else {
              var valid0 = true;
            }
          }
        }
      }
    }
  }
  validate27.errors = vErrors;
  return errors === 0;
}
const schema36 = {
  properties: {
    formatting: {
      title: "Input formatting",
      description: "Set of options for formatting input fields.",
      $ref: "#/definitions/inputFormatting",
    },
  },
};
const schema37 = {
  properties: {
    number: {
      $ref: "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json",
    },
    align: {
      type: "string",
      title: "Align input",
      description:
        "The alignment for Input field (eg. right aligning a series of numbers)",
      enum: ["left", "center", "right"],
    },
  },
};
const schema38 = {
  $id: "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Input number formatting",
  description:
    "Schema that describes the options that can be configured for number formatting on an `input` component, based on react-number-format package. For complete list of available options, see https://github.com/s-yadav/react-number-format#props",
  type: "object",
  additionalProperties: true,
  properties: {
    allowedDecimalSeparators: {
      title: "Allowed decimal separators",
      description:
        "Characters which when pressed result in a decimal separator. When missing, decimalSeparator and '.' are used",
      type: "array",
      items: { type: "string", maxLength: 1 },
      examples: [[",", ".", "/"]],
    },
    allowEmptyFormatting: {
      title: "Allow empty formatting",
      description: "Apply formatting to empty inputs",
      type: "boolean",
      default: false,
    },
    allowLeadingZeros: {
      title: "Allow leading zeros",
      description: "Allow leading zeros at beginning of number",
      type: "boolean",
      default: false,
    },
    allowNegative: {
      title: "Allow negative",
      description:
        "Allow negative numbers (Only when format option is not provided)",
      type: "boolean",
      default: true,
    },
    decimalScale: {
      title: "Decimal scale",
      description: "If defined it limits to given decimal scale.",
      type: "number",
      examples: [1, 2, 3],
    },
    decimalSeparator: {
      title: "Decimal separator",
      description:
        "Support decimal point on a number. Single character string.",
      type: "string",
      maxLength: 1,
      default: ".",
    },
    fixedDecimalScale: {
      title: "Fixed decimal scale",
      description:
        "Used together with decimalScale. If true it adds 0s to match given decimal scale.",
      type: "boolean",
      default: false,
    },
    format: {
      title: "Format",
      description:
        "Format given as hash string, to allow number input in place of hash.",
      type: "string",
      examples: ["### ### ###", "+47 ### ## ###", "##-##-##-##"],
    },
    mask: {
      title: "Mask",
      description: "Mask to show in place of non-entered values",
      type: "string",
      examples: ["_"],
      default: " ",
    },
    prefix: {
      title: "Prefix",
      description: "Add a prefix before the number",
      type: "string",
      examples: ["$", "kr", "-", "(+47) "],
    },
    suffix: {
      title: "Suffix",
      description: "Add a suffix after the number",
      type: "string",
      examples: ["%", "kr", "kg"],
    },
    thousandSeparator: {
      title: "Thousand separator",
      description:
        "Add thousand separators on number. Single character string or boolean true (true is default to ,)",
      type: ["string", "boolean"],
      maxLength: 1,
      examples: [true, ",", "."],
    },
  },
  allOf: [
    {
      if: {
        properties: { fixedDecimalScale: { const: true } },
        required: ["fixedDecimalScale"],
      },
      then: { required: ["decimalScale"] },
    },
  ],
};
const func11 = require("ajv/dist/runtime/ucs2length").default;
function validate32(
  data,
  { instancePath = "", parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.number !== undefined) {
      let data0 = data.number;
      const _errs0 = errors;
      const _errs1 = errors;
      const _errs4 = errors;
      let valid3 = true;
      const _errs5 = errors;
      if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
        let missing0;
        if (
          data0.fixedDecimalScale === undefined &&
          (missing0 = "fixedDecimalScale")
        ) {
          const err0 = {};
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        } else {
          if (data0.fixedDecimalScale !== undefined) {
            if (true !== data0.fixedDecimalScale) {
              const err1 = {};
              if (vErrors === null) {
                vErrors = [err1];
              } else {
                vErrors.push(err1);
              }
              errors++;
            }
          }
        }
      }
      var _valid0 = _errs5 === errors;
      errors = _errs4;
      if (vErrors !== null) {
        if (_errs4) {
          vErrors.length = _errs4;
        } else {
          vErrors = null;
        }
      }
      if (_valid0) {
        const _errs7 = errors;
        if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
          let missing1;
          if (data0.decimalScale === undefined && (missing1 = "decimalScale")) {
            validate32.errors = [
              {
                instancePath: instancePath + "/number",
                schemaPath:
                  "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/allOf/0/then/required",
                keyword: "required",
                params: { missingProperty: missing1 },
                message: "must have required property '" + missing1 + "'",
              },
            ];
            return false;
          }
        }
        var _valid0 = _errs7 === errors;
        valid3 = _valid0;
      }
      if (!valid3) {
        const err2 = {
          instancePath: instancePath + "/number",
          schemaPath:
            "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/allOf/0/if",
          keyword: "if",
          params: { failingKeyword: "then" },
          message: 'must match "then" schema',
        };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
        validate32.errors = vErrors;
        return false;
      }
      if (errors === _errs1) {
        if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
          if (data0.allowedDecimalSeparators !== undefined) {
            let data2 = data0.allowedDecimalSeparators;
            const _errs9 = errors;
            if (errors === _errs9) {
              if (Array.isArray(data2)) {
                var valid6 = true;
                const len0 = data2.length;
                for (let i0 = 0; i0 < len0; i0++) {
                  let data3 = data2[i0];
                  const _errs11 = errors;
                  if (errors === _errs11) {
                    if (typeof data3 === "string") {
                      if (func11(data3) > 1) {
                        validate32.errors = [
                          {
                            instancePath:
                              instancePath +
                              "/number/allowedDecimalSeparators/" +
                              i0,
                            schemaPath:
                              "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/allowedDecimalSeparators/items/maxLength",
                            keyword: "maxLength",
                            params: { limit: 1 },
                            message: "must NOT have more than 1 characters",
                          },
                        ];
                        return false;
                      }
                    } else {
                      validate32.errors = [
                        {
                          instancePath:
                            instancePath +
                            "/number/allowedDecimalSeparators/" +
                            i0,
                          schemaPath:
                            "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/allowedDecimalSeparators/items/type",
                          keyword: "type",
                          params: { type: "string" },
                          message: "must be string",
                        },
                      ];
                      return false;
                    }
                  }
                  var valid6 = _errs11 === errors;
                  if (!valid6) {
                    break;
                  }
                }
              } else {
                validate32.errors = [
                  {
                    instancePath:
                      instancePath + "/number/allowedDecimalSeparators",
                    schemaPath:
                      "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/allowedDecimalSeparators/type",
                    keyword: "type",
                    params: { type: "array" },
                    message: "must be array",
                  },
                ];
                return false;
              }
            }
            var valid5 = _errs9 === errors;
          } else {
            var valid5 = true;
          }
          if (valid5) {
            if (data0.allowEmptyFormatting !== undefined) {
              const _errs13 = errors;
              if (typeof data0.allowEmptyFormatting !== "boolean") {
                validate32.errors = [
                  {
                    instancePath: instancePath + "/number/allowEmptyFormatting",
                    schemaPath:
                      "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/allowEmptyFormatting/type",
                    keyword: "type",
                    params: { type: "boolean" },
                    message: "must be boolean",
                  },
                ];
                return false;
              }
              var valid5 = _errs13 === errors;
            } else {
              var valid5 = true;
            }
            if (valid5) {
              if (data0.allowLeadingZeros !== undefined) {
                const _errs15 = errors;
                if (typeof data0.allowLeadingZeros !== "boolean") {
                  validate32.errors = [
                    {
                      instancePath: instancePath + "/number/allowLeadingZeros",
                      schemaPath:
                        "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/allowLeadingZeros/type",
                      keyword: "type",
                      params: { type: "boolean" },
                      message: "must be boolean",
                    },
                  ];
                  return false;
                }
                var valid5 = _errs15 === errors;
              } else {
                var valid5 = true;
              }
              if (valid5) {
                if (data0.allowNegative !== undefined) {
                  const _errs17 = errors;
                  if (typeof data0.allowNegative !== "boolean") {
                    validate32.errors = [
                      {
                        instancePath: instancePath + "/number/allowNegative",
                        schemaPath:
                          "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/allowNegative/type",
                        keyword: "type",
                        params: { type: "boolean" },
                        message: "must be boolean",
                      },
                    ];
                    return false;
                  }
                  var valid5 = _errs17 === errors;
                } else {
                  var valid5 = true;
                }
                if (valid5) {
                  if (data0.decimalScale !== undefined) {
                    let data7 = data0.decimalScale;
                    const _errs19 = errors;
                    if (!(typeof data7 == "number" && isFinite(data7))) {
                      validate32.errors = [
                        {
                          instancePath: instancePath + "/number/decimalScale",
                          schemaPath:
                            "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/decimalScale/type",
                          keyword: "type",
                          params: { type: "number" },
                          message: "must be number",
                        },
                      ];
                      return false;
                    }
                    var valid5 = _errs19 === errors;
                  } else {
                    var valid5 = true;
                  }
                  if (valid5) {
                    if (data0.decimalSeparator !== undefined) {
                      let data8 = data0.decimalSeparator;
                      const _errs21 = errors;
                      if (errors === _errs21) {
                        if (typeof data8 === "string") {
                          if (func11(data8) > 1) {
                            validate32.errors = [
                              {
                                instancePath:
                                  instancePath + "/number/decimalSeparator",
                                schemaPath:
                                  "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/decimalSeparator/maxLength",
                                keyword: "maxLength",
                                params: { limit: 1 },
                                message: "must NOT have more than 1 characters",
                              },
                            ];
                            return false;
                          }
                        } else {
                          validate32.errors = [
                            {
                              instancePath:
                                instancePath + "/number/decimalSeparator",
                              schemaPath:
                                "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/decimalSeparator/type",
                              keyword: "type",
                              params: { type: "string" },
                              message: "must be string",
                            },
                          ];
                          return false;
                        }
                      }
                      var valid5 = _errs21 === errors;
                    } else {
                      var valid5 = true;
                    }
                    if (valid5) {
                      if (data0.fixedDecimalScale !== undefined) {
                        const _errs23 = errors;
                        if (typeof data0.fixedDecimalScale !== "boolean") {
                          validate32.errors = [
                            {
                              instancePath:
                                instancePath + "/number/fixedDecimalScale",
                              schemaPath:
                                "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/fixedDecimalScale/type",
                              keyword: "type",
                              params: { type: "boolean" },
                              message: "must be boolean",
                            },
                          ];
                          return false;
                        }
                        var valid5 = _errs23 === errors;
                      } else {
                        var valid5 = true;
                      }
                      if (valid5) {
                        if (data0.format !== undefined) {
                          const _errs25 = errors;
                          if (typeof data0.format !== "string") {
                            validate32.errors = [
                              {
                                instancePath: instancePath + "/number/format",
                                schemaPath:
                                  "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/format/type",
                                keyword: "type",
                                params: { type: "string" },
                                message: "must be string",
                              },
                            ];
                            return false;
                          }
                          var valid5 = _errs25 === errors;
                        } else {
                          var valid5 = true;
                        }
                        if (valid5) {
                          if (data0.mask !== undefined) {
                            const _errs27 = errors;
                            if (typeof data0.mask !== "string") {
                              validate32.errors = [
                                {
                                  instancePath: instancePath + "/number/mask",
                                  schemaPath:
                                    "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/mask/type",
                                  keyword: "type",
                                  params: { type: "string" },
                                  message: "must be string",
                                },
                              ];
                              return false;
                            }
                            var valid5 = _errs27 === errors;
                          } else {
                            var valid5 = true;
                          }
                          if (valid5) {
                            if (data0.prefix !== undefined) {
                              const _errs29 = errors;
                              if (typeof data0.prefix !== "string") {
                                validate32.errors = [
                                  {
                                    instancePath:
                                      instancePath + "/number/prefix",
                                    schemaPath:
                                      "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/prefix/type",
                                    keyword: "type",
                                    params: { type: "string" },
                                    message: "must be string",
                                  },
                                ];
                                return false;
                              }
                              var valid5 = _errs29 === errors;
                            } else {
                              var valid5 = true;
                            }
                            if (valid5) {
                              if (data0.suffix !== undefined) {
                                const _errs31 = errors;
                                if (typeof data0.suffix !== "string") {
                                  validate32.errors = [
                                    {
                                      instancePath:
                                        instancePath + "/number/suffix",
                                      schemaPath:
                                        "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/suffix/type",
                                      keyword: "type",
                                      params: { type: "string" },
                                      message: "must be string",
                                    },
                                  ];
                                  return false;
                                }
                                var valid5 = _errs31 === errors;
                              } else {
                                var valid5 = true;
                              }
                              if (valid5) {
                                if (data0.thousandSeparator !== undefined) {
                                  let data14 = data0.thousandSeparator;
                                  const _errs33 = errors;
                                  if (
                                    typeof data14 !== "string" &&
                                    typeof data14 !== "boolean"
                                  ) {
                                    validate32.errors = [
                                      {
                                        instancePath:
                                          instancePath +
                                          "/number/thousandSeparator",
                                        schemaPath:
                                          "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/thousandSeparator/type",
                                        keyword: "type",
                                        params: {
                                          type: schema38.properties
                                            .thousandSeparator.type,
                                        },
                                        message: "must be string,boolean",
                                      },
                                    ];
                                    return false;
                                  }
                                  if (errors === _errs33) {
                                    if (typeof data14 === "string") {
                                      if (func11(data14) > 1) {
                                        validate32.errors = [
                                          {
                                            instancePath:
                                              instancePath +
                                              "/number/thousandSeparator",
                                            schemaPath:
                                              "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/properties/thousandSeparator/maxLength",
                                            keyword: "maxLength",
                                            params: { limit: 1 },
                                            message:
                                              "must NOT have more than 1 characters",
                                          },
                                        ];
                                        return false;
                                      }
                                    }
                                  }
                                  var valid5 = _errs33 === errors;
                                } else {
                                  var valid5 = true;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          validate32.errors = [
            {
              instancePath: instancePath + "/number",
              schemaPath:
                "https://altinncdn.no/schemas/json/component/number-format.schema.v1.json/type",
              keyword: "type",
              params: { type: "object" },
              message: "must be object",
            },
          ];
          return false;
        }
      }
      var valid0 = _errs0 === errors;
    } else {
      var valid0 = true;
    }
    if (valid0) {
      if (data.align !== undefined) {
        let data15 = data.align;
        const _errs35 = errors;
        if (typeof data15 !== "string") {
          validate32.errors = [
            {
              instancePath: instancePath + "/align",
              schemaPath: "#/properties/align/type",
              keyword: "type",
              params: { type: "string" },
              message: "must be string",
            },
          ];
          return false;
        }
        if (!(data15 === "left" || data15 === "center" || data15 === "right")) {
          validate32.errors = [
            {
              instancePath: instancePath + "/align",
              schemaPath: "#/properties/align/enum",
              keyword: "enum",
              params: { allowedValues: schema37.properties.align.enum },
              message: "must be equal to one of the allowed values",
            },
          ];
          return false;
        }
        var valid0 = _errs35 === errors;
      } else {
        var valid0 = true;
      }
    }
  }
  validate32.errors = vErrors;
  return errors === 0;
}
function validate31(
  data,
  { instancePath = "", parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.formatting !== undefined) {
      if (
        !validate32(data.formatting, {
          instancePath: instancePath + "/formatting",
          parentData: data,
          parentDataProperty: "formatting",
          rootData,
        })
      ) {
        vErrors =
          vErrors === null
            ? validate32.errors
            : vErrors.concat(validate32.errors);
        errors = vErrors.length;
      }
    }
  }
  validate31.errors = vErrors;
  return errors === 0;
}
const schema44 = {
  allOf: [{ $ref: "#/definitions/gridProps" }],
  properties: {
    labelGrid: {
      title: "labelGrid",
      description:
        "Optional grid for the component label. Used in combination with innerGrid to align labels on the side.",
      examples: [{ xs: 12 }],
      $ref: "#/definitions/gridProps",
    },
    innerGrid: {
      title: "innerGrid",
      description:
        "Optional grid for inner component content like input field or dropdown. Used to avoid inner content filling the component width.",
      examples: [{ xs: 12 }],
      $ref: "#/definitions/gridProps",
    },
  },
};
const schema45 = {
  properties: {
    xs: {
      $ref: "#/definitions/gridValue",
      title: "xs",
      description: "Grid breakpoint at 0px",
    },
    sm: {
      $ref: "#/definitions/gridValue",
      title: "sm",
      description: "Grid breakpoint at 600px",
    },
    md: {
      $ref: "#/definitions/gridValue",
      title: "md",
      description: "Grid breakpoint at 960px",
    },
    lg: {
      $ref: "#/definitions/gridValue",
      title: "lg",
      description: "Grid breakpoint at 1280px",
    },
    xl: {
      $ref: "#/definitions/gridValue",
      title: "xl",
      description: "Grid breakpoint at 1920px",
    },
  },
};
const schema46 = { type: "integer", maximum: 12, minimum: 1, examples: [12] };
function validate37(
  data,
  { instancePath = "", parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.xs !== undefined) {
      let data0 = data.xs;
      const _errs0 = errors;
      const _errs1 = errors;
      if (
        !(
          typeof data0 == "number" &&
          !(data0 % 1) &&
          !isNaN(data0) &&
          isFinite(data0)
        )
      ) {
        validate37.errors = [
          {
            instancePath: instancePath + "/xs",
            schemaPath: "#/definitions/gridValue/type",
            keyword: "type",
            params: { type: "integer" },
            message: "must be integer",
          },
        ];
        return false;
      }
      if (errors === _errs1) {
        if (typeof data0 == "number" && isFinite(data0)) {
          if (data0 > 12 || isNaN(data0)) {
            validate37.errors = [
              {
                instancePath: instancePath + "/xs",
                schemaPath: "#/definitions/gridValue/maximum",
                keyword: "maximum",
                params: { comparison: "<=", limit: 12 },
                message: "must be <= 12",
              },
            ];
            return false;
          } else {
            if (data0 < 1 || isNaN(data0)) {
              validate37.errors = [
                {
                  instancePath: instancePath + "/xs",
                  schemaPath: "#/definitions/gridValue/minimum",
                  keyword: "minimum",
                  params: { comparison: ">=", limit: 1 },
                  message: "must be >= 1",
                },
              ];
              return false;
            }
          }
        }
      }
      var valid0 = _errs0 === errors;
    } else {
      var valid0 = true;
    }
    if (valid0) {
      if (data.sm !== undefined) {
        let data1 = data.sm;
        const _errs3 = errors;
        const _errs4 = errors;
        if (
          !(
            typeof data1 == "number" &&
            !(data1 % 1) &&
            !isNaN(data1) &&
            isFinite(data1)
          )
        ) {
          validate37.errors = [
            {
              instancePath: instancePath + "/sm",
              schemaPath: "#/definitions/gridValue/type",
              keyword: "type",
              params: { type: "integer" },
              message: "must be integer",
            },
          ];
          return false;
        }
        if (errors === _errs4) {
          if (typeof data1 == "number" && isFinite(data1)) {
            if (data1 > 12 || isNaN(data1)) {
              validate37.errors = [
                {
                  instancePath: instancePath + "/sm",
                  schemaPath: "#/definitions/gridValue/maximum",
                  keyword: "maximum",
                  params: { comparison: "<=", limit: 12 },
                  message: "must be <= 12",
                },
              ];
              return false;
            } else {
              if (data1 < 1 || isNaN(data1)) {
                validate37.errors = [
                  {
                    instancePath: instancePath + "/sm",
                    schemaPath: "#/definitions/gridValue/minimum",
                    keyword: "minimum",
                    params: { comparison: ">=", limit: 1 },
                    message: "must be >= 1",
                  },
                ];
                return false;
              }
            }
          }
        }
        var valid0 = _errs3 === errors;
      } else {
        var valid0 = true;
      }
      if (valid0) {
        if (data.md !== undefined) {
          let data2 = data.md;
          const _errs6 = errors;
          const _errs7 = errors;
          if (
            !(
              typeof data2 == "number" &&
              !(data2 % 1) &&
              !isNaN(data2) &&
              isFinite(data2)
            )
          ) {
            validate37.errors = [
              {
                instancePath: instancePath + "/md",
                schemaPath: "#/definitions/gridValue/type",
                keyword: "type",
                params: { type: "integer" },
                message: "must be integer",
              },
            ];
            return false;
          }
          if (errors === _errs7) {
            if (typeof data2 == "number" && isFinite(data2)) {
              if (data2 > 12 || isNaN(data2)) {
                validate37.errors = [
                  {
                    instancePath: instancePath + "/md",
                    schemaPath: "#/definitions/gridValue/maximum",
                    keyword: "maximum",
                    params: { comparison: "<=", limit: 12 },
                    message: "must be <= 12",
                  },
                ];
                return false;
              } else {
                if (data2 < 1 || isNaN(data2)) {
                  validate37.errors = [
                    {
                      instancePath: instancePath + "/md",
                      schemaPath: "#/definitions/gridValue/minimum",
                      keyword: "minimum",
                      params: { comparison: ">=", limit: 1 },
                      message: "must be >= 1",
                    },
                  ];
                  return false;
                }
              }
            }
          }
          var valid0 = _errs6 === errors;
        } else {
          var valid0 = true;
        }
        if (valid0) {
          if (data.lg !== undefined) {
            let data3 = data.lg;
            const _errs9 = errors;
            const _errs10 = errors;
            if (
              !(
                typeof data3 == "number" &&
                !(data3 % 1) &&
                !isNaN(data3) &&
                isFinite(data3)
              )
            ) {
              validate37.errors = [
                {
                  instancePath: instancePath + "/lg",
                  schemaPath: "#/definitions/gridValue/type",
                  keyword: "type",
                  params: { type: "integer" },
                  message: "must be integer",
                },
              ];
              return false;
            }
            if (errors === _errs10) {
              if (typeof data3 == "number" && isFinite(data3)) {
                if (data3 > 12 || isNaN(data3)) {
                  validate37.errors = [
                    {
                      instancePath: instancePath + "/lg",
                      schemaPath: "#/definitions/gridValue/maximum",
                      keyword: "maximum",
                      params: { comparison: "<=", limit: 12 },
                      message: "must be <= 12",
                    },
                  ];
                  return false;
                } else {
                  if (data3 < 1 || isNaN(data3)) {
                    validate37.errors = [
                      {
                        instancePath: instancePath + "/lg",
                        schemaPath: "#/definitions/gridValue/minimum",
                        keyword: "minimum",
                        params: { comparison: ">=", limit: 1 },
                        message: "must be >= 1",
                      },
                    ];
                    return false;
                  }
                }
              }
            }
            var valid0 = _errs9 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.xl !== undefined) {
              let data4 = data.xl;
              const _errs12 = errors;
              const _errs13 = errors;
              if (
                !(
                  typeof data4 == "number" &&
                  !(data4 % 1) &&
                  !isNaN(data4) &&
                  isFinite(data4)
                )
              ) {
                validate37.errors = [
                  {
                    instancePath: instancePath + "/xl",
                    schemaPath: "#/definitions/gridValue/type",
                    keyword: "type",
                    params: { type: "integer" },
                    message: "must be integer",
                  },
                ];
                return false;
              }
              if (errors === _errs13) {
                if (typeof data4 == "number" && isFinite(data4)) {
                  if (data4 > 12 || isNaN(data4)) {
                    validate37.errors = [
                      {
                        instancePath: instancePath + "/xl",
                        schemaPath: "#/definitions/gridValue/maximum",
                        keyword: "maximum",
                        params: { comparison: "<=", limit: 12 },
                        message: "must be <= 12",
                      },
                    ];
                    return false;
                  } else {
                    if (data4 < 1 || isNaN(data4)) {
                      validate37.errors = [
                        {
                          instancePath: instancePath + "/xl",
                          schemaPath: "#/definitions/gridValue/minimum",
                          keyword: "minimum",
                          params: { comparison: ">=", limit: 1 },
                          message: "must be >= 1",
                        },
                      ];
                      return false;
                    }
                  }
                }
              }
              var valid0 = _errs12 === errors;
            } else {
              var valid0 = true;
            }
          }
        }
      }
    }
  }
  validate37.errors = vErrors;
  return errors === 0;
}
function validate36(
  data,
  { instancePath = "", parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  if (
    !validate37(data, {
      instancePath,
      parentData,
      parentDataProperty,
      rootData,
    })
  ) {
    vErrors =
      vErrors === null ? validate37.errors : vErrors.concat(validate37.errors);
    errors = vErrors.length;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.labelGrid !== undefined) {
        const _errs1 = errors;
        if (
          !validate37(data.labelGrid, {
            instancePath: instancePath + "/labelGrid",
            parentData: data,
            parentDataProperty: "labelGrid",
            rootData,
          })
        ) {
          vErrors =
            vErrors === null
              ? validate37.errors
              : vErrors.concat(validate37.errors);
          errors = vErrors.length;
        }
        var valid1 = _errs1 === errors;
      } else {
        var valid1 = true;
      }
      if (valid1) {
        if (data.innerGrid !== undefined) {
          const _errs2 = errors;
          if (
            !validate37(data.innerGrid, {
              instancePath: instancePath + "/innerGrid",
              parentData: data,
              parentDataProperty: "innerGrid",
              rootData,
            })
          ) {
            vErrors =
              vErrors === null
                ? validate37.errors
                : vErrors.concat(validate37.errors);
            errors = vErrors.length;
          }
          var valid1 = _errs2 === errors;
        } else {
          var valid1 = true;
        }
      }
    }
  }
  validate36.errors = vErrors;
  return errors === 0;
}
const pattern0 = new RegExp("^[0-9a-zA-Z][0-9a-zA-Z-]*[0-9a-zA-Z]$", "u");
function validate23(
  data,
  { instancePath = "", parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  const _errs1 = errors;
  const _errs2 = errors;
  let valid1 = true;
  const _errs3 = errors;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type !== undefined) {
      if ("AddressComponent" !== data.type) {
        const err0 = {};
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
  }
  var _valid0 = _errs3 === errors;
  errors = _errs2;
  if (vErrors !== null) {
    if (_errs2) {
      vErrors.length = _errs2;
    } else {
      vErrors = null;
    }
  }
  if (_valid0) {
    const _errs5 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.simplified !== undefined) {
        if (typeof data.simplified !== "boolean") {
          validate23.errors = [
            {
              instancePath: instancePath + "/simplified",
              schemaPath:
                "#/definitions/addressComponent/properties/simplified/type",
              keyword: "type",
              params: { type: "boolean" },
              message: "must be boolean",
            },
          ];
          return false;
        }
      }
    }
    var _valid0 = _errs5 === errors;
    valid1 = _valid0;
  }
  if (!valid1) {
    const err1 = {
      instancePath,
      schemaPath: "#/allOf/0/if",
      keyword: "if",
      params: { failingKeyword: "then" },
      message: 'must match "then" schema',
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
    validate23.errors = vErrors;
    return false;
  }
  var valid0 = _errs1 === errors;
  if (valid0) {
    const _errs9 = errors;
    const _errs10 = errors;
    let valid5 = true;
    const _errs11 = errors;
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.type !== undefined) {
        if ("AttachmentList" !== data.type) {
          const err2 = {};
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
      }
    }
    var _valid1 = _errs11 === errors;
    errors = _errs10;
    if (vErrors !== null) {
      if (_errs10) {
        vErrors.length = _errs10;
      } else {
        vErrors = null;
      }
    }
    if (_valid1) {
      const _errs13 = errors;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.dataTypeIds !== undefined) {
          let data3 = data.dataTypeIds;
          const _errs15 = errors;
          if (errors === _errs15) {
            if (Array.isArray(data3)) {
              var valid9 = true;
              const len0 = data3.length;
              for (let i0 = 0; i0 < len0; i0++) {
                const _errs17 = errors;
                if (typeof data3[i0] !== "string") {
                  validate23.errors = [
                    {
                      instancePath: instancePath + "/dataTypeIds/" + i0,
                      schemaPath:
                        "#/definitions/attachmentListComponent/properties/dataTypeIds/items/type",
                      keyword: "type",
                      params: { type: "string" },
                      message: "must be string",
                    },
                  ];
                  return false;
                }
                var valid9 = _errs17 === errors;
                if (!valid9) {
                  break;
                }
              }
            } else {
              validate23.errors = [
                {
                  instancePath: instancePath + "/dataTypeIds",
                  schemaPath:
                    "#/definitions/attachmentListComponent/properties/dataTypeIds/type",
                  keyword: "type",
                  params: { type: "array" },
                  message: "must be array",
                },
              ];
              return false;
            }
          }
        }
      }
      var _valid1 = _errs13 === errors;
      valid5 = _valid1;
    }
    if (!valid5) {
      const err3 = {
        instancePath,
        schemaPath: "#/allOf/1/if",
        keyword: "if",
        params: { failingKeyword: "then" },
        message: 'must match "then" schema',
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
      validate23.errors = vErrors;
      return false;
    }
    var valid0 = _errs9 === errors;
    if (valid0) {
      const _errs19 = errors;
      const _errs20 = errors;
      let valid10 = true;
      const _errs21 = errors;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.type !== undefined) {
          if ("Checkboxes" !== data.type) {
            const err4 = {};
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
      }
      var _valid2 = _errs21 === errors;
      errors = _errs20;
      if (vErrors !== null) {
        if (_errs20) {
          vErrors.length = _errs20;
        } else {
          vErrors = null;
        }
      }
      if (_valid2) {
        const _errs23 = errors;
        if (
          !validate24(data, {
            instancePath,
            parentData,
            parentDataProperty,
            rootData,
          })
        ) {
          vErrors =
            vErrors === null
              ? validate24.errors
              : vErrors.concat(validate24.errors);
          errors = vErrors.length;
        }
        var _valid2 = _errs23 === errors;
        valid10 = _valid2;
      }
      if (!valid10) {
        const err5 = {
          instancePath,
          schemaPath: "#/allOf/2/if",
          keyword: "if",
          params: { failingKeyword: "then" },
          message: 'must match "then" schema',
        };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
        validate23.errors = vErrors;
        return false;
      }
      var valid0 = _errs19 === errors;
      if (valid0) {
        const _errs24 = errors;
        const _errs25 = errors;
        let valid12 = true;
        const _errs26 = errors;
        if (data && typeof data == "object" && !Array.isArray(data)) {
          if (data.type !== undefined) {
            if ("Datepicker" !== data.type) {
              const err6 = {};
              if (vErrors === null) {
                vErrors = [err6];
              } else {
                vErrors.push(err6);
              }
              errors++;
            }
          }
        }
        var _valid3 = _errs26 === errors;
        errors = _errs25;
        if (vErrors !== null) {
          if (_errs25) {
            vErrors.length = _errs25;
          } else {
            vErrors = null;
          }
        }
        if (_valid3) {
          const _errs28 = errors;
          if (data && typeof data == "object" && !Array.isArray(data)) {
            if (data.minDate !== undefined) {
              const _errs30 = errors;
              if (typeof data.minDate !== "string") {
                validate23.errors = [
                  {
                    instancePath: instancePath + "/minDate",
                    schemaPath:
                      "#/definitions/datepickerComponent/properties/minDate/type",
                    keyword: "type",
                    params: { type: "string" },
                    message: "must be string",
                  },
                ];
                return false;
              }
              var valid15 = _errs30 === errors;
            } else {
              var valid15 = true;
            }
            if (valid15) {
              if (data.maxDate !== undefined) {
                const _errs32 = errors;
                if (typeof data.maxDate !== "string") {
                  validate23.errors = [
                    {
                      instancePath: instancePath + "/maxDate",
                      schemaPath:
                        "#/definitions/datepickerComponent/properties/maxDate/type",
                      keyword: "type",
                      params: { type: "string" },
                      message: "must be string",
                    },
                  ];
                  return false;
                }
                var valid15 = _errs32 === errors;
              } else {
                var valid15 = true;
              }
              if (valid15) {
                if (data.timeStamp !== undefined) {
                  const _errs34 = errors;
                  if (typeof data.timeStamp !== "boolean") {
                    validate23.errors = [
                      {
                        instancePath: instancePath + "/timeStamp",
                        schemaPath:
                          "#/definitions/datepickerComponent/properties/timeStamp/type",
                        keyword: "type",
                        params: { type: "boolean" },
                        message: "must be boolean",
                      },
                    ];
                    return false;
                  }
                  var valid15 = _errs34 === errors;
                } else {
                  var valid15 = true;
                }
              }
            }
          }
          var _valid3 = _errs28 === errors;
          valid12 = _valid3;
        }
        if (!valid12) {
          const err7 = {
            instancePath,
            schemaPath: "#/allOf/3/if",
            keyword: "if",
            params: { failingKeyword: "then" },
            message: 'must match "then" schema',
          };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
          validate23.errors = vErrors;
          return false;
        }
        var valid0 = _errs24 === errors;
        if (valid0) {
          const _errs36 = errors;
          const _errs37 = errors;
          let valid16 = true;
          const _errs38 = errors;
          if (data && typeof data == "object" && !Array.isArray(data)) {
            if (data.type !== undefined) {
              if ("Dropdown" !== data.type) {
                const err8 = {};
                if (vErrors === null) {
                  vErrors = [err8];
                } else {
                  vErrors.push(err8);
                }
                errors++;
              }
            }
          }
          var _valid4 = _errs38 === errors;
          errors = _errs37;
          if (vErrors !== null) {
            if (_errs37) {
              vErrors.length = _errs37;
            } else {
              vErrors = null;
            }
          }
          if (_valid4) {
            const _errs40 = errors;
            if (
              !validate24(data, {
                instancePath,
                parentData,
                parentDataProperty,
                rootData,
              })
            ) {
              vErrors =
                vErrors === null
                  ? validate24.errors
                  : vErrors.concat(validate24.errors);
              errors = vErrors.length;
            }
            var _valid4 = _errs40 === errors;
            valid16 = _valid4;
          }
          if (!valid16) {
            const err9 = {
              instancePath,
              schemaPath: "#/allOf/4/if",
              keyword: "if",
              params: { failingKeyword: "then" },
              message: 'must match "then" schema',
            };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
            validate23.errors = vErrors;
            return false;
          }
          var valid0 = _errs36 === errors;
          if (valid0) {
            const _errs41 = errors;
            const _errs42 = errors;
            let valid18 = true;
            const _errs43 = errors;
            if (data && typeof data == "object" && !Array.isArray(data)) {
              if (data.type !== undefined) {
                if ("FileUpload" !== data.type) {
                  const err10 = {};
                  if (vErrors === null) {
                    vErrors = [err10];
                  } else {
                    vErrors.push(err10);
                  }
                  errors++;
                }
              }
            }
            var _valid5 = _errs43 === errors;
            errors = _errs42;
            if (vErrors !== null) {
              if (_errs42) {
                vErrors.length = _errs42;
              } else {
                vErrors = null;
              }
            }
            if (_valid5) {
              const _errs45 = errors;
              if (data && typeof data == "object" && !Array.isArray(data)) {
                let missing0;
                if (
                  (data.displayMode === undefined &&
                    (missing0 = "displayMode")) ||
                  (data.maxFileSizeInMB === undefined &&
                    (missing0 = "maxFileSizeInMB")) ||
                  (data.maxNumberOfAttachments === undefined &&
                    (missing0 = "maxNumberOfAttachments")) ||
                  (data.minNumberOfAttachments === undefined &&
                    (missing0 = "minNumberOfAttachments"))
                ) {
                  validate23.errors = [
                    {
                      instancePath,
                      schemaPath: "#/definitions/fileUploadComponent/required",
                      keyword: "required",
                      params: { missingProperty: missing0 },
                      message: "must have required property '" + missing0 + "'",
                    },
                  ];
                  return false;
                } else {
                  if (data.maxFileSizeInMB !== undefined) {
                    let data12 = data.maxFileSizeInMB;
                    const _errs47 = errors;
                    if (
                      !(
                        typeof data12 == "number" &&
                        !(data12 % 1) &&
                        !isNaN(data12) &&
                        isFinite(data12)
                      )
                    ) {
                      validate23.errors = [
                        {
                          instancePath: instancePath + "/maxFileSizeInMB",
                          schemaPath:
                            "#/definitions/fileUploadComponent/properties/maxFileSizeInMB/type",
                          keyword: "type",
                          params: { type: "integer" },
                          message: "must be integer",
                        },
                      ];
                      return false;
                    }
                    if (errors === _errs47) {
                      if (typeof data12 == "number" && isFinite(data12)) {
                        if (data12 < 0 || isNaN(data12)) {
                          validate23.errors = [
                            {
                              instancePath: instancePath + "/maxFileSizeInMB",
                              schemaPath:
                                "#/definitions/fileUploadComponent/properties/maxFileSizeInMB/minimum",
                              keyword: "minimum",
                              params: { comparison: ">=", limit: 0 },
                              message: "must be >= 0",
                            },
                          ];
                          return false;
                        }
                      }
                    }
                    var valid21 = _errs47 === errors;
                  } else {
                    var valid21 = true;
                  }
                  if (valid21) {
                    if (data.maxNumberOfAttachments !== undefined) {
                      let data13 = data.maxNumberOfAttachments;
                      const _errs49 = errors;
                      if (
                        !(
                          typeof data13 == "number" &&
                          !(data13 % 1) &&
                          !isNaN(data13) &&
                          isFinite(data13)
                        )
                      ) {
                        validate23.errors = [
                          {
                            instancePath:
                              instancePath + "/maxNumberOfAttachments",
                            schemaPath:
                              "#/definitions/fileUploadComponent/properties/maxNumberOfAttachments/type",
                            keyword: "type",
                            params: { type: "integer" },
                            message: "must be integer",
                          },
                        ];
                        return false;
                      }
                      if (errors === _errs49) {
                        if (typeof data13 == "number" && isFinite(data13)) {
                          if (data13 < 0 || isNaN(data13)) {
                            validate23.errors = [
                              {
                                instancePath:
                                  instancePath + "/maxNumberOfAttachments",
                                schemaPath:
                                  "#/definitions/fileUploadComponent/properties/maxNumberOfAttachments/minimum",
                                keyword: "minimum",
                                params: { comparison: ">=", limit: 0 },
                                message: "must be >= 0",
                              },
                            ];
                            return false;
                          }
                        }
                      }
                      var valid21 = _errs49 === errors;
                    } else {
                      var valid21 = true;
                    }
                    if (valid21) {
                      if (data.minNumberOfAttachments !== undefined) {
                        let data14 = data.minNumberOfAttachments;
                        const _errs51 = errors;
                        if (
                          !(
                            typeof data14 == "number" &&
                            !(data14 % 1) &&
                            !isNaN(data14) &&
                            isFinite(data14)
                          )
                        ) {
                          validate23.errors = [
                            {
                              instancePath:
                                instancePath + "/minNumberOfAttachments",
                              schemaPath:
                                "#/definitions/fileUploadComponent/properties/minNumberOfAttachments/type",
                              keyword: "type",
                              params: { type: "integer" },
                              message: "must be integer",
                            },
                          ];
                          return false;
                        }
                        if (errors === _errs51) {
                          if (typeof data14 == "number" && isFinite(data14)) {
                            if (data14 < 0 || isNaN(data14)) {
                              validate23.errors = [
                                {
                                  instancePath:
                                    instancePath + "/minNumberOfAttachments",
                                  schemaPath:
                                    "#/definitions/fileUploadComponent/properties/minNumberOfAttachments/minimum",
                                  keyword: "minimum",
                                  params: { comparison: ">=", limit: 0 },
                                  message: "must be >= 0",
                                },
                              ];
                              return false;
                            }
                          }
                        }
                        var valid21 = _errs51 === errors;
                      } else {
                        var valid21 = true;
                      }
                      if (valid21) {
                        if (data.displayMode !== undefined) {
                          let data15 = data.displayMode;
                          const _errs53 = errors;
                          if (typeof data15 !== "string") {
                            validate23.errors = [
                              {
                                instancePath: instancePath + "/displayMode",
                                schemaPath:
                                  "#/definitions/fileUploadComponent/properties/displayMode/type",
                                keyword: "type",
                                params: { type: "string" },
                                message: "must be string",
                              },
                            ];
                            return false;
                          }
                          if (!(data15 === "simple" || data15 === "list")) {
                            validate23.errors = [
                              {
                                instancePath: instancePath + "/displayMode",
                                schemaPath:
                                  "#/definitions/fileUploadComponent/properties/displayMode/enum",
                                keyword: "enum",
                                params: {
                                  allowedValues:
                                    schema31.properties.displayMode.enum,
                                },
                                message:
                                  "must be equal to one of the allowed values",
                              },
                            ];
                            return false;
                          }
                          var valid21 = _errs53 === errors;
                        } else {
                          var valid21 = true;
                        }
                        if (valid21) {
                          if (data.hasCustomFileEndings !== undefined) {
                            const _errs55 = errors;
                            if (
                              typeof data.hasCustomFileEndings !== "boolean"
                            ) {
                              validate23.errors = [
                                {
                                  instancePath:
                                    instancePath + "/hasCustomFileEndings",
                                  schemaPath:
                                    "#/definitions/fileUploadComponent/properties/hasCustomFileEndings/type",
                                  keyword: "type",
                                  params: { type: "boolean" },
                                  message: "must be boolean",
                                },
                              ];
                              return false;
                            }
                            var valid21 = _errs55 === errors;
                          } else {
                            var valid21 = true;
                          }
                          if (valid21) {
                            if (data.validFileEndings !== undefined) {
                              const _errs57 = errors;
                              if (typeof data.validFileEndings !== "string") {
                                validate23.errors = [
                                  {
                                    instancePath:
                                      instancePath + "/validFileEndings",
                                    schemaPath:
                                      "#/definitions/fileUploadComponent/properties/validFileEndings/type",
                                    keyword: "type",
                                    params: { type: "string" },
                                    message: "must be string",
                                  },
                                ];
                                return false;
                              }
                              var valid21 = _errs57 === errors;
                            } else {
                              var valid21 = true;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              var _valid5 = _errs45 === errors;
              valid18 = _valid5;
            }
            if (!valid18) {
              const err11 = {
                instancePath,
                schemaPath: "#/allOf/5/if",
                keyword: "if",
                params: { failingKeyword: "then" },
                message: 'must match "then" schema',
              };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
              validate23.errors = vErrors;
              return false;
            }
            var valid0 = _errs41 === errors;
            if (valid0) {
              const _errs59 = errors;
              const _errs60 = errors;
              let valid22 = true;
              const _errs61 = errors;
              if (data && typeof data == "object" && !Array.isArray(data)) {
                if (data.type !== undefined) {
                  if ("Group" !== data.type) {
                    const err12 = {};
                    if (vErrors === null) {
                      vErrors = [err12];
                    } else {
                      vErrors.push(err12);
                    }
                    errors++;
                  }
                }
              }
              var _valid6 = _errs61 === errors;
              errors = _errs60;
              if (vErrors !== null) {
                if (_errs60) {
                  vErrors.length = _errs60;
                } else {
                  vErrors = null;
                }
              }
              if (_valid6) {
                const _errs63 = errors;
                if (
                  !validate27(data, {
                    instancePath,
                    parentData,
                    parentDataProperty,
                    rootData,
                  })
                ) {
                  vErrors =
                    vErrors === null
                      ? validate27.errors
                      : vErrors.concat(validate27.errors);
                  errors = vErrors.length;
                }
                var _valid6 = _errs63 === errors;
                valid22 = _valid6;
              }
              if (!valid22) {
                const err13 = {
                  instancePath,
                  schemaPath: "#/allOf/6/if",
                  keyword: "if",
                  params: { failingKeyword: "then" },
                  message: 'must match "then" schema',
                };
                if (vErrors === null) {
                  vErrors = [err13];
                } else {
                  vErrors.push(err13);
                }
                errors++;
                validate23.errors = vErrors;
                return false;
              }
              var valid0 = _errs59 === errors;
              if (valid0) {
                const _errs64 = errors;
                const _errs65 = errors;
                let valid24 = true;
                const _errs66 = errors;
                if (data && typeof data == "object" && !Array.isArray(data)) {
                  if (data.type !== undefined) {
                    if ("Image" !== data.type) {
                      const err14 = {};
                      if (vErrors === null) {
                        vErrors = [err14];
                      } else {
                        vErrors.push(err14);
                      }
                      errors++;
                    }
                  }
                }
                var _valid7 = _errs66 === errors;
                errors = _errs65;
                if (vErrors !== null) {
                  if (_errs65) {
                    vErrors.length = _errs65;
                  } else {
                    vErrors = null;
                  }
                }
                if (_valid7) {
                  const _errs68 = errors;
                  if (data && typeof data == "object" && !Array.isArray(data)) {
                    if (data.image !== undefined) {
                      let data20 = data.image;
                      const _errs70 = errors;
                      if (errors === _errs70) {
                        if (
                          data20 &&
                          typeof data20 == "object" &&
                          !Array.isArray(data20)
                        ) {
                          if (data20.src !== undefined) {
                            let data21 = data20.src;
                            const _errs72 = errors;
                            if (errors === _errs72) {
                              if (
                                data21 &&
                                typeof data21 == "object" &&
                                !Array.isArray(data21)
                              ) {
                                if (data21.nb !== undefined) {
                                  const _errs75 = errors;
                                  if (typeof data21.nb !== "string") {
                                    validate23.errors = [
                                      {
                                        instancePath:
                                          instancePath + "/image/src/nb",
                                        schemaPath:
                                          "#/definitions/imageComponent/properties/image/properties/src/properties/nb/type",
                                        keyword: "type",
                                        params: { type: "string" },
                                        message: "must be string",
                                      },
                                    ];
                                    return false;
                                  }
                                  var valid29 = _errs75 === errors;
                                } else {
                                  var valid29 = true;
                                }
                                if (valid29) {
                                  if (data21.nn !== undefined) {
                                    const _errs77 = errors;
                                    if (typeof data21.nn !== "string") {
                                      validate23.errors = [
                                        {
                                          instancePath:
                                            instancePath + "/image/src/nn",
                                          schemaPath:
                                            "#/definitions/imageComponent/properties/image/properties/src/properties/nn/type",
                                          keyword: "type",
                                          params: { type: "string" },
                                          message: "must be string",
                                        },
                                      ];
                                      return false;
                                    }
                                    var valid29 = _errs77 === errors;
                                  } else {
                                    var valid29 = true;
                                  }
                                  if (valid29) {
                                    if (data21.en !== undefined) {
                                      const _errs79 = errors;
                                      if (typeof data21.en !== "string") {
                                        validate23.errors = [
                                          {
                                            instancePath:
                                              instancePath + "/image/src/en",
                                            schemaPath:
                                              "#/definitions/imageComponent/properties/image/properties/src/properties/en/type",
                                            keyword: "type",
                                            params: { type: "string" },
                                            message: "must be string",
                                          },
                                        ];
                                        return false;
                                      }
                                      var valid29 = _errs79 === errors;
                                    } else {
                                      var valid29 = true;
                                    }
                                  }
                                }
                              } else {
                                validate23.errors = [
                                  {
                                    instancePath: instancePath + "/image/src",
                                    schemaPath:
                                      "#/definitions/imageComponent/properties/image/properties/src/type",
                                    keyword: "type",
                                    params: { type: "object" },
                                    message: "must be object",
                                  },
                                ];
                                return false;
                              }
                            }
                            var valid28 = _errs72 === errors;
                          } else {
                            var valid28 = true;
                          }
                          if (valid28) {
                            if (data20.width !== undefined) {
                              const _errs81 = errors;
                              if (typeof data20.width !== "string") {
                                validate23.errors = [
                                  {
                                    instancePath: instancePath + "/image/width",
                                    schemaPath:
                                      "#/definitions/imageComponent/properties/image/properties/width/type",
                                    keyword: "type",
                                    params: { type: "string" },
                                    message: "must be string",
                                  },
                                ];
                                return false;
                              }
                              var valid28 = _errs81 === errors;
                            } else {
                              var valid28 = true;
                            }
                            if (valid28) {
                              if (data20.align !== undefined) {
                                let data26 = data20.align;
                                const _errs83 = errors;
                                if (typeof data26 !== "string") {
                                  validate23.errors = [
                                    {
                                      instancePath:
                                        instancePath + "/image/align",
                                      schemaPath:
                                        "#/definitions/imageComponent/properties/image/properties/align/type",
                                      keyword: "type",
                                      params: { type: "string" },
                                      message: "must be string",
                                    },
                                  ];
                                  return false;
                                }
                                if (
                                  !(
                                    data26 === "flex-start" ||
                                    data26 === "center" ||
                                    data26 === "flex-end" ||
                                    data26 === "space-between" ||
                                    data26 === "space-around" ||
                                    data26 === "space-evenly"
                                  )
                                ) {
                                  validate23.errors = [
                                    {
                                      instancePath:
                                        instancePath + "/image/align",
                                      schemaPath:
                                        "#/definitions/imageComponent/properties/image/properties/align/enum",
                                      keyword: "enum",
                                      params: {
                                        allowedValues:
                                          schema35.properties.image.properties
                                            .align.enum,
                                      },
                                      message:
                                        "must be equal to one of the allowed values",
                                    },
                                  ];
                                  return false;
                                }
                                var valid28 = _errs83 === errors;
                              } else {
                                var valid28 = true;
                              }
                            }
                          }
                        } else {
                          validate23.errors = [
                            {
                              instancePath: instancePath + "/image",
                              schemaPath:
                                "#/definitions/imageComponent/properties/image/type",
                              keyword: "type",
                              params: { type: "object" },
                              message: "must be object",
                            },
                          ];
                          return false;
                        }
                      }
                    }
                  }
                  var _valid7 = _errs68 === errors;
                  valid24 = _valid7;
                }
                if (!valid24) {
                  const err15 = {
                    instancePath,
                    schemaPath: "#/allOf/7/if",
                    keyword: "if",
                    params: { failingKeyword: "then" },
                    message: 'must match "then" schema',
                  };
                  if (vErrors === null) {
                    vErrors = [err15];
                  } else {
                    vErrors.push(err15);
                  }
                  errors++;
                  validate23.errors = vErrors;
                  return false;
                }
                var valid0 = _errs64 === errors;
                if (valid0) {
                  const _errs85 = errors;
                  const _errs86 = errors;
                  let valid30 = true;
                  const _errs87 = errors;
                  if (data && typeof data == "object" && !Array.isArray(data)) {
                    if (data.type !== undefined) {
                      if ("Input" !== data.type) {
                        const err16 = {};
                        if (vErrors === null) {
                          vErrors = [err16];
                        } else {
                          vErrors.push(err16);
                        }
                        errors++;
                      }
                    }
                  }
                  var _valid8 = _errs87 === errors;
                  errors = _errs86;
                  if (vErrors !== null) {
                    if (_errs86) {
                      vErrors.length = _errs86;
                    } else {
                      vErrors = null;
                    }
                  }
                  if (_valid8) {
                    const _errs89 = errors;
                    if (
                      !validate31(data, {
                        instancePath,
                        parentData,
                        parentDataProperty,
                        rootData,
                      })
                    ) {
                      vErrors =
                        vErrors === null
                          ? validate31.errors
                          : vErrors.concat(validate31.errors);
                      errors = vErrors.length;
                    }
                    var _valid8 = _errs89 === errors;
                    valid30 = _valid8;
                  }
                  if (!valid30) {
                    const err17 = {
                      instancePath,
                      schemaPath: "#/allOf/8/if",
                      keyword: "if",
                      params: { failingKeyword: "then" },
                      message: 'must match "then" schema',
                    };
                    if (vErrors === null) {
                      vErrors = [err17];
                    } else {
                      vErrors.push(err17);
                    }
                    errors++;
                    validate23.errors = vErrors;
                    return false;
                  }
                  var valid0 = _errs85 === errors;
                  if (valid0) {
                    const _errs90 = errors;
                    const _errs91 = errors;
                    let valid32 = true;
                    const _errs92 = errors;
                    if (
                      data &&
                      typeof data == "object" &&
                      !Array.isArray(data)
                    ) {
                      if (data.type !== undefined) {
                        if ("InstantiationButton" !== data.type) {
                          const err18 = {};
                          if (vErrors === null) {
                            vErrors = [err18];
                          } else {
                            vErrors.push(err18);
                          }
                          errors++;
                        }
                      }
                    }
                    var _valid9 = _errs92 === errors;
                    errors = _errs91;
                    if (vErrors !== null) {
                      if (_errs91) {
                        vErrors.length = _errs91;
                      } else {
                        vErrors = null;
                      }
                    }
                    if (_valid9) {
                      const _errs94 = errors;
                      if (
                        data &&
                        typeof data == "object" &&
                        !Array.isArray(data)
                      ) {
                        if (data.mapping !== undefined) {
                          let data29 = data.mapping;
                          const _errs96 = errors;
                          if (errors === _errs96) {
                            if (
                              data29 &&
                              typeof data29 == "object" &&
                              !Array.isArray(data29)
                            ) {
                              for (const key0 in data29) {
                                const _errs99 = errors;
                                if (typeof data29[key0] !== "string") {
                                  validate23.errors = [
                                    {
                                      instancePath:
                                        instancePath +
                                        "/mapping/" +
                                        key0
                                          .replace(/~/g, "~0")
                                          .replace(/\//g, "~1"),
                                      schemaPath:
                                        "#/definitions/instantiationButtonComponent/properties/mapping/additionalProperties/type",
                                      keyword: "type",
                                      params: { type: "string" },
                                      message: "must be string",
                                    },
                                  ];
                                  return false;
                                }
                                var valid36 = _errs99 === errors;
                                if (!valid36) {
                                  break;
                                }
                              }
                            } else {
                              validate23.errors = [
                                {
                                  instancePath: instancePath + "/mapping",
                                  schemaPath:
                                    "#/definitions/instantiationButtonComponent/properties/mapping/type",
                                  keyword: "type",
                                  params: { type: "object" },
                                  message: "must be object",
                                },
                              ];
                              return false;
                            }
                          }
                        }
                      }
                      var _valid9 = _errs94 === errors;
                      valid32 = _valid9;
                    }
                    if (!valid32) {
                      const err19 = {
                        instancePath,
                        schemaPath: "#/allOf/9/if",
                        keyword: "if",
                        params: { failingKeyword: "then" },
                        message: 'must match "then" schema',
                      };
                      if (vErrors === null) {
                        vErrors = [err19];
                      } else {
                        vErrors.push(err19);
                      }
                      errors++;
                      validate23.errors = vErrors;
                      return false;
                    }
                    var valid0 = _errs90 === errors;
                    if (valid0) {
                      const _errs101 = errors;
                      const _errs102 = errors;
                      let valid37 = true;
                      const _errs103 = errors;
                      if (
                        data &&
                        typeof data == "object" &&
                        !Array.isArray(data)
                      ) {
                        if (data.type !== undefined) {
                          if ("NavigationButtons" !== data.type) {
                            const err20 = {};
                            if (vErrors === null) {
                              vErrors = [err20];
                            } else {
                              vErrors.push(err20);
                            }
                            errors++;
                          }
                        }
                      }
                      var _valid10 = _errs103 === errors;
                      errors = _errs102;
                      if (vErrors !== null) {
                        if (_errs102) {
                          vErrors.length = _errs102;
                        } else {
                          vErrors = null;
                        }
                      }
                      if (_valid10) {
                        const _errs105 = errors;
                        if (
                          data &&
                          typeof data == "object" &&
                          !Array.isArray(data)
                        ) {
                          if (data.showBackButton !== undefined) {
                            if (typeof data.showBackButton !== "boolean") {
                              validate23.errors = [
                                {
                                  instancePath:
                                    instancePath + "/showBackButton",
                                  schemaPath:
                                    "#/definitions/navigationButtonsComponent/properties/showBackButton/type",
                                  keyword: "type",
                                  params: { type: "boolean" },
                                  message: "must be boolean",
                                },
                              ];
                              return false;
                            }
                          }
                        }
                        var _valid10 = _errs105 === errors;
                        valid37 = _valid10;
                      }
                      if (!valid37) {
                        const err21 = {
                          instancePath,
                          schemaPath: "#/allOf/10/if",
                          keyword: "if",
                          params: { failingKeyword: "then" },
                          message: 'must match "then" schema',
                        };
                        if (vErrors === null) {
                          vErrors = [err21];
                        } else {
                          vErrors.push(err21);
                        }
                        errors++;
                        validate23.errors = vErrors;
                        return false;
                      }
                      var valid0 = _errs101 === errors;
                      if (valid0) {
                        const _errs109 = errors;
                        const _errs110 = errors;
                        let valid41 = true;
                        const _errs111 = errors;
                        if (
                          data &&
                          typeof data == "object" &&
                          !Array.isArray(data)
                        ) {
                          if (data.type !== undefined) {
                            if ("RadioButtons" !== data.type) {
                              const err22 = {};
                              if (vErrors === null) {
                                vErrors = [err22];
                              } else {
                                vErrors.push(err22);
                              }
                              errors++;
                            }
                          }
                        }
                        var _valid11 = _errs111 === errors;
                        errors = _errs110;
                        if (vErrors !== null) {
                          if (_errs110) {
                            vErrors.length = _errs110;
                          } else {
                            vErrors = null;
                          }
                        }
                        if (_valid11) {
                          const _errs113 = errors;
                          if (
                            !validate24(data, {
                              instancePath,
                              parentData,
                              parentDataProperty,
                              rootData,
                            })
                          ) {
                            vErrors =
                              vErrors === null
                                ? validate24.errors
                                : vErrors.concat(validate24.errors);
                            errors = vErrors.length;
                          }
                          var _valid11 = _errs113 === errors;
                          valid41 = _valid11;
                        }
                        if (!valid41) {
                          const err23 = {
                            instancePath,
                            schemaPath: "#/allOf/11/if",
                            keyword: "if",
                            params: { failingKeyword: "then" },
                            message: 'must match "then" schema',
                          };
                          if (vErrors === null) {
                            vErrors = [err23];
                          } else {
                            vErrors.push(err23);
                          }
                          errors++;
                          validate23.errors = vErrors;
                          return false;
                        }
                        var valid0 = _errs109 === errors;
                        if (valid0) {
                          const _errs114 = errors;
                          const _errs115 = errors;
                          let valid43 = true;
                          const _errs116 = errors;
                          if (
                            data &&
                            typeof data == "object" &&
                            !Array.isArray(data)
                          ) {
                            if (data.type !== undefined) {
                              if ("Summary" !== data.type) {
                                const err24 = {};
                                if (vErrors === null) {
                                  vErrors = [err24];
                                } else {
                                  vErrors.push(err24);
                                }
                                errors++;
                              }
                            }
                          }
                          var _valid12 = _errs116 === errors;
                          errors = _errs115;
                          if (vErrors !== null) {
                            if (_errs115) {
                              vErrors.length = _errs115;
                            } else {
                              vErrors = null;
                            }
                          }
                          if (_valid12) {
                            const _errs118 = errors;
                            if (
                              data &&
                              typeof data == "object" &&
                              !Array.isArray(data)
                            ) {
                              if (data.componentRef !== undefined) {
                                const _errs120 = errors;
                                if (typeof data.componentRef !== "string") {
                                  validate23.errors = [
                                    {
                                      instancePath:
                                        instancePath + "/componentRef",
                                      schemaPath:
                                        "#/definitions/summaryComponent/properties/componentRef/type",
                                      keyword: "type",
                                      params: { type: "string" },
                                      message: "must be string",
                                    },
                                  ];
                                  return false;
                                }
                                var valid46 = _errs120 === errors;
                              } else {
                                var valid46 = true;
                              }
                              if (valid46) {
                                if (data.pageRef !== undefined) {
                                  const _errs122 = errors;
                                  if (typeof data.pageRef !== "string") {
                                    validate23.errors = [
                                      {
                                        instancePath: instancePath + "/pageRef",
                                        schemaPath:
                                          "#/definitions/summaryComponent/properties/pageRef/type",
                                        keyword: "type",
                                        params: { type: "string" },
                                        message: "must be string",
                                      },
                                    ];
                                    return false;
                                  }
                                  var valid46 = _errs122 === errors;
                                } else {
                                  var valid46 = true;
                                }
                              }
                            }
                            var _valid12 = _errs118 === errors;
                            valid43 = _valid12;
                          }
                          if (!valid43) {
                            const err25 = {
                              instancePath,
                              schemaPath: "#/allOf/12/if",
                              keyword: "if",
                              params: { failingKeyword: "then" },
                              message: 'must match "then" schema',
                            };
                            if (vErrors === null) {
                              vErrors = [err25];
                            } else {
                              vErrors.push(err25);
                            }
                            errors++;
                            validate23.errors = vErrors;
                            return false;
                          }
                          var valid0 = _errs114 === errors;
                          if (valid0) {
                            const _errs124 = errors;
                            const _errs125 = errors;
                            let valid47 = true;
                            const _errs126 = errors;
                            if (
                              data &&
                              typeof data == "object" &&
                              !Array.isArray(data)
                            ) {
                              if (data.type !== undefined) {
                                if ("Header" !== data.type) {
                                  const err26 = {};
                                  if (vErrors === null) {
                                    vErrors = [err26];
                                  } else {
                                    vErrors.push(err26);
                                  }
                                  errors++;
                                }
                              }
                            }
                            var _valid13 = _errs126 === errors;
                            errors = _errs125;
                            if (vErrors !== null) {
                              if (_errs125) {
                                vErrors.length = _errs125;
                              } else {
                                vErrors = null;
                              }
                            }
                            if (_valid13) {
                              const _errs128 = errors;
                              if (
                                data &&
                                typeof data == "object" &&
                                !Array.isArray(data)
                              ) {
                                let missing1;
                                if (
                                  data.size === undefined &&
                                  (missing1 = "size")
                                ) {
                                  validate23.errors = [
                                    {
                                      instancePath,
                                      schemaPath:
                                        "#/definitions/headerComponent/required",
                                      keyword: "required",
                                      params: { missingProperty: missing1 },
                                      message:
                                        "must have required property '" +
                                        missing1 +
                                        "'",
                                    },
                                  ];
                                  return false;
                                } else {
                                  if (data.size !== undefined) {
                                    let data38 = data.size;
                                    if (typeof data38 !== "string") {
                                      validate23.errors = [
                                        {
                                          instancePath: instancePath + "/size",
                                          schemaPath:
                                            "#/definitions/headerComponent/properties/size/type",
                                          keyword: "type",
                                          params: { type: "string" },
                                          message: "must be string",
                                        },
                                      ];
                                      return false;
                                    }
                                    if (
                                      !(
                                        data38 === "L" ||
                                        data38 === "M" ||
                                        data38 === "S" ||
                                        data38 === "h2" ||
                                        data38 === "h3" ||
                                        data38 === "h4"
                                      )
                                    ) {
                                      validate23.errors = [
                                        {
                                          instancePath: instancePath + "/size",
                                          schemaPath:
                                            "#/definitions/headerComponent/properties/size/enum",
                                          keyword: "enum",
                                          params: {
                                            allowedValues:
                                              schema42.properties.size.enum,
                                          },
                                          message:
                                            "must be equal to one of the allowed values",
                                        },
                                      ];
                                      return false;
                                    }
                                  }
                                }
                              }
                              var _valid13 = _errs128 === errors;
                              valid47 = _valid13;
                            }
                            if (!valid47) {
                              const err27 = {
                                instancePath,
                                schemaPath: "#/allOf/13/if",
                                keyword: "if",
                                params: { failingKeyword: "then" },
                                message: 'must match "then" schema',
                              };
                              if (vErrors === null) {
                                vErrors = [err27];
                              } else {
                                vErrors.push(err27);
                              }
                              errors++;
                              validate23.errors = vErrors;
                              return false;
                            }
                            var valid0 = _errs124 === errors;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing2;
      if (
        (data.id === undefined && (missing2 = "id")) ||
        (data.type === undefined && (missing2 = "type"))
      ) {
        validate23.errors = [
          {
            instancePath,
            schemaPath: "#/required",
            keyword: "required",
            params: { missingProperty: missing2 },
            message: "must have required property '" + missing2 + "'",
          },
        ];
        return false;
      } else {
        if (data.id !== undefined) {
          let data39 = data.id;
          const _errs132 = errors;
          if (errors === _errs132) {
            if (typeof data39 === "string") {
              if (!pattern0.test(data39)) {
                validate23.errors = [
                  {
                    instancePath: instancePath + "/id",
                    schemaPath: "#/properties/id/pattern",
                    keyword: "pattern",
                    params: {
                      pattern: "^[0-9a-zA-Z][0-9a-zA-Z-]*[0-9a-zA-Z]$",
                    },
                    message:
                      'must match pattern "' +
                      "^[0-9a-zA-Z][0-9a-zA-Z-]*[0-9a-zA-Z]$" +
                      '"',
                  },
                ];
                return false;
              }
            } else {
              validate23.errors = [
                {
                  instancePath: instancePath + "/id",
                  schemaPath: "#/properties/id/type",
                  keyword: "type",
                  params: { type: "string" },
                  message: "must be string",
                },
              ];
              return false;
            }
          }
          var valid51 = _errs132 === errors;
        } else {
          var valid51 = true;
        }
        if (valid51) {
          if (data.type !== undefined) {
            let data40 = data.type;
            const _errs134 = errors;
            if (typeof data40 !== "string") {
              validate23.errors = [
                {
                  instancePath: instancePath + "/type",
                  schemaPath: "#/properties/type/type",
                  keyword: "type",
                  params: { type: "string" },
                  message: "must be string",
                },
              ];
              return false;
            }
            if (
              !(
                data40 === "AddressComponent" ||
                data40 === "AttachmentList" ||
                data40 === "Button" ||
                data40 === "Checkboxes" ||
                data40 === "Datepicker" ||
                data40 === "Dropdown" ||
                data40 === "FileUpload" ||
                data40 === "Group" ||
                data40 === "Header" ||
                data40 === "Image" ||
                data40 === "Input" ||
                data40 === "InstantiationButton" ||
                data40 === "NavigationButtons" ||
                data40 === "Paragraph" ||
                data40 === "RadioButtons" ||
                data40 === "Summary" ||
                data40 === "TextArea"
              )
            ) {
              validate23.errors = [
                {
                  instancePath: instancePath + "/type",
                  schemaPath: "#/properties/type/enum",
                  keyword: "enum",
                  params: { allowedValues: schema25.properties.type.enum },
                  message: "must be equal to one of the allowed values",
                },
              ];
              return false;
            }
            var valid51 = _errs134 === errors;
          } else {
            var valid51 = true;
          }
          if (valid51) {
            if (data.required !== undefined) {
              const _errs136 = errors;
              if (typeof data.required !== "boolean") {
                validate23.errors = [
                  {
                    instancePath: instancePath + "/required",
                    schemaPath: "#/properties/required/type",
                    keyword: "type",
                    params: { type: "boolean" },
                    message: "must be boolean",
                  },
                ];
                return false;
              }
              var valid51 = _errs136 === errors;
            } else {
              var valid51 = true;
            }
            if (valid51) {
              if (data.readOnly !== undefined) {
                const _errs138 = errors;
                if (typeof data.readOnly !== "boolean") {
                  validate23.errors = [
                    {
                      instancePath: instancePath + "/readOnly",
                      schemaPath: "#/properties/readOnly/type",
                      keyword: "type",
                      params: { type: "boolean" },
                      message: "must be boolean",
                    },
                  ];
                  return false;
                }
                var valid51 = _errs138 === errors;
              } else {
                var valid51 = true;
              }
              if (valid51) {
                if (data.textResourceBindings !== undefined) {
                  let data43 = data.textResourceBindings;
                  const _errs140 = errors;
                  if (errors === _errs140) {
                    if (
                      data43 &&
                      typeof data43 == "object" &&
                      !Array.isArray(data43)
                    ) {
                      for (const key1 in data43) {
                        const _errs143 = errors;
                        if (typeof data43[key1] !== "string") {
                          validate23.errors = [
                            {
                              instancePath:
                                instancePath +
                                "/textResourceBindings/" +
                                key1.replace(/~/g, "~0").replace(/\//g, "~1"),
                              schemaPath:
                                "#/properties/textResourceBindings/additionalProperties/type",
                              keyword: "type",
                              params: { type: "string" },
                              message: "must be string",
                            },
                          ];
                          return false;
                        }
                        var valid52 = _errs143 === errors;
                        if (!valid52) {
                          break;
                        }
                      }
                    } else {
                      validate23.errors = [
                        {
                          instancePath: instancePath + "/textResourceBindings",
                          schemaPath: "#/properties/textResourceBindings/type",
                          keyword: "type",
                          params: { type: "object" },
                          message: "must be object",
                        },
                      ];
                      return false;
                    }
                  }
                  var valid51 = _errs140 === errors;
                } else {
                  var valid51 = true;
                }
                if (valid51) {
                  if (data.dataModelBindings !== undefined) {
                    let data45 = data.dataModelBindings;
                    const _errs145 = errors;
                    if (errors === _errs145) {
                      if (
                        data45 &&
                        typeof data45 == "object" &&
                        !Array.isArray(data45)
                      ) {
                        for (const key2 in data45) {
                          const _errs148 = errors;
                          if (typeof data45[key2] !== "string") {
                            validate23.errors = [
                              {
                                instancePath:
                                  instancePath +
                                  "/dataModelBindings/" +
                                  key2.replace(/~/g, "~0").replace(/\//g, "~1"),
                                schemaPath:
                                  "#/properties/dataModelBindings/additionalProperties/type",
                                keyword: "type",
                                params: { type: "string" },
                                message: "must be string",
                              },
                            ];
                            return false;
                          }
                          var valid53 = _errs148 === errors;
                          if (!valid53) {
                            break;
                          }
                        }
                      } else {
                        validate23.errors = [
                          {
                            instancePath: instancePath + "/dataModelBindings",
                            schemaPath: "#/properties/dataModelBindings/type",
                            keyword: "type",
                            params: { type: "object" },
                            message: "must be object",
                          },
                        ];
                        return false;
                      }
                    }
                    var valid51 = _errs145 === errors;
                  } else {
                    var valid51 = true;
                  }
                  if (valid51) {
                    if (data.triggers !== undefined) {
                      let data47 = data.triggers;
                      const _errs150 = errors;
                      const _errs151 = errors;
                      if (errors === _errs151) {
                        if (Array.isArray(data47)) {
                          var valid55 = true;
                          const len1 = data47.length;
                          for (let i1 = 0; i1 < len1; i1++) {
                            let data48 = data47[i1];
                            const _errs153 = errors;
                            if (typeof data48 !== "string") {
                              validate23.errors = [
                                {
                                  instancePath:
                                    instancePath + "/triggers/" + i1,
                                  schemaPath:
                                    "#/definitions/triggers/items/type",
                                  keyword: "type",
                                  params: { type: "string" },
                                  message: "must be string",
                                },
                              ];
                              return false;
                            }
                            if (
                              !(
                                data48 === "validation" ||
                                data48 === "validatePage" ||
                                data48 === "validateAllPages" ||
                                data48 === "calculatePageOrder"
                              )
                            ) {
                              validate23.errors = [
                                {
                                  instancePath:
                                    instancePath + "/triggers/" + i1,
                                  schemaPath:
                                    "#/definitions/triggers/items/enum",
                                  keyword: "enum",
                                  params: {
                                    allowedValues: schema43.items.enum,
                                  },
                                  message:
                                    "must be equal to one of the allowed values",
                                },
                              ];
                              return false;
                            }
                            var valid55 = _errs153 === errors;
                            if (!valid55) {
                              break;
                            }
                          }
                        } else {
                          validate23.errors = [
                            {
                              instancePath: instancePath + "/triggers",
                              schemaPath: "#/definitions/triggers/type",
                              keyword: "type",
                              params: { type: "array" },
                              message: "must be array",
                            },
                          ];
                          return false;
                        }
                      }
                      var valid51 = _errs150 === errors;
                    } else {
                      var valid51 = true;
                    }
                    if (valid51) {
                      if (data.labelSettings !== undefined) {
                        let data49 = data.labelSettings;
                        const _errs155 = errors;
                        if (errors === _errs155) {
                          if (
                            data49 &&
                            typeof data49 == "object" &&
                            !Array.isArray(data49)
                          ) {
                            if (data49.optionalIndicator !== undefined) {
                              if (
                                typeof data49.optionalIndicator !== "boolean"
                              ) {
                                validate23.errors = [
                                  {
                                    instancePath:
                                      instancePath +
                                      "/labelSettings/optionalIndicator",
                                    schemaPath:
                                      "#/properties/labelSettings/properties/optionalIndicator/type",
                                    keyword: "type",
                                    params: { type: "boolean" },
                                    message: "must be boolean",
                                  },
                                ];
                                return false;
                              }
                            }
                          } else {
                            validate23.errors = [
                              {
                                instancePath: instancePath + "/labelSettings",
                                schemaPath: "#/properties/labelSettings/type",
                                keyword: "type",
                                params: { type: "object" },
                                message: "must be object",
                              },
                            ];
                            return false;
                          }
                        }
                        var valid51 = _errs155 === errors;
                      } else {
                        var valid51 = true;
                      }
                      if (valid51) {
                        if (data.grid !== undefined) {
                          let data51 = data.grid;
                          const _errs159 = errors;
                          if (
                            !(
                              data51 &&
                              typeof data51 == "object" &&
                              !Array.isArray(data51)
                            )
                          ) {
                            validate23.errors = [
                              {
                                instancePath: instancePath + "/grid",
                                schemaPath: "#/properties/grid/type",
                                keyword: "type",
                                params: { type: "object" },
                                message: "must be object",
                              },
                            ];
                            return false;
                          }
                          if (
                            !validate36(data51, {
                              instancePath: instancePath + "/grid",
                              parentData: data,
                              parentDataProperty: "grid",
                              rootData,
                            })
                          ) {
                            vErrors =
                              vErrors === null
                                ? validate36.errors
                                : vErrors.concat(validate36.errors);
                            errors = vErrors.length;
                          }
                          var valid51 = _errs159 === errors;
                        } else {
                          var valid51 = true;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate23.errors = [
        {
          instancePath,
          schemaPath: "#/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object",
        },
      ];
      return false;
    }
  }
  validate23.errors = vErrors;
  return errors === 0;
}
function validate22(
  data,
  { instancePath = "", parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  if (errors === 0) {
    if (Array.isArray(data)) {
      var valid0 = true;
      const len0 = data.length;
      for (let i0 = 0; i0 < len0; i0++) {
        const _errs1 = errors;
        if (
          !validate23(data[i0], {
            instancePath: instancePath + "/" + i0,
            parentData: data,
            parentDataProperty: i0,
            rootData,
          })
        ) {
          vErrors =
            vErrors === null
              ? validate23.errors
              : vErrors.concat(validate23.errors);
          errors = vErrors.length;
        }
        var valid0 = _errs1 === errors;
        if (!valid0) {
          break;
        }
      }
    } else {
      validate22.errors = [
        {
          instancePath,
          schemaPath: "#/type",
          keyword: "type",
          params: { type: "array" },
          message: "must be array",
        },
      ];
      return false;
    }
  }
  validate22.errors = vErrors;
  return errors === 0;
}
function validate21(
  data,
  { instancePath = "", parentData, parentDataProperty, rootData = data } = {}
) {
  let vErrors = null;
  let errors = 0;
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.layout !== undefined) {
        if (
          !validate22(data.layout, {
            instancePath: instancePath + "/layout",
            parentData: data,
            parentDataProperty: "layout",
            rootData,
          })
        ) {
          vErrors =
            vErrors === null
              ? validate22.errors
              : vErrors.concat(validate22.errors);
          errors = vErrors.length;
        }
      }
    } else {
      validate21.errors = [
        {
          instancePath,
          schemaPath: "#/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object",
        },
      ];
      return false;
    }
  }
  validate21.errors = vErrors;
  return errors === 0;
}
function validate20(
  data,
  { instancePath = "", parentData, parentDataProperty, rootData = data } = {}
) {
  /*# sourceURL="https://altinncdn.no/schemas/json/layout/layout.schema.v1.json" */ let vErrors =
    null;
  let errors = 0;
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      if (data.data !== undefined) {
        if (
          !validate21(data.data, {
            instancePath: instancePath + "/data",
            parentData: data,
            parentDataProperty: "data",
            rootData,
          })
        ) {
          vErrors =
            vErrors === null
              ? validate21.errors
              : vErrors.concat(validate21.errors);
          errors = vErrors.length;
        }
      }
    } else {
      validate20.errors = [
        {
          instancePath,
          schemaPath: "#/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object",
        },
      ];
      return false;
    }
  }
  validate20.errors = vErrors;
  return errors === 0;
}
