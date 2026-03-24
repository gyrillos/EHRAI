import "./FileViewer.css";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight} from "lucide-react";


function FileViewer({job}) {

    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(0);

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
                <div className="pageSelector">
                    <p><ChevronLeft onClick={() => currPage > 0 ? setCurrPage(currPage - 1) : currPage}></ChevronLeft>{currPage + 1} of {pageCount}<ChevronRight onClick={() => currPage + 1 < pageCount ? setCurrPage(currPage+1): currPage}></ChevronRight></p>
                </div>
            </div>
            <div className="fileViewerPage"></div>
            <div className="fileViewerFooter">

            </div>
        </div>
    );
}

export default FileViewer;