import {useEffect} from "react";
import { useLocation } from "react-router-dom";
import FileViewer from "../components/FileViewer/FileViewer";
import ReviewDetails from "../components/ReviewDetails/ReviewDetails";
import ScanButton from "../components/ScanButton/ScanButton";
import "./Review.css";

function Review() {

    useEffect(() => {
        document.title = "Review";
    }, []);

    const location = useLocation();
    const job = location.state?.job

    return (
        <div className="everythingReview">
            <div className="reviewLayout">
                <FileViewer job={job}></FileViewer>
                <ReviewDetails job={job} isReview={true}></ReviewDetails>
            </div>
            <ScanButton></ScanButton>
        </div>
    );
}


export default Review;