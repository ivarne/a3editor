import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Application } from "../../redux/types";
import { updatePartyTypesAllowed } from "../../redux/reducers/currentRepoSlice";
import LanguageToggler from "./EditorLayout/LanguageToggler";

export default function MetadataEditor() {
  const applicationmetadata = useAppSelector(
    (state) => state.currentRepo.applicationmetadata
  );

  return (
    <div>
      <LanguageToggler/>
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            checked={application.partyTypesAllowed.subUnit}
          />
        </label>
      </p>
    </div>
  );
}
