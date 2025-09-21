import { useState, useEffect } from "react";
export const Commander = ({obj, callback}) => {

const [sold, setSold] = useState(obj.sold);
const [content, setContent] = useState("Commander");
let className = sold ? "commander-container sold" : "commander-container";


// Update sold state when obj.sold changes
useEffect(() => {
    setSold(obj.sold);
    className = sold ? "commander-container sold" : "commander-container";
}, [obj.sold]);


const handleCommander = (e) => {
    if(content === "Commander") {
        setContent("Commandé");
    } else {
        setContent("Commander");
    }
    console.log(obj);
    callback(obj);
}
	return (
        <div className={className + " pill-button"} onClick={(e) => handleCommander(e)} disabled={obj.sold}>
        {obj.sold && <p>Vendu</p>}
        {!obj.sold && (
		<button>
				<p>{content}</p>
			</button>
        )}
		</div>
	);
};

export default Commander;