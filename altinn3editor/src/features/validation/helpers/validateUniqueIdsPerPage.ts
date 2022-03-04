import { Layout } from "../../../generated/typescript-schema/layout-inheritanceFixes";
import { LayoutValidationError } from "./types";

export default function validateUniqueIdsPerPage(
  layouts: Layout[],
  pages?: string[]
) {
  const errors: LayoutValidationError[] = [];

  layouts.forEach((layout, layoutIndex) => {
    const ids = layout.data?.layout?.map((component) => component.id);
    const idCounts: { [id: string]: number } = {};
    ids?.forEach((id) => {
      idCounts[id] = (idCounts[id] || 0) + 1;
    });
    Object.keys(idCounts).forEach((id) => {
      if (idCounts[id] > 1) {
        layout.data?.layout?.forEach((component, componentIndex) => {
          if (id === component.id) {
            errors.push({
              message: `Duplicate id ${id} on page ${layoutIndex} ${pages?.[layoutIndex]}`,
              pageIndex: layoutIndex,
              componentIndex,
            });
          }
        });
      }
    });
  });
  return errors;
}
