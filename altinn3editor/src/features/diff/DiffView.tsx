import { diff } from "deep-object-diff";
import { useAppSelector } from "../../redux/hooks";
import ZipDownload from "../zip/ZipDownload";

export default function Diff() {
  const initialRepo = useAppSelector((s) => s.initialRepo);
  const currentRepo = useAppSelector((s) => s.currentRepo);
  const differences = diff(initialRepo, currentRepo);
  // TODO: actually show a diff in browser
  return (
    <div>
      <ZipDownload />
      <pre>{JSON.stringify(differences, null, 4)}</pre>
    </div>
  );
}
