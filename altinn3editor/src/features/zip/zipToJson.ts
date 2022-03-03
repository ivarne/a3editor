import * as zip from "@zip.js/zip.js";
import { LayoutSettings } from "../../generated/typescript-schema/layoutSettings";
import { Application, Languages, RepoRoot } from "../../app/types";
import { Layout } from "../../generated/typescript-schema/layout-inheritanceFixes";

zip.configure({
  useWebWorkers: false,
});

export async function getAppFilesUrl(url: string): Promise<RepoRoot> {
  var reader = new zip.ZipReader(new zip.HttpReader(url));
  var entries = await reader.getEntries();
  console.log(entries);
  return {
    layouts: [],
    settings: {} as LayoutSettings,
    resources: {},
    applicationmetadata: {} as Application,
  };
}

export async function getAppFilesUpload(id: string): Promise<RepoRoot> {
  const fileInput = document.getElementById(id) as HTMLInputElement;
  const file = fileInput?.files?.[0];
  const root: RepoRoot = {
    layouts: [],
    settings: null!,
    resources: {},
    applicationmetadata: null!,
  };
  const layouts: { [page: string]: Layout } = {};
  if (!file) return root;
  const entries = await new zip.ZipReader(
    new zip.BlobReader(file)
  ).getEntries();
  for (const entry of entries) {
    if (entry.filename.endsWith("/")) continue;
    const [path, filename] = splitLast(entry.filename.toLowerCase(), "/");
    // console.log(path, filename);
    if (
      path.endsWith("app/config") &&
      filename === "applicationmetadata.json"
    ) {
      var applicationmetadata = await entry.getData?.(new zip.TextWriter());
      root.applicationmetadata = JSON.parse(applicationmetadata);
    } else if (path.endsWith("app/config/texts")) {
      var resourceString = await entry.getData?.(new zip.TextWriter());
      root.resources[filename.split(".")[1] as Languages] =
        JSON.parse(resourceString);
    } else if (path.endsWith("app/ui/layouts")) {
      var layoutString = await entry.getData?.(new zip.TextWriter());
      layouts[splitLast(filename, ".")[0]] = JSON.parse(layoutString);
    } else if (path.endsWith("app/ui") && filename === "settings.json") {
      var settingsString = await entry.getData?.(new zip.TextWriter());
      root.settings = JSON.parse(settingsString);
    }
  }
  // Insert layout in correct order from settings.json
  root.layouts =
    root.settings?.pages?.order?.map(
      (page) => layouts[page.toLowerCase()] ?? { data: { layout: [] } }
    ) ?? [];
  // If there are remaining pages
  const unknownPages = Object.keys(layouts).filter(
    (page) => !root.settings?.pages?.order?.includes(page)
  );
  // Add the unknown pages to settings and layouts
  root.settings.pages?.order?.concat(unknownPages);
  root.layouts.concat(unknownPages.map((page) => layouts[page]));

  console.log(root);

  return root;
}

function splitLast(string: string, separator: string) {
  const index = string.lastIndexOf(separator);
  return [string.substring(0, index), string.substring(index + 1)];
}
