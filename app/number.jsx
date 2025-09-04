import useElementPosition from './hooks/useElementPosition';

const Number = ({ number, index }) => {
    const formattedNumber = index < 10 ? "00" + (index + 1) : index < 100 ? "0" + (index + 1) : index + 1;
    
    // Use the position hook to track opacity and 3D transforms based on screen position
    const { elementRef, style } = useElementPosition({
        fadeRange: 300, // Distance from center where fade effect starts
        minOpacity: 1.0, // Minimum opacity when far from center
        maxOpacity: 1.0, // Maximum opacity when at center
        threshold: 1,  // Intersection observer threshold
        // 3D Transform options for wheel effect
        enable3D: true,
        maxRotation: 25, // degrees of rotation at maximum distance
        maxScale: 1.0,   // scale when at center
        minScale: 0.2,   // scale when far from center
        rotationAxis: 'x', // rotate on X axis for wheel effect
        perspective: 8000,
    });

    return (
        <div 
            ref={elementRef}
            className="number-container" 
            style={style}
        >
            {formattedNumber}
        </div>
    );
};

export default Number;