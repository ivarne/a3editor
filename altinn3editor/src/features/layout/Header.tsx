import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

export default function Header() {
  const appName = useAppSelector(
    (state) =>
      state.currentRepo?.resources?.nb?.resources.find(
        (t) => t.id === "appName"
      )?.value
  );
  const applicationmetadata = useAppSelector(
    (state) => state.currentRepo?.applicationmetadata
  );
  const location = useLocation();
  if (appName) {
    return (
      <header>
        <div style={{ display: "block", float: "right" }}>
          <Link to="/validate" style={{ padding: "5px" }}>
            Validering
          </Link>
          <Link to="/zip" style={{ padding: "5px" }}>
            Upload
          </Link>
          <Link to="/diff" style={{ padding: "5px" }}>
            Diff
          </Link>
          <Link to="/editor" style={{ padding: "5px" }}>
            Editor
          </Link>
          <Link to="/debug" style={{ padding: "5px" }}>
            Debug
          </Link>
        </div>
        <h1>
          {applicationmetadata?.org}/{appName}
        </h1>
        <small>
          {
            applicationmetadata?.dataTypes.find((dt) => dt.appLogic)?.appLogic
              ?.classRef
          }
        </small>
      </header>
    );
  }
  if (location.pathname === "/zip") {
    return null;
  }
  return (
    <>
      <h1>No app loaded</h1>
      <p>
        Try to upload a new <Link to="/zip">zipfile</Link>
      </p>
    </>
  );
}
