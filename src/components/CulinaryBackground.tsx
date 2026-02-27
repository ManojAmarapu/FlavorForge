import { motion } from "framer-motion";

export default function CulinaryBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none select-none z-0">

            {/* Top-left */}
            <motion.div
                className="absolute top-[10%] left-[8%] text-7xl opacity-40"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            >
                🍅
            </motion.div>

            {/* Top-mid */}
            <motion.div
                className="absolute top-[8%] left-[45%] text-6xl opacity-30"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            >
                🥒
            </motion.div>

            {/* Top-right */}
            <motion.div
                className="absolute top-[15%] right-[12%] text-7xl opacity-40"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            >
                🥬
            </motion.div>

            {/* Behind 'Discover recipes' text (Carrot) */}
            <motion.div
                className="absolute top-[60%] left-[30%] text-6xl opacity-30"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
            >
                🥕
            </motion.div>

            {/* Mid-right */}
            <motion.div
                className="absolute top-[40%] right-[18%] text-7xl opacity-40 rotate-12"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            >
                🔪
            </motion.div>

            {/* Lower Mid-left */}
            <motion.div
                className="absolute bottom-[35%] left-[8%] text-7xl opacity-40"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            >
                🧄
            </motion.div>

            {/* Lower Mid-right */}
            <motion.div
                className="absolute bottom-[45%] right-[8%] text-6xl opacity-30"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
            >
                🥔
            </motion.div>

            {/* Bottom-left */}
            <motion.div
                className="absolute bottom-[10%] left-[25%] text-7xl opacity-[0.35]"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            >
                🧅
            </motion.div>

            {/* Below 'Start Cooking' button, slight right (Mushroom) */}
            <motion.div
                className="absolute bottom-[18%] left-[53%] text-6xl opacity-30"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            >
                🍄
            </motion.div>

            {/* Bottom-right */}
            <motion.div
                className="absolute bottom-[12%] right-[20%] text-7xl opacity-40"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
            >
                🍳
            </motion.div>

            {/* Scattered Extra 1 */}
            <motion.div
                className="absolute top-[30%] left-[20%] text-6xl opacity-30"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            >
                🫑
            </motion.div>

            {/* Scattered Extra 2 */}
            <motion.div
                className="absolute bottom-[25%] right-[35%] text-6xl opacity-30"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            >
                🥦
            </motion.div>

            {/* Above last 'e' in FlavorForge (Chili) */}
            <motion.div
                className="absolute top-[32%] left-[56%] text-6xl opacity-30"
                animate={{ y: [0, -35, 0], x: [0, 10, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            >
                🌶️
            </motion.div>

        </div>
    );
}
