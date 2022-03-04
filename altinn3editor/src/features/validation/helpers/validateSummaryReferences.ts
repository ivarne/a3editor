import { Layout } from "../../../generated/typescript-schema/layout-inheritanceFixes";
import { LayoutValidationError } from "./types";

export default function validateSummaryReferences(
  layouts: Layout[],
  pages?: string[]
) {
  const errors: LayoutValidationError[] = [];

  layouts.forEach((layout, pageIndex) => {
    layout.data?.layout?.forEach((summaryComponent, componentIndex) => {
      if (summaryComponent.type !== "Summary") {
        return;
      }
      const { id, pageRef, componentRef } = summaryComponent;
      const pageRefIndex =
        pages?.findIndex(
          (page) => page.toLowerCase() === pageRef?.toLowerCase()
        ) ?? -1;
      if (pageRefIndex < 0) {
        errors.push({
          message: `Error in pageRef '${pageRef}' in Summary component with id '${id}'`,
          pageIndex,
          componentIndex,
        });
      } else if (
        !layouts[pageRefIndex]?.data?.layout?.some(
          (component) => component.id === componentRef
        )
      ) {
        errors.push({
          message: `Error in componentRef '${componentRef}' in Summary component with id '${id}'`,
          pageIndex,
          componentIndex,
        });
      }
    });
  });
  return errors;
}
