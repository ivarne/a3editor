import React from "react";
import { useAppSelector } from "../app/hooks";

export default function Header() {
  const appName = useAppSelector(
    (state) =>
      state.repo.current?.resources?.nb?.resources.find(
        (t) => t.id === "appName"
      )?.value
  );
  const applicationmetadata = useAppSelector(
    (state) => state.repo.current?.applicationmetadata
  );
  if (appName) {
    return (
      <>
        <h1>
          {applicationmetadata?.org}/{appName}
        </h1>
        <small>
          {
            applicationmetadata?.dataTypes.find((dt) => dt.appLogic)?.appLogic
              ?.classRef
          }
        </small>
      </>
    );
  }
  return null;
}
