import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { load } from "../../redux/reducers/currentRepoSlice";
import { getAppFilesUpload } from "./zipToJson";

export default function ZipUpload() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <input type="file" name="test" id="test-upload" />
      <button
        onClick={async (e) => {
          const uploadState = await getAppFilesUpload("test-upload");
          dispatch(load(uploadState));
          navigate("/editor");
        }}
      >
        Click to upload
      </button>
    </div>
  );
}
