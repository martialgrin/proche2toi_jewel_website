const Popup = ({ obj }) => {
	console.log("popup from popup.jsx");
    let message = `Hello,
						<br /> je souhaite réserver le bijou n°{obj.imageNUM} au prix de{" "}
						{obj.type === "boucle" ? "30" : "45"}CHF. Merci !`;
	return (
		<div className="popup-container">
			<div className="popup-content">
				<p>
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
						onClick={() => {
							const text = `Coucou,
je souhaite acheter le bijou n°${obj.imageNUM} au prix de ${obj.type === "boucle" ? "30" : "45"}CHF. Merci !`;
							if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
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
						Copier le message
					</button>
					<a href="https://www.instagram.com/proche2toi/" target="_blank" rel="noopener noreferrer">
						<button>Aller sur instagram</button>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Popup;
