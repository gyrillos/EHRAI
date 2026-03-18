import "./UploadBox.css"
import {useState, useEffect} from "react";

function UploadBox({setJob, unprocessedJobs, processedJobs, confirmedJobs}) {


    return(
        <div className="box">
            <div className="sectionBox">
                <h3 className="headerBox">Unprocessed</h3>
                <ul className="list">
                    {unprocessedJobs.map((job) => (
                        <li key={job.id} className="listItem" onClick={() => setJob(job)}>
                            {job.fileLocation.split("\\").pop()}
                        </li>
                    ))}
                </ul>
            </div>
    
            <div className="sectionBox">
                <h3 className="headerBox">Ready to be Attached</h3>
                <ul className="list">
                    {processedJobs.map((job) => (
                        <li key={job.id} className="listItem" onClick={() => setJob(job)}>
                                {job.fileLocation.split("\\").pop()}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sectionBox">
                <h3 className="headerBox">Completed</h3>
                <ul className="list">
                    {confirmedJobs.map((job) => (
                        <li key={job.id} className="listItem" onClick={() => setJob(job)}>
                            {job.fileLocation.split("\\").pop()}
                        </li>
                    ))}
                </ul>
            </div>
            
            
        </div>
    );
}

export default UploadBox;