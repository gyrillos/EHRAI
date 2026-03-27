import {useEffect} from "react";
import { useLocation } from "react-router-dom";
import FileViewer from "../components/FileViewer/FileViewer";
import ReviewDetails from "../components/ReviewDetails/ReviewDetails";
import AttachButton from "../components/AttachButton/AttachButton";
import "./Review.css";

function Confirm() {

    useEffect(() => {
        document.title = "Confirm";
    }, []);

    const location = useLocation();
    const job = location.state?.job

    return (
        <div className="everythingReview">
            <div className="reviewLayout">
                <FileViewer job={job}></FileViewer>
                <ReviewDetails job={job} isReview={false}></ReviewDetails>
            </div>
            <AttachButton></AttachButton>
        </div>
    );
}


export default Confirm;