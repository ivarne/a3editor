import * as auto from './layout';
import { ComponentType } from './layout';

/** Schema that describes the layout configuration for Altinn applications. */
export interface Layout {
    data?: Data;
}


/** Contains data describing the layout configuration. */
export interface Data {
    layout?: Component[];
}

export type Component = AddressComponent | AttachmentList | Button | Checkboxes | Datepicker | Dropdown | FileUpload | Group | Header | Image | Input | InstantiationButton | NavigationButtons | Paragraph | RadioButtons | Summary | TextArea; 

export { ComponentType };


export interface AddressComponent extends auto.Component, auto.AddressComponent{
    type: ComponentType.AddressComponent
}


export interface AttachmentList extends auto.Component, auto.AttachmentListComponent{
    type: ComponentType.AttachmentList
}


export interface Button extends auto.Component{
    type: ComponentType.Button
}


export interface Checkboxes extends auto.Component, auto.SelectionComponents{
    type: ComponentType.Checkboxes
}


export interface Datepicker extends auto.Component, auto.DatepickerComponent{
    type: ComponentType.Datepicker
}


export interface Dropdown extends auto.Component, auto.SelectionComponents{
    type: ComponentType.Dropdown
}


export interface FileUpload extends auto.Component, auto.FileUploadComponent{
    type: ComponentType.FileUpload
}


export interface Group extends auto.Component, auto.GroupComponent{
    type: ComponentType.Group
}


export interface Header extends auto.Component, auto.HeaderComponent{
    type: ComponentType.Header
}


export interface Image extends auto.Component, auto.ImageComponent{
    type: ComponentType.Image
}


export interface Input extends auto.Component, auto.InputComponent{
    type: ComponentType.Input
}


export interface InstantiationButton extends auto.Component, auto.InstantiationButtonComponent{
    type: ComponentType.InstantiationButton
}


export interface NavigationButtons extends auto.Component, auto.NavigationButtonsComponent{
    type: ComponentType.NavigationButtons
}


export interface Paragraph extends auto.Component{
    type: ComponentType.Paragraph
}


export interface RadioButtons extends auto.Component, auto.SelectionComponents{
    type: ComponentType.RadioButtons
}


export interface Summary extends auto.Component, auto.SummaryComponent{
    type: ComponentType.Summary
}


export interface TextArea extends auto.Component{
    type: ComponentType.TextArea
}

