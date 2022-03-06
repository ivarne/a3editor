import React, { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Component } from "../../../generated/typescript-schema/layout-inheritanceFixes";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useTextResourceSelector } from "../editorSelectorHooks";
import { updateTextResource } from "../../../redux/reducers/currentRepoSlice";
import useDebounceRouteReset from "../../../utils/useDebounceRouteReset";
import { Languages } from "../../../redux/types";

interface TextProps {
  component: Component;
}

export default function TextEditor({ component }: TextProps) {
  const languages = useAppSelector(state=>state.editorSettings.activeLanguages)
  const bindings = component?.textResourceBindings ?? {};
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {Object.keys(languages).filter(language=>languages[language as Languages]).map((language) => (
            <th key={language}>{language}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(bindings).map((binding) => (
          <tr key={binding}>
            <td>{binding}</td>
            {Object.keys(languages).filter(language=>languages[language as Languages]).map((language) => (
              <td key={language}>
                <TextResource
                  bindingName={binding}
                  resourceId={bindings[binding]}
                  language={language as Languages}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface TextResourceProps {
  bindingName: string;
  resourceId: string;
  language: Languages;
}

function TextResource({
  bindingName,
  resourceId,
  language,
}: TextResourceProps) {
  const textResource =
    useTextResourceSelector(resourceId, language)?.value ?? "";
  const [localText, setLocalText] = useState<string>("");
  const [markdownRendered, setMarkdownRendered] = useState<string>("");
  const dispatch = useAppDispatch();

  // Ensure that localText gets updated when textResource changes
  useEffect(() => {
    setLocalText(textResource);
  }, [textResource]);

  // Debounce markdown rendering for performace
  const debouncedLocalText = useDebounceRouteReset(localText, 1000);
  useEffect(() => {
    var markdown = renderMarkdown(debouncedLocalText);
    setMarkdownRendered(markdown);
  }, [debouncedLocalText]);

  return (
    <div>
      <textarea
        value={localText}
        onChange={(e) => setLocalText(e.target.value)}
        onBlur={(e) => {
          dispatch(
            updateTextResource({
              language,
              resourceId,
              text: localText,
            })
          );
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: markdownRendered }} />
    </div>
  );
}

function renderMarkdown(input?: string) {
  if (!input) return "";
  const dirty = marked(input);
  const options: DOMPurify.Config = {};
  const clean = DOMPurify.sanitize(dirty, options);
  return clean.toString();
}
