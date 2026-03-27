import "./ReviewDetails.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ReviewDetails({job, isReview}) {

    const [dateOfService, setDateOfService] = useState("");
    const [dob, setDob] = useState("");
    const [docName, setDocName] = useState("");
    const [docType, setDocType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();
    const [newJob, setNewJob] = useState({});

    useEffect(() => {
        if (isReview == false) {
            async function loadDetails() {
                const res = await fetch(`http://localhost:8080/api/jobs/${job.id}`);
                const data = await res.json();
                setNewJob(data);
                setDob(data.dob || "");
                setDateOfService(data.dateOfService || "");
                setDocName(data.docName || "");
                setDocType(data.docType || "");
                setFirstName(data.firstName || "");
                setLastName(data.lastName || "");
            }
            loadDetails();
            } else {
                setDob(job.dob || "");
                setDateOfService(job.dateOfService || "");
                setDocName(job.docName || "");
                setDocType(job.docType || "");
                setFirstName(job.firstName || "");
                setLastName(job.lastName || "");
                setNewJob(job);
            }
    }, []);

    async function submitForm(e) {
        e.preventDefault();
        await fetch("http://localhost:8080/api/jobs/"+job.id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({firstName, lastName, dob, dateOfService, docName, docType, isProcessed:true})
        });
        navigate("/confirm", {state: {job: {...job, firstName,lastName,dob,dateOfService,docName,docType}}});
    }

    function backtoReview(e) {
        e.preventDefault();
        navigate("/review", {state: {job : {...job, firstName,lastName,dob,dateOfService,docName,docType}}});
    }


    return(
        <div className="reviewDetailsLayout">
            <h3 className="reviewDetailsHeading">Details</h3>
            <form onSubmit={isReview == false ? backtoReview : submitForm} className="reviewDetailsForm">
                <div className="reviewDetailsNames">
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text" placeholder={isReview == false ? job.firstName: "First Name"} value={firstName} onChange={(e) => setFirstName(e.target.value)} className={isReview == false ? "disabled": ""}></input>
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="text" placeholder={isReview == false ? job.lastName: "Last Name"} value={lastName} onChange={(e) => setLastName(e.target.value)} className={isReview == false ? "disabled": ""}></input>
                </div>
                <div className="reviewDetailsDates">
                    <label htmlFor="dob">DOB: </label>
                    <input id="dob" type="date" placeholder={isReview == false ? job.dob: ""} value={dob} onChange={(e) => setDob(e.target.value)} className={isReview == false ? "disabled": ""}></input>
                    <label htmlFor="dos">DOS: </label>
                    <input id="dos" type="date" placeholder={isReview == false ? job.dateOfService: ""} value={dateOfService} onChange={(e) => setDateOfService(e.target.value)} className={isReview == false ? "disabled": ""}></input>
                </div>
                <div className="reviewDetailsDocs">
                    <label htmlFor="dos">Document Type: </label>
                    <select type="text" placeholder={isReview == false ? job.docType: "Document Type"} value={docType} onChange={(e) => setDocType(e.target.value)} className={isReview == false ? "disabled": ""}></select>
                    <label htmlFor="dos">Document Name: </label>
                    <input type="text" placeholder={isReview == false ? job.docName : "Document Name"} value={docName} onChange={(e) => setDocName(e.target.value)} className={isReview == false ? "disabled": ""}></input>
                </div>
                <button type="submit" className="reviewDetailsSubmitButton">{isReview == false ? "Return to Review" :"Confirm and Attach"}</button>
            </form>
            
        </div>
    );
}


export default ReviewDetails;