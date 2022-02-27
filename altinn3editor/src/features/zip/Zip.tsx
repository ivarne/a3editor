import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { load } from "../repo/repoSlice";
import { getAppFilesUpload } from "./zipToJson";

export default function Zip() {
    const dispatch = useAppDispatch();
  return (
    <div>
      <input type="file" name="test" id="test-upload"/>
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
