import {useEffect} from "react";
import { useLocation } from "react-router-dom";

function Review() {

    useEffect(() => {
        document.title = "Review";
    }, []);

    const location = useLocation();
    const job = location.state?.job

    return (
        <></>
    );
}


export default Review;