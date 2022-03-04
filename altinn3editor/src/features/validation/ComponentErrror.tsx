import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Json from "../editor/EditorLayout/Json";
import { updateComponentByIndex } from "../repo/repoSlice";
import { LayoutValidationError } from "./helpers/types";

interface Props {
  error: LayoutValidationError;
}

export default function ComponentError({ error }: Props) {
  const component = useAppSelector((state) => {
    return state.repo.current.layouts[error.pageIndex]?.data?.layout?.[
      error.componentIndex ?? -1
    ];
  });
  const dispatch = useAppDispatch();
  const handleJsonUpdate = (c: typeof component) => {
    if (c && error.componentIndex > -1)
      dispatch(
        updateComponentByIndex({
          component: c,
          componentIndex: error.componentIndex,
          pageIndex: error.pageIndex,
        })
      );
  };
  if (component) {
    return (
      <div>
        <h2>{error.message}</h2>
        <Json origContent={component} update={handleJsonUpdate} />
      </div>
    );
  }
  return (
    <div>
      <h2>{error.message}</h2>
    </div>
  );
}
