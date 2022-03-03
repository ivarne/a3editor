import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Json from "../editor/EditorLayout/Json";
import { updateComponentByIndex } from "../repo/repoSlice";
import { LayoutValidationError } from "./helpers/types";

interface Props {
  error: LayoutValidationError;
}

export default function ComponentError({ error }: Props) {
  if (!error.componentIndex) {
    return <pre>{JSON.stringify(error, null, 4)}</pre>;
  }
  return <ComponentErrorEditor error={error} />;
}

function ComponentErrorEditor({ error }: Props) {
  const component = useAppSelector((state) => {
    return state.repo.current.layouts[error.pageIndex]?.data?.layout?.[
      error.componentIndex ?? 0
    ];
  });
  const dispatch = useAppDispatch();
  const handleJsonUpdate = (c: typeof component) => {
    if (component && error.componentIndex)
      dispatch(
        updateComponentByIndex({
          component,
          componentIndex: error.componentIndex,
          pageIndex: error.pageIndex,
        })
      );
  };
  return (
    <div>
      <Json origContent={component} update={handleJsonUpdate} />
    </div>
  );
}
