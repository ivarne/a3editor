﻿//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v10.5.2.0 (Newtonsoft.Json v13.0.0.0) (http://NJsonSchema.org)
// </auto-generated>
//----------------------





/** Settings regarding components */
export interface Components {
    excludeFromPdf?: string[];
}

/** Settings regarding layout pages */
export interface Pages {
    order?: string[];
    excludeFromPdf?: string[];
    /** Triggers that apply for all navigation components across all pages. Can be overrided at the component level. */
    triggers?: Triggers[];
}

/** Schema that describes the options that can be configured for number formatting on an `input` component, based on react-number-format package. For complete list of available options, see https://github.com/s-yadav/react-number-format#props */
export interface Json extends any {
    /** Characters which when pressed result in a decimal separator. When missing, decimalSeparator and '.' are used */
    allowedDecimalSeparators?: string[];
    /** Apply formatting to empty inputs */
    allowEmptyFormatting?: boolean;
    /** Allow leading zeros at beginning of number */
    allowLeadingZeros?: boolean;
    /** Allow negative numbers (Only when format option is not provided) */
    allowNegative?: boolean;
    /** If defined it limits to given decimal scale. */
    decimalScale?: number;
    /** Support decimal point on a number. Single character string. */
    decimalSeparator?: string;
    /** Used together with decimalScale. If true it adds 0s to match given decimal scale. */
    fixedDecimalScale?: boolean;
    /** Format given as hash string, to allow number input in place of hash. */
    format?: string;
    /** Mask to show in place of non-entered values */
    mask?: string;
    /** Add a prefix before the number */
    prefix?: string;
    /** Add a suffix after the number */
    suffix?: string;
    /** Add thousand separators on number. Single character string or boolean true (true is default to ,) */
    thousandSeparator?: boolean;
}

/** Contains data describing the layout configuration. */
export interface Data {
    layout?: Component[];
}

export interface Component extends any {
    /** The component ID. Must be unique within a given layout. */
    id: string;
    /** The component type. */
    type: ComponentType;
    /** Boolean value indicating if the component is required when filling in the form. Defaults to false. */
    required?: boolean;
    /** Boolean value indicating if the component should be presented as read only. Defaults to false. */
    readOnly?: boolean;
    /** Text resource bindings for a component. */
    textResourceBindings?: { [key: string]: string; };
    /** Data model bindings for a component. */
    dataModelBindings?: { [key: string]: string; };
    triggers?: Triggers[];
    /** A collection of settings for how the component label should be rendered. */
    labelSettings?: LabelSettings;
    /** Settings for the components grid. Used for controlling horizontal alignment. */
    grid?: GridSettings;
}

export interface HeaderComponent {
    /** 'L'=<h2>, 'M'=<h3>, 'S'=<h4> */
    size: HeaderComponentSize;
}

export interface FileUploadComponent {
    /** Sets the maximum file size allowed in megabytes. */
    maxFileSizeInMB: number;
    /** Sets the maximum number of attachments allowed to upload. */
    maxNumberOfAttachments: number;
    /** Sets the minimum number of attachments to upload */
    minNumberOfAttachments: number;
    /** Sets the display mode for the file upload component. */
    displayMode: FileUploadComponentDisplayMode;
    /** Boolean value indicating if the component has valid file endings */
    hasCustomFileEndings?: boolean;
    /** A separated string of valid file endings to upload. If not set all endings are accepted. */
    validFileEndings?: string;
}

export interface DatepickerComponent {
    /** Sets the minimum allowed date. Can also use keyword 'today' to disable all past dates dynamically based on the current date. Defaults to 1900-01-01T12:00:00.000Z. */
    minDate?: string;
    /** Sets the maximum allowed date. Can also use keyword 'today' to disable all future dates dynamically based on the current date. Defaults to 2100-01-01T12:00:00.000Z. */
    maxDate?: string;
    /** Boolean value indicating if the date time should be stored as a timeStamp. Defaults to true. */
    timeStamp?: boolean;
}

export interface NavigationButtonsComponent {
    /** Shows two buttons (back/next) instead of just 'next'. */
    showBackButton?: boolean;
}

export interface InstantiationButtonComponent {
    /** Creates a new app instance with data collected from a stateless part of the app. */
    mapping?: { [key: string]: string; };
}

export interface GridProps {
    /** Grid breakpoint at 0px */
    xs?: number;
    /** Grid breakpoint at 600px */
    sm?: number;
    /** Grid breakpoint at 960px */
    md?: number;
    /** Grid breakpoint at 1280px */
    lg?: number;
    /** Grid breakpoint at 1920px */
    xl?: number;
}

export interface GridSettings extends GridProps {
    /** Optional grid for the component label. Used in combination with innerGrid to align labels on the side. */
    labelGrid?: GridProps;
    /** Optional grid for inner component content like input field or dropdown. Used to avoid inner content filling the component width. */
    innerGrid?: GridProps;
}

export interface GroupComponent {
    /** An array of the "id" of child components belonging to the group. */
    children: string[];
    /** Alternatives for edit view of repeating group */
    edit?: GroupEditOptions;
    /** The maximum number of iterations of a group. Only relevant if group is repeating. */
    maxCount?: number;
    /** An array of the id of child components that should be included as table headers. If not defined all components are shown. */
    tableHeaders?: string[];
}

