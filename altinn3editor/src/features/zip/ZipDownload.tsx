import { useAppSelector } from "../../redux/hooks"
import { doDownloadZip } from "./jsonToZip";

export default function ZipDownload(){
    const repo = useAppSelector(state=>state.repo.current);
    return <div>
        <button onClick={()=>{doDownloadZip(repo)}}>Download</button>
    </div>
}