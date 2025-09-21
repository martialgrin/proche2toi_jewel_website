import { useState } from "react";
export const Commander = ({obj, callback}) => {


const [sold, setSold] = useState(obj.sold);
const className = sold ? "commander-container sold" : "commander-container";
const [content, setContent] = useState("Commander");
    const handleCommander = (e) => {
        if(content === "Commander") {
            setContent("Commander");
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