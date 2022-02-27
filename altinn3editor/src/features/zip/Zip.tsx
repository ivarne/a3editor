import React from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { load } from "../repo/repoSlice";
import { getAppFilesUpload } from "./zipToJson";

export default function Zip() {
  const dispatch = useAppDispatch();
  const hasRoot = useAppSelector((state) => state.repo.initial === null);
  if (!hasRoot) return <Navigate to="/editor" />;
  return (
    <div>
      <input type="file" name="test" id="test-upload" />
      <button
        onClick={async (e) => {
          const uploadState = await getAppFilesUpload("test-upload");
          dispatch(load(uploadState));
        }}
      >
        Click to upload
      </button>
    </div>
  );
}
