import React from "react";
import Editor from "./features/editor/Editor";
import Zip from "./features/zip/Zip";
import { Route, Routes } from "react-router-dom";
import Layout from "./design/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="zip" element={<Zip />} />
        <Route path="editor" element={<Editor />} />
      </Route>
    </Routes>
  );
}

export default App;
