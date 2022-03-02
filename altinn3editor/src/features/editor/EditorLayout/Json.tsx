import React, { useEffect, useState } from 'react';

export interface JsonProps{
    origContent: any,
    update: (content:any)=>void,
}


export default function Json({origContent, update}:JsonProps){
    const [currentContent, updateCurrentContent] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [mode, setMode] = useState<"hidden" | "view" | "edit">("hidden");
    useEffect(()=>{
        updateCurrentContent(JSON.stringify(origContent, null, 4));
    }, [origContent]);
    const handleBlur = ()=>{
        try{
            update(JSON.parse(currentContent));
            setError(false);
        }catch{
            setError(true);
        }
        setMode("hidden");
    }
    switch(mode){
        case "hidden":
            return <button onClick={()=>setMode("view")}>Rediger JSON</button>
        case "view":
            return <pre onClick={()=>setMode("edit")}>{currentContent}</pre>
        case "edit":
            return <textarea style={{borderColor:error?"red":"black", width: "100%"}} rows={currentContent.split("\n").length} onChange={e=>updateCurrentContent(e.target.value)} onBlur={handleBlur} value={currentContent} />
    }
}