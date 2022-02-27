import { LayoutSettings } from "../generated/typescript-schema/layoutSettings";
import { Layout } from "../generated/typescript-schema/layout-inheritanceFixes";

export interface TextResourceVariables {
  [key: string]: string; //TODO: Check
}

export interface TextResource {
  id: string;
  value: string;
  variables?: TextResourceVariables;
}

export interface TextResources {
  language: Languages;
  resources: TextResource[];
}

export type Languages = "nb" | "nn" | "en";

export interface DataType {
  id: string;
  allowedContentTypes: string[];
  maxCount: number;
  minCount: number;
  appLogic?: {
    autoCreate: boolean;
    classRef: string;
  };
  taskId?: string;
}

export interface Application {
  id: string;
  org: string;
  title: { [language in Languages]?: string };
  dataTypes: DataType[];
  partyTypesAllowed: {
    bankruptcyEstate: boolean;
    organisation: boolean;
    person: boolean;
    subUnit: boolean;
  };
  autoDeleteOnProcessEnd: boolean;
  created: string;
  createdBy: string;
  lastChanged: string;
  lastChangedBy: string;
}

export interface RepoRoot {
  settings: LayoutSettings;
  resources: { [language in Languages]?: TextResources };
  layouts: { [page: string]: Layout };
  applicationmetadata: Application;
}
