import "./ScanButton.css";

function ScanButton() {

    function scanDocument() {
        console.log("sending to allscripts");
    }

    return(
        <div className="attachButtonArea">
            <button className="attachButton" onClick={scanDocument}>Scan Doc with AI</button>
        </div>
    );
}

export default ScanButton;