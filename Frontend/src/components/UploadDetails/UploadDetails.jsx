import "./UploadDetails.css";
import { CheckSquare, Square } from "lucide-react";
import {useState} from "react";
import "../UploadButton/UploadButton.css";
import { useNavigate } from "react-router-dom";

function UploadDetails({job, loadJobs}) {

    const [showPopup, SetShowPopup] = useState(false);

    const navigate = useNavigate();

    async function deleteButton() {
        const jobID = job.id;
        const deleteFile = await window.electronAPI.deleteFile(job.fileLocation);
        await fetch("http://localhost:8080/api/jobs/"+jobID, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        });
        SetShowPopup(false);
        loadJobs();
    }

    async function ReviewRedirect() {
        const jobID = job.id;
        await fetch("http://localhost:8080/api/converttopng/"+jobID, {
            method: "POST"
        });
        navigate("/review")
    }


    return (
        <div className="details">
            <h3 className="headerDetails">Details</h3>
            {job != null ?
                <>
                <h4 className="nameDetails">{job != null? job.fileLocation.split("\\").pop() : ""}</h4>
                <ul className="listDetails">
                    <li className="listItemDetails"><b>File Location: </b>{job.fileLocation}</li>
                    <li className="listItemDetails">{job.isProcessed == true ? <CheckSquare/> : <Square/>} Processed {job.isProcessed == true ? "" : <button className="buttonDetails" onClick={ReviewRedirect}>Use AI</button>}</li>
                    <li className="listItemDetails">{job.isConfirmed == true ? <CheckSquare/> : <Square/>} Attached {job.isConfirmed == false && job.isProcessed == true ? <button className="buttonDetails">Attach File</button> : ""}</li>
                    <li className="listItemDetails" onClick={() => SetShowPopup(true)}><button className="deleteButtonDetails">Delete File</button></li>
                    {showPopup ? <li className="listItemDetails"><div className="popupDetails"><h5>Delete this file from users local machine?</h5><div className="popupButtonDetails"><button className="buttonDetails" onClick={() => SetShowPopup(false)}>Cancel</button><button className="deleteButtonDetails" onClick={() => deleteButton()}>Delete</button></div></div></li> : ""}
                </ul>   
                </>
            : ""}
        </div>
    );
}

export default UploadDetails;