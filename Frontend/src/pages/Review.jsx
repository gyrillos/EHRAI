import {useEffect} from "react";
import { useLocation } from "react-router-dom";
import FileViewer from "../components/FileViewer/FileViewer";

function Review() {

    useEffect(() => {
        document.title = "Review";
    }, []);

    const location = useLocation();
    const job = location.state?.job

    return (
        <div className="reviewLayout">
            <FileViewer job={job}></FileViewer>
        </div>
    );
}


export default Review;