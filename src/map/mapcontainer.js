import React, { useState, useRef } from 'react';

function MapContainer({src, alt}) {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const correctBounds = () => {
        const containerRect = document.querySelector('.zoom-container').getBoundingClientRect();
        const imageRect = document.querySelector('.zoom-container img').getBoundingClientRect();

        // Calculate the difference in size between the image and the container
        const widthDiff = (imageRect.width - containerRect.width) / 2;
        const heightDiff = (imageRect.height - containerRect.height) / 2;

        // Calculate the bounds considering the difference in size
        const maxX = zoomLevel === 1 ? 0 : widthDiff;
        const maxY = zoomLevel === 1 ? 0 : heightDiff;

        setMousePosition(prevPosition => {
            let { x, y } = prevPosition;

            // Apply constraints to ensure the image stays within bounds
            x = Math.min(Math.max(-maxX, x), maxX);
            y = Math.min(Math.max(-maxY, y), maxY);

            return { x, y };
        });
    };

    const handleZoomIn = () => {
        setZoomLevel(prevZoomLevel => {
            const newZoomLevel = prevZoomLevel * 1.2;
            // Schedule the bounds correction after the state has updated
            setTimeout(() => correctBounds(), 0);
            return newZoomLevel;
        });
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoomLevel => {
            const newZoomLevel = Math.max(prevZoomLevel / 1.2, 1);
            // Schedule the bounds correction after the state has updated
            setTimeout(() => correctBounds(), 0);
            return newZoomLevel;
        });
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - mousePosition.x,
            y: e.clientY - mousePosition.y
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            // Calculate the new position
            let newX = e.clientX - dragStart.x;
            let newY = e.clientY - dragStart.y;

            // Get the container's dimensions
            const containerRect = e.target.closest('.zoom-container').getBoundingClientRect();

            // Prevent panning beyond the image's bounds by setting maximum X and Y values
            const maxX = (zoomLevel - 1) * containerRect.width / 2;
            const maxY = (zoomLevel - 1) * containerRect.height / 2;

            // Apply constraints to the new position
            newX = Math.min(Math.max(newX, -maxX), maxX);
            newY = Math.min(Math.max(newY, -maxY), maxY);

            // Update the state with the constrained position
            setMousePosition({
                x: newX,
                y: newY
            });
            correctBounds(zoomLevel);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };



    return (
        <div
            className="zoom-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}  // Optional, to stop dragging when mouse leaves the div
        >
            <div className="controls">
                <button onClick={handleZoomIn}>+</button>
                <button onClick={handleZoomOut}>-</button>
            </div>
            <img
                src={src}
                alt={alt}
                draggable={false}
                style={{
                    cursor: isDragging ? 'grabbing' : 'grab',
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(${zoomLevel})`,
                    transformOrigin: 'center center'  // Changed to top left corner for easier calculations
                }}
            />
        </div>
    );
};

export default MapContainer;
