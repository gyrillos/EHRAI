import "./FileViewer.css";
import { useEffect } from "react";


function FileViewer({job}) {

    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        async function loadPages() {
            const result = await window.electronAPI.countPages("C:/Users/kyril/EHR_AI/Python/previews");
            setPageCount(result.count);
        }

        loadPages();
        }, []);

    return(
        <div className="fileViewer">
            <div className="fileViewerHeader">
                <h3>{job != null ? job.fileLocation.split("\\").pop() : ""}</h3>

            </div>
        </div>
    );
}

export default FileViewer;