import "./Icon.css";


function Icon({item : Icon, name}) {
    return (
        <div className="icon">
            <Icon size={30}></Icon>
            <p>{name}</p>
        </div>
    );
}


export default Icon;