import { useState } from "react";
export const Commander = ({obj, callback}) => {


const [content, setContent] = useState("Commander");
    const handleCommander = (e) => {
        if(content === "Commander") {
            setContent("fermer");
        } else {
            setContent("Commander");
        }
        console.log(obj);
        callback(obj);

    }
	return (
        <div className="commander-container">
		<button onClick={(e) => handleCommander(e)}>
				<p>{content}</p>
			</button>
		</div>
	);
};

export default Commander;