import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { usePageSelector } from "./editorSelectorHooks";

export default function Editor() {
  const pages = usePageSelector();
  return (
    <div>
      <nav>
        <ul>
          {pages?.map((page) => (
            <li key={page}>
              <NavLink to={`/editor/${page.toLowerCase()}`}>{page}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
