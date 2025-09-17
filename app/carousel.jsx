"use client";
import React from "react";
import Image from "next/image";
import Number from "./number";
import useElementPosition from "./hooks/useElementPosition";
import Price from "./Price";
import Commander from "./Commander";

// Image component with 3D effects and floating animation
const ImageWithEffects = ({ index, src, obj, popup }) => {
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
		rotationAxis: "x", // X axis for horizontal wheel effect
		perspective: 1000,
	});

	const imageContainerRef = React.useRef(null);
	const animationRef = React.useRef(null);

	// Create unique floating animation for each image
	React.useEffect(() => {
		if (!imageContainerRef.current) return;

		const container = imageContainerRef.current;

		// Generate unique animation parameters for each image
		const amplitude = 8 + (index % 7) * 2; // Vertical movement range: 8-20px
		const period = 4000 + (index % 5) * 1000; // Duration: 4-8 seconds
		const phaseOffset = (index * 47) % 360; // Different starting points
		const rotationAmplitude = 0.3 + (index % 3) * 0.2; // Rotation: 0.3-0.7 degrees

		let startTime = null;

		const animate = (timestamp) => {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;

			// Calculate floating position using sine wave
			const progress = (elapsed / period) * 3 * Math.PI;
			const yOffset =
				Math.sin(progress + (phaseOffset * Math.PI) / 180) * amplitude;
			const rotation =
				Math.sin(progress * 1.3 + (phaseOffset * Math.PI) / 180) *
				rotationAmplitude;

			// Apply transform
            if(!popup) {
			container.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
            }

			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);

		// Cleanup
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [index]);

	// Debug: log the style to see if transforms are being applied
	React.useEffect(() => {
		// console.log('Transform style:', style);
	}, [style]);

	return (
		<div ref={elementRef} className="embla__slide__number" style={style}>
                        {popup && <Popup obj={obj} />}

			<div ref={imageContainerRef} className="image-container">
				<Image
					src={`/${src}.png`}
					alt={`Slide ${index + 1}`}
					width={700}
					height={1000}
				/>
			</div>
		</div>
	);
};

import { useState } from "react";
import Popup from "./popup";


const SlideContent = ({ obj, index }) => {
	const [popup, setPopup] = useState(false);

	function handleCommander(obj) {
		setPopup(!popup);
		console.log(obj);
	}

	return (
		<>
			<Number number={obj.imageNUM} index={index} />
			<Commander obj={obj} callback={handleCommander} />
			<ImageWithEffects src={obj.imageNUM} index={index} obj={obj} popup={popup} />
			<Price obj={obj} index={index} />
		</>
	);
};

const EmblaCarousel = (props) => {
	// Note: Wheel and scroll tracking is now handled by individual Number components
	// using the useElementPosition hook for better performance and cleaner separation of concerns
	return (
		<div className="carousel-container">
			<div className="scroll-container">
				<div className="embla__slide embla__slide--first"></div>

				{props.slides.map((obj, index) => (
					<div
						className={`embla__slide ${
							index === 0 ? "embla__slide--second" : ""
						}`}
						key={index}
					>
						<SlideContent obj={obj} index={index} />
					</div>
				))}
			</div>
		</div>
	);
};

export default EmblaCarousel;
