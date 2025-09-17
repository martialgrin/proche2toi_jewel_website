import useElementPosition from "./hooks/useElementPosition";

const Price = ({ obj, index }) => {
	const price = obj.type === "boucle" ? "30" : "45";
	// Use the position hook to track opacity and 3D transforms based on screen position

	return (
		<div
			className="number-container"
			// style={style}
		>
			<p>{price}CHF</p>
		</div>
	);
};

export default Price;
