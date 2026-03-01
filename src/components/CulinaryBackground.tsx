import { motion } from "framer-motion";

export default function CulinaryBackground() {
    const backgroundItems = [
        { emoji: '🍅', top: '10%', left: '8%', duration: 25 },
        { emoji: '🥒', top: '8%', left: '45%', duration: 28 },
        { emoji: '🥬', top: '15%', right: '12%', duration: 30 },
        { emoji: '🥕', top: '60%', left: '30%', duration: 32 },
        { emoji: '🔪', top: '40%', right: '18%', duration: 34, baseRotate: 12 },
        { emoji: '🧄', bottom: '35%', left: '8%', duration: 36 },
        { emoji: '🥔', bottom: '45%', right: '8%', duration: 38 },
        { emoji: '🧅', bottom: '10%', left: '25%', duration: 40 },
        { emoji: '🍄', bottom: '5%', left: '54%', duration: 27 },
        { emoji: '🍳', bottom: '12%', right: '20%', duration: 31 },
        { emoji: '🫑', top: '30%', left: '20%', duration: 33 },
        { emoji: '🥦', bottom: '25%', right: '35%', duration: 37 },
        { emoji: '🌶️', top: '32%', left: '56%', duration: 41 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none select-none z-0">
            {backgroundItems.map((item, index) => {
                const baseRotate = item.baseRotate || 0;
                return (
                    <motion.div
                        key={index}
                        className="absolute text-7xl opacity-40"
                        style={{
                            ...(item.top && { top: item.top }),
                            ...(item.bottom && { bottom: item.bottom }),
                            ...(item.left && { left: item.left }),
                            ...(item.right && { right: item.right }),
                            willChange: "transform"
                        }}
                        animate={{
                            y: [0, -20, 10, 0],
                            x: [0, 10, -10, 0],
                            rotate: [baseRotate, baseRotate + 3, baseRotate - 3, baseRotate]
                        }}
                        transition={{
                            duration: item.duration,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {item.emoji}
                    </motion.div>
                );
            })}
        </div>
    );
}
