import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useEditorSelector } from "./editorSelectorHooks";

export default function Editor() {
  const { page } = useParams();
  const components = useEditorSelector(page);
  console.log(components);
  return (
    <div>
      {/* {JSON.stringify(components)} */}
      <Outlet />
      <ul>
      {components?.map((component, i) => (
          <li key={i}>
          <Link to={component.component.id}>
            {component.boundResource["title"] ?? component.component.id}
          </Link>
        </li>
      ))}
      </ul>
    </div>
  );
}
