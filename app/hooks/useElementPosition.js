import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook to track element position relative to viewport center
 * and calculate opacity + 3D transforms based on distance from center
 */
const useElementPosition = ({
	threshold = 0.2,
	fadeRange = 200, // pixels from center where fade starts
	minOpacity = 0.3,
	maxOpacity = 1.0,
	// 3D Transform options
	enable3D = true,
	maxRotation = 15, // degrees
	maxScale = 1.0,
	minScale = 0.85,
	rotationAxis = "x", // 'x', 'y', or 'z'
	perspective = 1000,
} = {}) => {
	const [opacity, setOpacity] = useState(maxOpacity);
	const [transform, setTransform] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const elementRef = useRef(null);
	const animationFrameRef = useRef(null);

	const updatePosition = useCallback(() => {
		if (!elementRef.current) {
			console.log("updatePosition: elementRef.current is null");
			return;
		}

		const rect = elementRef.current.getBoundingClientRect();
		const viewportCenterY = window.innerHeight / 2;
		const elementCenterY = rect.top + rect.height / 2;

		// Calculate distance from viewport center
		const distanceFromCenter = Math.abs(elementCenterY - viewportCenterY);

		// Calculate normalized position (-1 to 1, where 0 is center)
		const normalizedPosition =
			(elementCenterY - viewportCenterY) / viewportCenterY;

		// Debug: Log position data every time
		console.log("Position update:", {
			elementTop: rect.top,
			elementCenterY,
			viewportCenterY,
			distanceFromCenter,
			normalizedPosition,
		});

		// Calculate opacity based on distance from center
		let newOpacity;
		if (distanceFromCenter <= fadeRange) {
			// Element is close to center, calculate smooth fade
			const fadeProgress = distanceFromCenter / fadeRange;
			newOpacity = maxOpacity - fadeProgress * (maxOpacity - minOpacity);
		} else {
			// Element is far from center
			newOpacity = minOpacity;
		}

		// Clamp opacity between min and max
		newOpacity = Math.max(minOpacity, Math.min(maxOpacity, newOpacity));

		// Calculate transforms - Safari iOS optimized
		let newTransform = "";
		let rotation = 0; // Declare rotation in the correct scope

		if (enable3D) {
			// Calculate rotation based on position (wheel effect)
			const rotationProgress = Math.min(distanceFromCenter / fadeRange, 1);
			rotation = rotationProgress * maxRotation * Math.sign(normalizedPosition);

			// Calculate scale based on distance from center
			const scaleProgress = Math.min(distanceFromCenter / fadeRange, 1);
			const scale = maxScale - scaleProgress * (maxScale - minScale);

			// Simplified approach for Safari iOS compatibility
			const transforms = [];

			// Add scale first (better performance on iOS)
			transforms.push(`scale(${scale})`);

			// Add rotation based on axis
			switch (rotationAxis) {
				case "x":
					transforms.push(`rotateX(${rotation}deg)`);
					break;
				case "y":
					transforms.push(`rotateY(${rotation}deg)`);
					break;
				case "z":
					transforms.push(`rotateZ(${rotation}deg)`);
					break;
				default:
					transforms.push(`rotateX(${rotation}deg)`);
			}

			// Only add translateZ if distance is significant (avoid micro-movements)
			if (rotationProgress > 0.1) {
				const translateZ = (1 - scaleProgress) * 50; // Reduced for Safari
				transforms.push(`translateZ(${translateZ}px)`);
			}

			newTransform = transforms.join(" ");

			// Debug logging - moved inside the enable3D block
			if (newTransform !== transform) {
				console.log(
					"New transform:",
					newTransform,
					"Distance:",
					distanceFromCenter,
					"Rotation:",
					rotation,
					"Scale:",
					scale,
					"RotationProgress:",
					rotationProgress
				);
			}
		}

		setOpacity(newOpacity);
		setTransform(newTransform);
	}, [
		fadeRange,
		minOpacity,
		maxOpacity,
		enable3D,
		maxRotation,
		maxScale,
		minScale,
		rotationAxis,
	]);

	const throttledUpdate = useCallback(() => {
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
		}

		animationFrameRef.current = requestAnimationFrame(updatePosition);
	}, [updatePosition]);

	useEffect(() => {
		if (!elementRef.current) {
			console.log("useEffect: elementRef.current is null, retrying...");
			return;
		}

		console.log(
			"Setting up observers and listeners for element:",
			elementRef.current
		);

		// Intersection Observer for visibility tracking
		const observer = new IntersectionObserver(
			([entry]) => {
				console.log("Intersection Observer triggered:", entry.isIntersecting);
				setIsVisible(entry.isIntersecting);
				if (entry.isIntersecting) {
					updatePosition();
				}
			},
			{ threshold }
		);

		const currentElement = elementRef.current;
		observer.observe(currentElement);

		// Event listeners for position updates
		const handleScroll = (e) => {
			console.log("Scroll event triggered");
			throttledUpdate();
		};
		const handleWheel = (e) => {
			console.log("Wheel event triggered");
			throttledUpdate();
		};
		const handleResize = (e) => {
			console.log("Resize event triggered");
			throttledUpdate();
		};

		// Listen to scroll on the carousel container specifically
		const carouselContainer = document.querySelector(".carousel-container");
		if (carouselContainer) {
			carouselContainer.addEventListener("scroll", handleScroll, {
				passive: true,
			});
			console.log("Added scroll listener to carousel container");
		}

		window.addEventListener("wheel", handleWheel, { passive: true });
		window.addEventListener("resize", handleResize, { passive: true });

		// Initial position calculation
		console.log("Initial position calculation");
		updatePosition();

		return () => {
			observer.disconnect();
			if (carouselContainer) {
				carouselContainer.removeEventListener("scroll", handleScroll);
			}
			window.removeEventListener("wheel", handleWheel);
			window.removeEventListener("resize", handleResize);

			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [threshold, throttledUpdate, updatePosition]);

	return {
		elementRef,
		opacity,
		transform,
		isVisible,
		style: {
			opacity,
			transform,
			transition: "all 0.0s ease-out",
			// Safari iOS compatibility - remove perspective from individual elements
			WebkitTransform: transform,
			WebkitTransition: "all 0.0s ease-out",
			// Force hardware acceleration
			willChange: "transform, opacity",
			// Ensure proper rendering
			WebkitBackfaceVisibility: "hidden",
			backfaceVisibility: "hidden",
		},
	};
};

export default useElementPosition;
