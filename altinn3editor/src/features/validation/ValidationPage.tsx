import { useAppSelector } from "../../redux/hooks";
import ComponentError from "./ComponentErrror";
import { jsonSchamaValidateLayout } from "./helpers/jsonSchemaValidation";
import { LayoutValidationError } from "./helpers/types";
import validateSummaryReferences from "./helpers/validateSummaryReferences";
import validateUniqueIdsPerPage from "./helpers/validateUniqueIdsPerPage";

export default function ValidationPage() {
  const layouts = useAppSelector((state) => state.repo.current.layouts);
  const pages = useAppSelector(
    (state) => state.repo.current.settings.pages?.order
  );
  const errors: LayoutValidationError[] = [];

  // Validate componnents agains JSON schema
  errors.push(...jsonSchamaValidateLayout(layouts));

  // Validate unique IDs
  errors.push(...validateUniqueIdsPerPage(layouts, pages));

  // Validate Summary references
  errors.push(...validateSummaryReferences(layouts, pages));

  if (errors.length) {
    return (
      <div>
        <div>
          {errors.map((error, index) => (
            <ComponentError
              key={
                error.componentIndex < 0
                  ? index
                  : `${error.pageIndex}|${error.componentIndex}`
              }
              error={error}
            />
          ))}
        </div>
        <pre>{JSON.stringify(errors, null, 4)}</pre>;
      </div>
    );
  }
  return <p>No errors found</p>;
}
