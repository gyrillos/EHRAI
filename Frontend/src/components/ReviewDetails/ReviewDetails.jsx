import "./ReviewDetails.css";
import { useState } from "react";

function ReviewDetails({job}) {

    const [dateOfService, setDateOfService] = useState("");
    const [dob, setDob] = useState("");
    const [docName, setDocName] = useState("");
    const [docType, setDocType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    async function submitForm(e) {
        e.preventDefault();
        await fetch("http://localhost:8080/api/jobs/"+job.id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({firstName, lastName, dob, dateOfService, docName, docType})
        });
        navigate("/confirm", {state: {job}})
    }


    return(
        <div className="reviewDetailsLayout">
            <h3 className="reviewDetailsHeading">Details</h3>
            <form onSubmit={submitForm}>
                <div className="reviewDetailsNames">
                    <input type="text" Placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                    <input type="text" Placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                </div>
                <div className="reviewDetailsDates">
                    <input type="text" Placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)}></input>
                    <input type="text" Placeholder="Date of Service" value={dateOfService} onChange={(e) => setDateOfService(e.target.value)}></input>
                </div>
                <div className="reviewDetailsDocs">
                    <input type="text" Placeholder="Document Name" value={docName} onChange={(e) => setDocName(e.target.value)}></input>
                    <input type="text" Placeholder="Document Type" value={docType} onChange={(e) => setDocType(e.target.value)}></input>
                </div>
                <button type="submit" className="reviewDetailsSubmitButton">Confirm and Attach</button>
            </form>
            
        </div>
    );
}


export default ReviewDetails;