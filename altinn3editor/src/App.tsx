import React from "react";
import Editor from "./features/editor/Editor";
import ZipUpload from "./features/zip/ZipUpload";
import { Route, Routes } from "react-router-dom";
import Layout from "./design/Layout";
import PageEditor from "./features/editor/PageEditor";
import ComponentEditor from "./features/editor/ComponentEditor";
import Debug from "./features/debug/Debug";
import Diff from "./features/diff/DiffView";
import ValidationPage from "./features/validation/ValidationPage";
import ErrorBoundary from "./features/errorBoundry/ErrorBoundry";
import MetadataEditor from "./features/editor/MetadataEditor";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="diff" element={<Diff />} />
          <Route path="zip" element={<ZipUpload />} />
          <Route path="editor" element={<Editor />}>
            <Route path="" element={<MetadataEditor/>}/>
            <Route path=":page" element={<PageEditor />}>
              <Route path=":componentId" element={<ComponentEditor />} />
            </Route>
          </Route>
          <Route path="validate" element={<ValidationPage />} />
        </Route>
        <Route path="debug" element={<Debug />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