export interface GroupEditOptions {
    /** Mode for how repeating group table is displayed in edit mode */
    mode?: GroupEditOptionsMode;
    /** Conditions for filtering visible items in repeating group */
    filter?: GroupFilterItem[];
    /** Boolean value indicating whether save button should be shown or not in edit mode of repeating group item. */
    saveButton?: boolean;
    /** Boolean value indicating whether delete button should be shown or not in edit mode of repeating group item. */
    deleteButton?: boolean;
    /** Boolean value indicating if form components in edit mode should be shown over multiple pages/views. */
    multiPage?: boolean;
    /** Boolean value indicating whether add new button should be shown or not under the table. */
    addButton?: boolean;
}

export interface GroupFilterItem {
    /** Key representing field in data model to check. */
    key?: string;
    /** Value to check against. */
    value?: string;
}

export interface Options {
    /** The option label. Can be plain text or a text resource binding. */
    label: string;
    /** The option value. */
    value: string;
}

export interface SelectionComponents {
    /** Reference to connected options by id. */
    optionsId?: string;
    /** An array of options. Only relevant if no optionsId is set. */
    options?: Options[];
    /** Sets a preselected index. */
    preselectedOptionIndex?: number;
}

export interface AddressComponent {
    /** Boolean value indicating if the address component should be shown in simple mode. */
    simplified?: boolean;
}

export interface SummaryComponent {
    /** String value indicating which layout component (by ID) the summary is for. */
    componentRef?: string;
    /** String value indicating which layout page the referenced component is defined on. */
    pageRef?: string;
}

export interface AttachmentListComponent {
    /** List of data type IDs for the attachment list to show. */
    dataTypeIds?: string[];
}

export interface ImageComponent {
    /** Set of options for image field. */
    image?: Image;
}

export interface InputComponent {
    /** Set of options for formatting input fields. */
    formatting?: InputFormatting;
}

export interface InputFormatting {
    number?: Json;
    /** The alignment for Input field (eg. right aligning a series of numbers) */
    align?: InputFormattingAlign;
}

/** Schema that describes the layout configuration for Altinn applications. */
export interface Json2 {
    data?: Data;
}

/** Schema that describes settings for the layout configuration for Altinn applications. */
export interface Test {
    components?: Components;
    pages?: Pages;
}

export enum Triggers {
    Validation = "validation",
    ValidatePage = "validatePage",
    ValidateAllPages = "validateAllPages",
    CalculatePageOrder = "calculatePageOrder",
}

export enum ComponentType {
    AddressComponent = "AddressComponent",
    AttachmentList = "AttachmentList",
    Button = "Button",
    Checkboxes = "Checkboxes",
    Datepicker = "Datepicker",
    Dropdown = "Dropdown",
    FileUpload = "FileUpload",
    Group = "Group",
    Header = "Header",
    Image = "Image",
    Input = "Input",
    InstantiationButton = "InstantiationButton",
    NavigationButtons = "NavigationButtons",
    Paragraph = "Paragraph",
    RadioButtons = "RadioButtons",
    Summary = "Summary",
    TextArea = "TextArea",
}

export interface LabelSettings {
    /** Controls whether the text that is indicating that a field is optional should be displayed. */
    optionalIndicator?: boolean;
}

export enum HeaderComponentSize {
    L = "L",
    M = "M",
    S = "S",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
}

export enum FileUploadComponentDisplayMode {
    Simple = "simple",
    List = "list",
}

export enum GroupEditOptionsMode {
    HideTable = "hideTable",
    ShowAll = "showAll",
    ShowTable = "showTable",
}

export interface Image {
    src?: Src;
    width?: string;
    align?: ImageAlign;
}

export enum InputFormattingAlign {
    Left = "left",
    Center = "center",
    Right = "right",
}

export interface Src {
    nb?: string;
    nn?: string;
    en?: string;
}

export enum ImageAlign {
    FlexStart = "flex-start",
    Center = "center",
    FlexEnd = "flex-end",
    SpaceBetween = "space-between",
    SpaceAround = "space-around",
    SpaceEvenly = "space-evenly",
}

function jsonParse(json: any, reviver?: any) {
    json = JSON.parse(json, reviver);

    var byid: any = {};
    var refs: any = [];
    json = (function recurse(obj: any, prop?: any, parent?: any) {
        if (typeof obj !== 'object' || !obj)
            return obj;
        
        if ("$ref" in obj) {
            let ref = obj.$ref;
            if (ref in byid)
                return byid[ref];
            refs.push([parent, prop, ref]);
            return undefined;
        } else if ("$id" in obj) {
            let id = obj.$id;
            delete obj.$id;
            if ("$values" in obj)
                obj = obj.$values;
            byid[id] = obj;
        }
        
        if (Array.isArray(obj)) {
            obj = obj.map((v, i) => recurse(v, i, obj));
        } else {
            for (var p in obj) {
                if (obj.hasOwnProperty(p) && obj[p] && typeof obj[p] === 'object')
                    obj[p] = recurse(obj[p], p, obj);
            }
        }

        return obj;
    })(json);

    for (let i = 0; i < refs.length; i++) {
        const ref = refs[i];
        ref[0][ref[1]] = byid[ref[2]];
    }

    return json;
}

function createInstance<T>(data: any, mappings: any, type: any): T | null {
  if (!mappings)
    mappings = [];
  if (!data)
    return null;

  const mappingIndexName = "__mappingIndex";
  if (data[mappingIndexName])
    return <T>mappings[data[mappingIndexName]].target;

  data[mappingIndexName] = mappings.length;

  let result: any = new type();
  mappings.push({ source: data, target: result });
  result.init(data, mappings);
  return result;
}