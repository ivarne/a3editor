import * as zip from '@zip.js/zip.js';
import { ComponentType, HeaderComponentSize } from '../../generated/typescript-schema/layout';
import { LayoutSettings } from '../../generated/typescript-schema/layoutSettings';
import { Languages, RepoRoot } from '../../app/types';

zip.configure({
    useWebWorkers: false,
})

export async function getAppFilesUrl(url:string):Promise<RepoRoot>{
    var reader = new zip.ZipReader(new zip.HttpReader(url));
    var entries = await reader.getEntries();
    console.log(entries);
    return {
        layouts: {},
        settings: {} as LayoutSettings,
        resources: {},
    };
}

export async function getAppFilesUpload(id:string):Promise<RepoRoot>{
    const fileInput = document.getElementById(id) as HTMLInputElement;
    const file = fileInput?.files?.[0];
    const root:RepoRoot = {layouts: {}, settings: null!, resources: {}}
    if(!file) return root;
    const entries = await (new zip.ZipReader(new zip.BlobReader(file))).getEntries();
    for(const entry of entries){
        if(entry.filename.endsWith("/")) continue;
        const [path, filename] = splitLast(entry.filename.toLowerCase(), "/");
        // console.log(path, filename);
        if(path.endsWith("app/config/texts")){
            var resourceString = await entry.getData?.(new zip.TextWriter());
            root.resources[filename.split(".")[1] as Languages] = JSON.parse(resourceString);
        }else if(path.endsWith("app/ui/layouts")){
            var layoutString = await entry.getData?.(new zip.TextWriter());
            root.layouts[splitLast(filename, ".")[0]] = JSON.parse(layoutString);
        }else if(path.endsWith("app/ui") && filename === "settings.json"){
            var settingsString = await entry.getData?.(new zip.TextWriter());
            root.settings = JSON.parse(settingsString);
        }
    };
    console.log(root);
    var c = root.layouts["summary"].data?.layout?.[1];
    switch(c?.type){
        case ComponentType.Header:
            c.size = HeaderComponentSize.L;
            break;
        case ComponentType.Summary:
            console.log(c.pageRef, c.componentRef);
            break;
    }
    return root;
}

function splitLast(string:string, separator:string){
    const index = string.lastIndexOf(separator);
    return [string.substring(0,index), string.substring(index+1)];
}