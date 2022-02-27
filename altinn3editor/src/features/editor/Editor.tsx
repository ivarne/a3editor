import React from "react";
import { Outlet } from "react-router-dom";
import { useEditorSelector } from "./editorSelectorHooks";

export default function Editor() {
  const components = useEditorSelector("informasjon");
  console.log(components);
  return (
    <div>
      {/* {JSON.stringify(components)} */}
      <Outlet />
      {components?.map((component, i) => (
        <div key={i}>{JSON.stringify(component.boundResource)}</div>
      ))}
    </div>
  );
}
