"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import EmblaCarousel from "./carousel";
import Header from "./header";
import content from "../public/content.json";
import { useRef } from "react";

export default function Home() {
	const OPTIONS = { axis: "y", dragFree: true, loop: true };
	const SLIDES = content;

    const [filter, setFilter] = useState("all");

const videoRef = useRef();
	
	const [isPortrait, setIsPortrait] = useState(false);

	useEffect(() => {
		const checkOrientation = () => {
			setIsPortrait(window.innerHeight > window.innerWidth);
		};

		// Check initial orientation
		checkOrientation();

		// Add event listener for orientation/resize changes
		window.addEventListener('resize', checkOrientation);
		window.addEventListener('orientationchange', checkOrientation);

		// Cleanup event listeners on unmount
		return () => {
			window.removeEventListener('resize', checkOrientation);
			window.removeEventListener('orientationchange', checkOrientation);
		};
	}, []);

	return (
		
		<div className="h-screen">
			<Header videoRef={videoRef} setFilter={setFilter} filter={filter} />

			<div className="video-container" ref={videoRef}>
				<video
					autoPlay
					loop
					muted
					playsInline
					preload="metadata"
					key={isPortrait ? "portrait" : "landscape"}
				>
					<source src={isPortrait ? "/Portrait.webm" : "/Landscape.webm"} type="video/webm" />
					<source src={isPortrait ? "/Portrait.mp4" : "/Landscape.mp4"} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<div className="video-overlay">
			
				</div>
			</div>

			<EmblaCarousel slides={SLIDES} options={OPTIONS} filter={filter} setFilter={setFilter} />
		</div>
	);
}
