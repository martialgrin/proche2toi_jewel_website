"use client";
import React from "react";
import Image from "next/image";
import Number from "./number";
import useElementPosition from "./hooks/useElementPosition";
import Price from "./Price";
import Commander from "./Commander";

// Image component with 3D effects and floating animation
const ImageWithEffects = ({ index, src, obj, popup, setPopup }) => {
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

	// Generate CSS animation class based on index
	const getAnimationClass = (index) => {
		return `float-animation-${index % 21}`; // Cycle through 0-20
	};

	// Debug: log the style to see if transforms are being applied
	React.useEffect(() => {
		// console.log('Transform style:', style);
	}, [style]);

	return (
		<div ref={elementRef} className="embla__slide__number">
                        {popup && <Popup obj={obj} setPopup={setPopup} />}

			<div 
			ref={imageContainerRef} 
			className={`image-container ${getAnimationClass(index)} ${popup ? 'popup-active' : ''}`}
		>
				<Image
					src={`/${src}.png`}
					alt={`Slide ${index + 1}`}
					width={700}
					height={1000}
					loading="eager"
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

        <ImageWithEffects src={obj.imageNUM} index={index} obj={obj} popup={popup} setPopup={setPopup} />
<div className="slide-infos">
			<Number number={obj.imageNUM} index={index} />
			<Commander obj={obj} callback={handleCommander} />
			<Price obj={obj} index={index} />
            </div>
		</>
	);
};

    const EmblaCarousel = (props) => {
        // Filter slides based on the filter prop
        const filteredSlides = props.filter === "all" 
            ? props.slides 
            : props.slides.filter(slide => slide.type === props.filter);

        
	// Note: Wheel and scroll tracking is now handled by individual Number components
	// using the useElementPosition hook for better performance and cleaner separation of concerns
	return (
		<div className="carousel-container">
			<div className="scroll-container">
				<div className="embla__slide embla__slide--first"></div>

				{filteredSlides.map((obj, index) => (
					<div
						className={`embla__slide ${
							index === 0 ? "embla__slide--second" : ""
						}`}
                        style={{zIndex: filteredSlides.length - index}}
						key={index}
					>
						<SlideContent obj={obj} index={index}  />
					</div>
				))}
			</div>
		</div>
	);
};

export default EmblaCarousel;
