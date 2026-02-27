import { motion } from 'framer-motion';

export const CulinaryBackground = () => (
    <div className="fixed inset-0 pointer-events-none select-none -z-10 opacity-35 mix-blend-soft-light">
        <motion.div className="absolute top-[15%] left-[10%] text-6xl" animate={{ y: [0, -40, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}>🍅</motion.div>
        <motion.div className="absolute top-[25%] right-[15%] text-7xl" animate={{ y: [0, -35, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}>🥕</motion.div>
        <motion.div className="absolute top-[60%] left-[20%] text-6xl" animate={{ y: [0, -45, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}>🧅</motion.div>
        <motion.div className="absolute bottom-[20%] left-[8%] text-5xl" animate={{ y: [0, -30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}>🧄</motion.div>
        <motion.div className="absolute top-[40%] right-[10%] text-7xl rotate-12" animate={{ y: [0, -50, 0] }} transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}>🔪</motion.div>
        <motion.div className="absolute bottom-[10%] right-[25%] text-7xl" animate={{ y: [0, -40, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}>🍳</motion.div>
        <motion.div className="absolute top-[10%] right-[30%] text-6xl" animate={{ y: [0, -35, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}>🥬</motion.div>
    </div>
);
