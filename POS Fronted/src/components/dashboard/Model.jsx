import React from 'react'
import { motion } from "framer-motion"

const Modal = ({ onClose }) => {
    return (
        <div
            className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
            onClick={onClose}   // background click close
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='bg-[#262626] p-6 rounded-lg shadow-lg w-96'
                onClick={(e) => e.stopPropagation()} // modal click stop
            >

                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-lg font-semibold">Modal Title</h2>
                    <button
                        onClick={onClose}
                        className="text-white text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Body */}
                <p className="text-gray-300">
                    This is modal content
                </p>

            </motion.div>
        </div>
    )
}

export default Modal