import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, animate } from 'framer-motion';
import UpdateCard from './UpdateCard';

function UpdatesSlider({ updates }) {
  const containerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Motion value for the x position of the slider track
  const x = useMotionValue(0);
  
  // Ref to track hovering state
  const isHovered = useRef(false);
  
  // Base speed in pixels per frame
  const baseSpeed = 0.8; 
  
  // Duplicate updates to create seamless loop
  // We need enough duplicates to fill the screen width + buffer
  // Triple the items to be safe for wide screens
  const sliderItems = [...updates, ...updates, ...updates];

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      // Calculate single set width based on card width + gap
      // Assuming card width ~320px + gap 24px (1.5rem)
      // This is an approximation; ideally we measure the children
      const singleSetWidth = updates.length * (320 + 24); // 320px width + 24px gap
      setContentWidth(singleSetWidth);
    }
  }, [updates, containerRef]);

  // Animation loop
  useAnimationFrame((t, delta) => {
    if (!isHovered.current && contentWidth > 0) {
      const moveBy = baseSpeed * (delta / 16); // Normalize for 60fps
      let newX = x.get() - moveBy;
      
      // Infinite loop logic:
      // If we have scrolled past the width of one full set of items,
      // reset the position by adding that width back.
      if (newX <= -contentWidth) {
        newX += contentWidth;
      }
      
      x.set(newX);
    }
  });

  const handleManualNav = (direction) => {
    const scrollAmount = 344; // Card width + gap
    const currentX = x.get();
    const targetX = direction === 'next' 
      ? currentX - scrollAmount 
      : currentX + scrollAmount;
      
    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30
    });
  };

  // Expose navigation methods via custom events or context if needed, 
  // but for now we'll rely on parent passing refs or simple prop callbacks? 
  // Since arrows are outside, we need a way to control this.
  // Actually, easiest way is to use `useImperativeHandle` if using forwardRef,
  // or just put the buttons inside this component layout-wise but visually outside.
  // For this task, I'll export the component and assume buttons are passed as children or part of the layout.
  // Let's refactor: The parent `UpdatesSliderSection` will hold the buttons and this component.
  // To control `x` from parent, we can lift state or use a ref.
  // Let's stick to keeping logic here and maybe rendering buttons here? 
  // No, Task 3 says "Add previous/next arrow buttons OUTSIDE the slider container".
  
  // To solve this cleanly: I will attach the navigation function to the window or use a simple event bus, 
  // OR simply put the buttons in `UpdatesSliderSection` and pass a ref to `UpdatesSlider`.
  
  return (
    <div 
      className="w-full overflow-hidden py-4" 
      ref={containerRef}
      onMouseEnter={() => isHovered.current = true}
      onMouseLeave={() => isHovered.current = false}
      onTouchStart={() => isHovered.current = true}
      onTouchEnd={() => isHovered.current = false}
    >
      <motion.div 
        className="flex gap-6"
        style={{ x }}
      >
        {sliderItems.map((update, idx) => (
          <div 
            key={`${update.id}-${idx}`} 
            className="flex-shrink-0 w-[320px]"
          >
            <UpdateCard update={update} />
          </div>
        ))}
      </motion.div>
      
      {/* Hidden button handlers for parent component to trigger */}
      <button id="slider-prev" className="hidden" onClick={() => handleManualNav('prev')} />
      <button id="slider-next" className="hidden" onClick={() => handleManualNav('next')} />
      
      {/* Pagination Dot Logic Placeholder */}
      {/* Since it's a continuous slider, exact pagination is tricky. 
          We'll implement a visual indicator based on x value in the parent 
          or simplified static dots if required by design. */}
    </div>
  );
}

export default UpdatesSlider;