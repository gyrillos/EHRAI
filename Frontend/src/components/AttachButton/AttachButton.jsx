import "./AttachButton.css";

function AttachButton() {

    function sendtoAllscripts() {
        console.log("sending to allscripts");
    }

    return(
        <div className="attachButtonArea">
            <button className="attachButton" onClick={sendtoAllscripts}>Send to Allscripts</button>
        </div>
    );
}

export default AttachButton;