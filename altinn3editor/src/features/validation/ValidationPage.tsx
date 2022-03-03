import { useAppSelector } from "../../app/hooks";
import ComponentError from "./ComponentErrror";
import { jsonSchamaValidateLayout } from "./helpers/jsonSchemaValidation";

export default function ValidationPage() {
  const layouts = useAppSelector((state) => state.repo.current.layouts);

  // Validate componnents agains JSON schema
  const errors = jsonSchamaValidateLayout(layouts);
  if (errors.length) {
    return (
      <div>
        <div>
          {errors.map((error, index) => (
            <ComponentError
              key={
                error.componentIndex === -1
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
