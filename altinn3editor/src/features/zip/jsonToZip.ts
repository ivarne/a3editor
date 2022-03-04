import * as zip from "@zip.js/zip.js";
import { Languages, RepoRoot } from "../../app/types";

export async function doDownloadZip(root: RepoRoot) {
  const zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"));

  await addFiles(zipWriter, root);

  const blobURL = await URL.createObjectURL(await zipWriter.close());
  const anchor = document.createElement("a");
  const clickEvent = new MouseEvent("click");
  anchor.href = blobURL;
  anchor.download = root.applicationmetadata.id + ".zip";
  anchor.dispatchEvent(clickEvent);
}

async function addFiles(zipWriter: zip.ZipWriter, root: RepoRoot) {
  // add settings file
  await addJson(zipWriter, "App/ui/settings.json", root.settings);

  // add layout files
  for (const { page, index } of root.settings.pages?.order?.map(
    (page, index) => ({ page, index })
  ) ?? []) {
    await addJson(
      zipWriter,
      `App/ui/layouts/${page}.json`,
      root.layouts[index]
    );
  }
  // add text resources
  for (const lang in root.resources) {
    await addJson(
      zipWriter,
      `App/config/texts/resource.${lang}.json`,
      root.resources[lang as Languages]
    );
  }
}

async function addJson(zipWriter: zip.ZipWriter, path: string, obj: any) {
  const data = JSON.stringify(obj, null, 4);
  await zipWriter.add(path, new zip.BlobReader(new Blob([data])));
}
