import { motion } from "framer-motion";

export default function CulinaryBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none select-none z-0">

            <motion.div
                className="absolute top-16 left-20 text-7xl opacity-40"
                animate={{ y: [0, -40, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            >
                🍅
            </motion.div>

            <motion.div
                className="absolute top-1/3 right-24 text-7xl opacity-40"
                animate={{ y: [0, 35, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            >
                🧅
            </motion.div>

            <motion.div
                className="absolute bottom-1/4 left-24 text-7xl opacity-40"
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            >
                🧄
            </motion.div>

            <motion.div
                className="absolute top-1/4 right-12 text-7xl opacity-40 rotate-12"
                animate={{ y: [0, 30, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            >
                🔪
            </motion.div>

            <motion.div
                className="absolute bottom-12 right-1/3 text-7xl opacity-40"
                animate={{ y: [0, -35, 0] }}
                transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
            >
                🍳
            </motion.div>

            <motion.div
                className="absolute top-12 right-1/4 text-7xl opacity-40"
                animate={{ y: [0, 28, 0] }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            >
                🥬
            </motion.div>

        </div>
    );
}
