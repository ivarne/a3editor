import { Layout } from "../../../generated/typescript-schema/layout-inheritanceFixes";
import validateLayout from "../../../generated/validators/validator";
import { LayoutValidationError } from "./types";

export interface SchemaValidationError {
  instancePath: string;
  schemaPath: string;
  keyword:
    | "type"
    | "if"
    | "maxLength"
    | "enum"
    | "maximum"
    | "minimum"
    | "required"
    | "pattern"
    | "uniqueItems"; // Not complete
  params: any;
  message: string;
}

export function jsonSchamaValidateLayout(layouts: Layout[]) {
  const errors: LayoutValidationError[] = [];
  layouts.forEach((layout, pageIndex) => {
    if (!validateLayout(layout)) {
      const file_erros = (validateLayout as any)
        .errors as SchemaValidationError[];
      const componentIndex = /\/data\/layout\/(\d+)\/.*/.exec(
        file_erros?.[0]?.instancePath
      )?.[1];
      errors.push({
        pageIndex,
        componentIndex: componentIndex ? parseInt(componentIndex) : -1,
        message: file_erros?.[0]?.message,
        data: file_erros,
      });
    }
  });
  return errors;
}
