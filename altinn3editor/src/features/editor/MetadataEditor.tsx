import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Application } from "../../app/types";
import { updatePartyTypesAllowed } from "../repo/repoSlice";

export default function MetadataEditor() {
  const applicationmetadata = useAppSelector(
    (state) => state.repo.current.applicationmetadata
  );

  return (
    <div>
      <PartyTypesEditor application={applicationmetadata} />
    </div>
  );
}

interface PartyTypesEditorProps {
  application: Application;
}

// bankruptcyEstate: boolean;
// organisation: boolean;
// person: boolean;
// subUnit: boolean;
function PartyTypesEditor({ application }: PartyTypesEditorProps) {
  const dispatch = useAppDispatch();
  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(updatePartyTypesAllowed({partyType: e.target.name, allowed: e.target.checked}));
  };
  return (
    <div>
      <p>
        <label>
          Konkurs foretak:{" "}
          <input
            type="checkbox"
            name="bankruptcyEstate"
            onChange={handleClick}
            checked={application.partyTypesAllowed.bankruptcyEstate}
          />
        </label>
      </p>
      <p>
        <label>
          Foretak:{" "}
          <input
            type="checkbox"
            name="organisation"
            onChange={handleClick}
            checked={application.partyTypesAllowed.organisation}
          />
        </label>
      </p>
      <p>
        <label>
          Privatperson:{" "}
          <input
            type="checkbox"
            name="person"
            onChange={handleClick}
            checked={application.partyTypesAllowed.person}
          />
        </label>
      </p>
      <p>
        <label>
          Underforetak:{" "}
          <input
            type="checkbox"
            name="subUnit"
            onChange={handleClick}
            checked={application.partyTypesAllowed.subUnit}
          />
        </label>
      </p>
    </div>
  );
}
