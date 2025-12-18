"use client"

import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { useRef } from "react"

function ImageItem({
    src,
    scrollYProgress,
    index,
}: {
    src: string
    scrollYProgress: MotionValue<number>
    index: number
}) {
    // Translate image up/down based on scroll
    const y = useTransform(scrollYProgress, [0, 1], [50 * (index + 1), -50 * (index + 1)])

    return (
        <motion.div style={{ ...item, y }}>
            <img src={src} style={imageStyle} />
        </motion.div>
    )
}

export default function ScrollImageWindow() {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({ container: containerRef })

    const images = [
        "/6924ac9115cf56dca98f75f23af6d235.jpg",
        "/431276becfcf338b7207c8b3d130996b.jpg",
        "/c3aa801d048163010d920aa4e2e7ff20.jpg",
        "/1d8d9cd7be757af8ba51e672959d886b.jpg",
        "/97909de05a595ed860c8abe7a95787f2.jpg",
    ]

    return (
        <div ref={containerRef} style={scrollWindow}>
            {images.map((src, i) => (
                <ImageItem key={i} src={src} scrollYProgress={scrollYProgress} index={i} />
            ))}
        </div>
    )
}

/**
 * ===================== Styles =====================
 */
const scrollWindow: React.CSSProperties = {
    height: 450,
    overflowY: "auto",
    border: "4px solid #facc15",
    borderRadius: 24,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
    backgroundColor: "#ffffff",
}

const item: React.CSSProperties = {
    width: 370,
    height: 450,
    borderRadius: 24,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    objectFit: "cover",
}
