import { useRef } from "react";

export function useHasChanged<T>(value:T){
    const ref = useRef<T>();
    const changed = ref.current !== value;
    ref.current = value;
    return changed;
}