import React, { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Component } from "../../../generated/typescript-schema/layout-inheritanceFixes";
import { useAppDispatch } from "../../../app/hooks";
import { useTextResourceSelector } from "../editorSelectorHooks";
import { Language } from "../../../generated/typescript-schema/widget";
import { updateTextResource } from "../../repo/repoSlice";
import useDebounceRouteReset from "../../../utils/useDebounceRouteReset";

interface TextProps {
  component: Component;
}

export default function TextEditor({ component }: TextProps) {
  const bindings = component?.textResourceBindings ?? {};
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {Object.values(Language).map((language) => (
            <th key={language}>{language}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(bindings).map((binding) => (
          <tr key={binding}>
            <td>{binding}</td>
            {Object.values(Language).map((language) => (
              <td key={language}>
                <TextResource
                  bindingName={binding}
                  resourceId={bindings[binding]}
                  language={language}
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
  language: Language;
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
