import {useEffect, useState} from "react";
import UploadButton from "../components/UploadButton/UploadButton";
import UploadBox from "../components/UploadBox/UploadBox"
import UploadDetails from "../components/UploadDetails/UploadDetails";
import "./Upload.css"

function Upload() {
    const [unprocessedJobs, setUnprocessedJobs] = useState([]);
    const [processedJobs, setProcessedJobs] = useState([]);
    const [confirmedJobs, setConfirmedJobs] = useState([]);

    async function loadJobs() {
        const unprocessedRes = await fetch("http://localhost:8080/api/jobs/unprocessed");
        const processedRes = await fetch("http://localhost:8080/api/jobs/readytobeattached");
        const confirmedRes = await fetch("http://localhost:8080/api/jobs/confirmed");

        const unprocessedData = await unprocessedRes.json();
        const processedData = await processedRes.json();
        const confirmedData = await confirmedRes.json();

        setUnprocessedJobs(unprocessedData);
        setProcessedJobs(processedData);
        setConfirmedJobs(confirmedData);
    }

    useEffect(() => {
        document.title = "Upload";
    }, []);

    useEffect(() => {
        loadJobs();
    }, []);

    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <div className="everything">
        <div className="layoutUpload">
            <UploadBox setJob={setSelectedJob} unprocessedJobs={unprocessedJobs} processedJobs={processedJobs} confirmedJobs={confirmedJobs}></UploadBox>
            <UploadButton loadJobs={loadJobs}></UploadButton>
        </div>
        <UploadDetails job={selectedJob} loadJobs={loadJobs}></UploadDetails>
        </div>
    );
}

export default Upload;