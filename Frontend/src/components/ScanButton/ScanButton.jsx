import "./ScanButton.css";

function ScanButton() {

    function scanDocument() {
        fetch("http://localhost:8080/api/useAI", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }})
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.error(err));
    }

    return(
        <div className="attachButtonArea">
            <button className="attachButton" onClick={scanDocument}>Scan Doc with AI</button>
        </div>
    );
}

export default ScanButton;
