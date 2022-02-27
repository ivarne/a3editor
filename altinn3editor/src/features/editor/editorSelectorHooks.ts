import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { Component } from "../../generated/typescript-schema/layout-inheritanceFixes";

interface ComponentExtended{
    component: Component,
    boundResource: {[key:string]: string} 
}

export function useEditorSelector(page: string){
    const root = useAppSelector((state)=>state.repo?.current, shallowEqual);
    return root?.layouts[page]?.data?.layout?.map<ComponentExtended>(component=>({
        component: component,
        boundResource: ObjectMap(component.textResourceBindings ?? {}, (_, id)=>root.resources.nb?.resources.find(r=>r.id === id)?.value ?? "")
    }))
}

function ObjectMap<I, O>(o:{[key:string]: I}, mapFun:(key:string, value:I)=>O){
    return Object.keys(o).reduce((result, key)=>{
        result[key] = mapFun(key, o[key]);
        return result;
    }, {} as {[key:string]: O})
}