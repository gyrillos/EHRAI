import {useEffect} from "react";
import { useLocation } from "react-router-dom";
import FileViewer from "../components/FileViewer/FileViewer";
import ReviewDetails from "../components/ReviewDetails/ReviewDetails";
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
                <ReviewDetails job={job}></ReviewDetails>
            </div>
        </div>
    );
}


export default Review;