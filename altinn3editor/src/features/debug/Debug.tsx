import { useAppSelector } from "../../redux/hooks";

export default function Debug(){
    const state = useAppSelector(state=>state);
    return <pre>{JSON.stringify(state, null, 4)}</pre>
}