import { LayoutSettings } from "../generated/typescript-schema/layoutSettings";
import { Layout } from "../generated/typescript-schema/layout-inheritanceFixes";

export interface TextResourceVariables{
    [key:string]: string; //TODO: Check
}

export interface TextResource{
    id: string;
    value: string;
    variables?: TextResourceVariables
}

export interface TextResources{
    language: Languages;
    resources: TextResource[];
} 

export type Languages = "nb" | "nn" | "en";

export interface RepoRoot {
  settings: LayoutSettings;
  resources: {[language in Languages]?: TextResources}
  layouts: {[page:string]: Layout}
}
