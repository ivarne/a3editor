import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleLanguage } from "../../../redux/reducers/editorSettingsSlice";
import { Languages } from "../../../redux/types";

export default function LanguageToggler() {
  const activeLanguages = useAppSelector(
    (state) => state.editorSettings.activeLanguages
  );

  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleLanguage(e.target.name as Languages));
  };
  const handleAdd = (e: ChangeEvent<HTMLInputElement>) => {
    setShowAdd(false);
    if(e.target.value){
        dispatch(toggleLanguage(e.target.value as Languages));
    }
  };
  const [showAdd, setShowAdd] = useState<Boolean>(false);
  return (
    <div>
      {Object.keys(activeLanguages).map((language) => (
        <label>
          {language}{" "}
          <input
            type="checkbox"
            onChange={handleChange}
            name={language}
            checked={activeLanguages[language as Languages] ?? false}
          />
        </label>
      ))}
      {showAdd ? (
        <input type="text" placeholder="language code" onBlur={handleAdd} />
      ) : (
        <button onClick={() => setShowAdd(true)}>Add Language</button>
      )}
    </div>
  );
}
