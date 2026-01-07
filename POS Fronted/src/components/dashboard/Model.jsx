import React from 'react'
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation } from '@tanstack/react-query';
import { addTable } from '../../https';
import { enqueueSnackbar } from 'notistack';

const Modal = ({ setIsTableModalOpen }) => {

    const [tableData, setTableData] = React.useState({
        tableNo: '',
        seats: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTableData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handkleSubmit = (e) => {
        e.preventDefault();
        console.log(tableData);
        tableMutation.mutate(tableData);
        
    }

    const handleCloseModal = () => {
        setIsTableModalOpen(false);
    }

    const  tableMutation  = useMutation ({
        mutationFn: (reqData) => addTable(reqData),
        onSuccess: (res) => {
            setIsTableModalOpen(false);
            const {data} = res;
           enqueueSnackbar(data.message, { variant: 'success' })
        },
        onError: (error) => {
            const  { data } = error.response;
            enqueueSnackbar(data.message, { variant: 'error' })
            console.log(error);
        }      
    })

    return (
        <div
            className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'
            onClick={setIsTableModalOpen}   // background click close
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
                    <h2 className="text-white text-lg font-semibold">Add Table</h2>
                    <button onClick={handleCloseModal} className="text-[#f5f5f5] hover:text-red-500"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handkleSubmit} action="space-y-4 mt-10">
                    <div className="">
                        <label className="block text-[#ababab] mb-2  mt-3 text-sm font-medium">Table Number</label>
                        <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                            <input
                                type="number"
                                name='tableNo'
                                value={tableData.tableNo}
                                onChange={handleInputChange}
                                className="bg-transparent flex-1  text-white focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="">
                        <label className="block text-[#ababab] mb-2  mt-3 text-sm font-medium">Number of Seats</label>
                        <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                            <input
                                type="number"
                                name='seats'
                                value={tableData.seats}
                                onChange={handleInputChange}
                                className="bg-transparent flex-1  text-white focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900
                    font-bold cursor-pointer'>
                        Add table
                    </button>

                </form>

            </motion.div>
        </div>
    )
}

export default Modal