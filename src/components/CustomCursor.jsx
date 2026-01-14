import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const [mode, setMode] = useState("default")
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const detect = (e) => {
      const el = e.target
      
      const isTailwindPointer = el.classList.contains("cursor-pointer") || el.closest(".cursor-pointer")
      const style = window.getComputedStyle(el)
      const isComputedPointer = style.cursor === "pointer"

      if (
        el.tagName === 'INPUT' || 
        el.tagName === 'TEXTAREA' || 
        style.cursor === 'text'
      ) {
        setMode("text")
      } 
      else if (
        isTailwindPointer || 
        isComputedPointer ||
        el.tagName === 'A' || 
        el.tagName === 'BUTTON' ||
        el.closest("a") || 
        el.closest("button")
      ) {
        setMode("pointer")
      } 
      else {
        setMode("default")
      }
    }

    const down = () => setIsClicking(true)
    const up = () => setIsClicking(false)

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", detect)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", detect)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
    }
  }, [mouseX, mouseY])

  const variants = {
    default: {
      height: 40,
      width: 40,
      backgroundColor: "transparent",
      borderWidth: "1px",
      borderColor: "white",
      scale: isClicking ? 0.9 : 1,
    },
    pointer: {
      height: 60,
      width: 60,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderWidth: "0px",
      borderColor: "transparent",
      scale: isClicking ? 0.9 : 1,
    },
    text: {
      height: 24, // Reduced height slightly for better precision
      width: 2,   // Changed from 4 to 2 (Much thinner)
      backgroundColor: "white",
      borderWidth: "0px",
      scale: 1,
    }
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white mix-blend-difference"
        style={{ 
            x: mouseX, 
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%"
        }}
        animate={{
            scale: mode === "text" ? 0 : 1 
        }}
        transition={{ duration: 0.15 }}
      >
          <div className="w-3 h-3 bg-white rounded-full" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full mix-blend-difference"
        style={{ 
          x: springX, 
          y: springY,
          translateX: "-50%",
          translateY: "-50%" 
        }}
        variants={variants}
        animate={mode}
        transition={{
            type: "spring",
            stiffness: 400,
            damping: 28
        }}
      />
    </>
  )
}

export default CustomCursor