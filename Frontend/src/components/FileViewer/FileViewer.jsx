import "./FileViewer.css";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut} from "lucide-react";


function FileViewer({job}) {

    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [image, setImage] = useState([]);
    const [zoom, setZoom] = useState(1);

    const previewFolder = "C:/Users/kyril/EHR_AI/Python/previews";

    useEffect(() => {
        async function loadPages() {
            const result = await window.electronAPI.countPages("C:/Users/kyril/EHR_AI/Python/previews");
            setPageCount(result.count);
        }

        loadPages();
        }, []);
    
    useEffect(() => {
        async function loadImages() {
            const result = await window.electronAPI.getPreviewPath(previewFolder, currPage);
            if (result.success) {
                setImage(result.src);
            }
        }
        loadImages();
    }, []);

    


    return(
        <div className="fileViewer">
            <div className="fileViewerHeader">
                <h3>{job != null ? job.fileLocation.split("\\").pop() : ""}</h3>
                <div className="pageSelector">
                    <p><ChevronLeft onClick={() => currPage > 0 ? setCurrPage(currPage - 1) : currPage}></ChevronLeft>{currPage + 1} of {pageCount}<ChevronRight onClick={() => currPage + 1 < pageCount ? setCurrPage(currPage+1): currPage}></ChevronRight></p>
                </div>
            </div>
            <div className="fileViewerPage">
                <img src={image} className="previewImage" style={{transform: `scale(${zoom})`, transformOrigin: "top left"}}></img>
            </div>
            <div className="fileViewerFooter">
                <p><ZoomIn onClick={() => setZoom(zoom+0.5)}></ZoomIn> <ZoomOut onClick={() => setZoom(zoom-0.5)}></ZoomOut></p>
            </div>
        </div>
    );
}

export default FileViewer;