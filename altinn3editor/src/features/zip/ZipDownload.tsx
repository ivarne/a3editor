import { useAppSelector } from "../../redux/hooks"
import { doDownloadZip } from "./jsonToZip";

export default function ZipDownload(){
    const repo = useAppSelector(state=>state.currentRepo);
    return <div>
        <button onClick={()=>{doDownloadZip(repo)}}>Download</button>
    </div>
}