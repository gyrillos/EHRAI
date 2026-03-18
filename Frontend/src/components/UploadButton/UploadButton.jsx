import {useRef} from "react";
import "./UploadButton.css";


function UploadButton({loadJobs}) {

  const chooseFile = async () => {
    const paths = await window.electronAPI.selectFile();
    if (paths.length === 0) return;

    for (let i = 0; i < paths.length; i++) {
        await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            fileLocation: paths[i],
            isConfirmed: false,
            isProcessed: false
         })
        });
    }
    };

  return <button className="button" onClick={async () => {
    await chooseFile();
    loadJobs();
  }}>Upload Documents</button>;
}

export default UploadButton;