import { useState } from "react";
const Popup = ({ obj, setPopup }) => {
	console.log("popup from popup.jsx");

    const [feedbackCopyMessage, setFeedbackCopyMessage] = useState("Copier le message");
	let message = `Hello,
						<br /> je souhaite réserver le bijou n°{obj.imageNUM} au prix de{" "}
						{obj.type === "boucle" ? "30" : "45"}CHF. Merci !`;
	
    
    function feedbackCopy() {
        setFeedbackCopyMessage("Message copié");
        setTimeout(() => {
            setFeedbackCopyMessage("Copier le message");
        }, 2000);
    }
    
    return (
		<div className="popup-container">
			<div className="popup-content">
				<div className="popup-close-container">
					<button
						className="popup-close-button"
						onClick={() => {
							setPopup(false);
						}}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<line
								x1="5"
								y1="5"
								x2="19"
								y2="19"
								stroke="#000"
								strokeWidth="2"
								strokeLinecap="round"
							/>
							<line
								x1="19"
								y1="5"
								x2="5"
								y2="19"
								stroke="#000"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				</div>
				<p className="indication">
					Tu peux copier coller ce texter sur instagram et me l'envoyer par
					message privé
				</p>
				<div className="popup-message-send">
					<p>
						Coucou,
						<br /> je souhaite acheter le bijou n°{obj.imageNUM} au prix de{" "}
						{obj.type === "boucle" ? "30" : "45"}CHF. <br /> Merci !
					</p>
				</div>
				<div className="popup-button">
					<button
                    className="popup-button-copy"
						onClick={() => {
                            feedbackCopy();
							const text = `Coucou,
je souhaite acheter le bijou n°${obj.imageNUM} au prix de ${
								obj.type === "boucle" ? "30" : "45"
							}CHF. Merci !`;
							if (
								navigator &&
								navigator.clipboard &&
								navigator.clipboard.writeText
							) {
								navigator.clipboard.writeText(text);
							} else {
								const textarea = document.createElement("textarea");
								textarea.value = text;
								document.body.appendChild(textarea);
								textarea.select();
								try {
									document.execCommand("copy");
								} catch (err) {}
								document.body.removeChild(textarea);
							}
						}}
					>
                        {feedbackCopyMessage}
					</button>
					<a
						href="https://www.instagram.com/proche2toi/"
						target="_blank"
						rel="noopener noreferrer"
                        className="popup-button-copy-link"
					>
						<button className="popup-button-copy">Aller sur instagram</button>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Popup;
