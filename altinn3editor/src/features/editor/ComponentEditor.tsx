import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Component } from "../../generated/typescript-schema/layout-inheritanceFixes";
import { updateComponent } from "../repo/repoSlice";
import Json from "./EditorLayout/Json";
import TextEditor from "./EditorLayout/Text";
import { useComponentSelector } from "./editorSelectorHooks";

export default function ComponentEditor() {
  const { page, componentId } = useParams();
  const component = useComponentSelector(page, componentId);
  const dispatch = useAppDispatch();

  const handleJsonUpdate = (value: Component) => {
    if (componentId && page)
      dispatch(
        updateComponent({ id: componentId, pageRef: page, component: value })
      );
  };
  if (!component?.component) return null;
  return (
    <div>
      <h2>
        {component?.boundResource?.["title"]}{" "}
        <small>{component?.component?.type}</small>
      </h2>
      ComponentEditor {page}, {componentId}
      <div>
        <TextEditor component={component.component} />
        <Json origContent={component?.component} update={handleJsonUpdate} />
      </div>
    </div>
  );
}
