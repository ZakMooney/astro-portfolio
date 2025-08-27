import React, { useState, useRef } from "react";
import { motion } from "motion/react";

export const Panel = ({
  children,
  showStatusDots = false,
  statusDotCount = 3,
  activeDotIndex = 0,
  borderColor = "rgba(56, 189, 248, 1)",
  backgroundColor = "rgba(0, 20, 40, 0.3)",
  textColor = "rgba(206, 239, 253, 1)",
  cornerTL = 0,
  cornerTR = 0,
  cornerBL = 0,
  cornerBR = 20,
  borderWidth = 1,
  className = "",
  style = {},
  contentClassName = "",
  panelClassName = "",
  childrenClassName = "",
  onStatusDotClick,
  hasScan = true,
  index = 0,
  variant = 'default',
}) => {
  const topLeft = cornerTL;
  const topRight = cornerTR;
  const bottomLeft = cornerBL;
  const bottomRight = cornerBR;

  let tScrollOffset = Math.max(topLeft, topRight) || 0;
  let bScrollOffset = Math.max(bottomLeft, bottomRight) || 0;

  const diagonalWidth = (borderWidth + 1) * Math.sqrt(2);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const hoverRef = useRef(null);

  const handleMouseMove = (e) => {
    if (hasScan) {
      if (hoverRef.current) {
        const rect = hoverRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  let useMotion = false;

  return (
    <motion.div
      ref={hoverRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`panel-container w-full relative ${className}`}
      style={{
        ...style,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        initial={variant === 'default' ? {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        } : variant === 'label' ? {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
        } : undefined}
        
        animate={variant === 'default' ? {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        } : variant === 'label' ? {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        } : undefined}
        
        transition={variant === 'default' ? {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.2
        } : variant === 'label' ? {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.2
        } : undefined}
        className="w-full h-full relative"
      >
        {variant === 'default' ? (
          <>
            {/* trailing wave */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.2
              }}
            >
              <motion.div
                className="w-1 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm"
                initial={{ opacity: 1 }}
                animate={{
                  opacity: [1, 0.8, 0]
                }}
                transition={{
                  duration: 0.7,
                  times: [0, 0.6, 1],
                  ease: "easeOut",
                  delay: index * 0.2
                }}
              />
            </motion.div>
                    </>
        ) : (null)}

        {/* clip path panel */}
        <div
          className={panelClassName}
          style={{
            width: "100%",
            minHeight: "40px",
            position: "relative",
            background: backgroundColor,
            clipPath: `polygon(
              0 ${topLeft}px, ${topLeft}px 0,
              calc(100% - ${topRight}px) 0, 100% ${topRight}px,
              100% calc(100% - ${bottomRight}px), calc(100% - ${bottomRight}px) 100%,
              ${bottomLeft}px 100%, 0 calc(100% - ${bottomLeft}px)
            )`,
          }}
        >
          {hasScan ? (
            <div
              className={`hover-scanlines pointer-events-none absolute inset-0 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
              style={{
                maskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, 
                black 0%,
                rgba(0,0,0,0.5) 50%,
                transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, 
                black 0%,
                rgba(0,0,0,0.5) 50%,
                transparent 100%)`,
              }}
            />
          ) : null}

          {/* top border */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${topLeft}px`,
              right: `${topRight}px`,
              height: `${borderWidth}px`,
              background: borderColor,
            }}
          />

          {/* bottom border */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: `${bottomLeft}px`,
              right: `${bottomRight}px`,
              height: `${borderWidth}px`,
              background: borderColor,
            }}
          />

          {/* left border */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: `${topLeft}px`,
              bottom: `${bottomLeft}px`,
              width: `${borderWidth}px`,
              background: borderColor,
            }}
          />

          {/* right border */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: `${topRight}px`,
              bottom: `${bottomRight}px`,
              width: `${borderWidth}px`,
              background: borderColor,
            }}
          />

          {/* top left corner */}
          {topLeft > 0 && (
            <div
              style={{
                position: "absolute",
                top: `${topLeft / 2}px`,
                left: `${topLeft / 2}px`,
                width: `${topLeft * Math.sqrt(2)}px`,
                height: `${diagonalWidth}px`,
                background: borderColor,
                transformOrigin: "center",
                transform: "translate(-50%, -50%) rotate(-45deg)",
              }}
            />
          )}
          {/* topright corner */}
          {topRight > 0 && (
            <div
              style={{
                position: "absolute",
                top: `${topRight / 2}px`,
                right: `${topRight / 2}px`,
                width: `${topRight * Math.sqrt(2)}px`,
                height: `${diagonalWidth}px`,
                background: borderColor,
                transformOrigin: "center",
                transform: "translate(50%, -50%) rotate(45deg)",
              }}
            />
          )}
          {/* bottom left corner */}
          {bottomLeft > 0 && (
            <div
              style={{
                position: "absolute",
                bottom: `${bottomLeft / 2}px`,
                left: `${bottomLeft / 2}px`,
                width: `${bottomLeft * Math.sqrt(2)}px`,
                height: `${diagonalWidth}px`,
                background: borderColor,
                transformOrigin: "center",
                transform: "translate(-50%, 50%) rotate(45deg)",
              }}
            />
          )}
          {/* bottom right corner */}
          {bottomRight > 0 && (
            <div
              style={{
                position: "absolute",
                bottom: `${bottomRight / 2}px`,
                right: `${bottomRight / 2}px`,
                width: `${bottomRight * Math.sqrt(2)}px`,
                height: `${diagonalWidth}px`,
                background: borderColor,
                transformOrigin: "center",
                transform: "translate(50%, 50%) rotate(-45deg)",
              }}
            />
          )}
          
          {/* content */}
          <div
            className={`
              panel-content p-2 md:p-4
              ${contentClassName}
            `.trim()}
            style={{
              position: "relative",
              color: textColor,
              paddingTop: `${Math.max(borderWidth + tScrollOffset, 16)}px`,
              paddingBottom: `${Math.max(borderWidth + bScrollOffset, 16)}px`,
              paddingLeft: `${Math.max(borderWidth, 16)}px`,
              paddingRight: `${Math.max(borderWidth, 16)}px`,
            }}
          >
            {/* children wrapper */}
            <div
              className={`${childrenClassName}`}
              style={{ position: "relative" }}
            >
              {children}
            </div>
          </div>

          {/* status */}
          {showStatusDots && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "20px",
                display: "flex",
                gap: "8px",
                zIndex: 20,
                pointerEvents: "none",
              }}
            >
              {Array.from({ length: statusDotCount }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: borderColor,
                    opacity: i === activeDotIndex ? 1 : 0.6,
                    cursor: onStatusDotClick ? "pointer" : "default",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
};
