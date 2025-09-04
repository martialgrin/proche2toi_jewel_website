"use client";
import React from "react";
import Image from "next/image";
import Number from "./number";
import useElementPosition from "./hooks/useElementPosition";

// Image component with 3D effects
const ImageWithEffects = ({ index }) => {
	const { elementRef, style } = useElementPosition({
		fadeRange: 250,
		minOpacity: 0.3,
		maxOpacity: 1.0,
		threshold: 0.1,
		// 3D Transform options for images - stronger effect for testing
		enable3D: true,
		maxRotation: 1, // stronger rotation for visibility
		maxScale: 1.0,
		minScale: 0.5,
		rotationAxis: 'x', // X axis for horizontal wheel effect
		perspective: 1000,
	});

	// Debug: log the style to see if transforms are being applied
	React.useEffect(() => {
		console.log('Transform style:', style);
	}, [style]);

	return (
		<div ref={elementRef} className="embla__slide__number" style={style}>
			<div className="image-container">
				<Image
					src={`/${
						index < 10
							? "00" + (index + 1)
							: index < 100
							? "0" + (index + 1)
							: index + 1
					}.png`}
					alt={`Slide ${index + 1}`}
					width={400}
					height={1000}
				/>
			</div>
		</div>
	);
};

const EmblaCarousel = (props) => {
	// Note: Wheel and scroll tracking is now handled by individual Number components
	// using the useElementPosition hook for better performance and cleaner separation of concerns
	return (
		<div className="carousel-container">
			<div className="scroll-container">
            <div className="embla__slide embla__slide--first">
				</div>
				
				{props.slides.map((index) => (
					<div className={`embla__slide ${index === 0 ? "embla__slide--second" : ""}`} key={index}>
						<Number number={index + 1} index={index} />
						<ImageWithEffects index={index} />
						<Number number={index + 1} index={index} />
					</div>
				))}
			</div>
		</div>
	);
};

export default EmblaCarousel;
