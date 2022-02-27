import React, {} from 'react';
import { useEditorSelector } from './editorSelectorHooks';


export default function Editor(){
    const components = useEditorSelector("informasjon");
    console.log(components);
    return <div>
        {/* {JSON.stringify(components)} */}
        {components?.map((component, i)=><div key={i}>{JSON.stringify(component.boundResource)}</div>)}
    </div>
}