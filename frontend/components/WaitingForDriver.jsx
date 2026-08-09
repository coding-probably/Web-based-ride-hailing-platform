

import uberCarLogo from '../public/image/uberCar.webp';

import { FaStar } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import { MdOutlineEmergencyShare } from "react-icons/md";

import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const WaitingForDriver = (props) => {

    return (
        <>
            <div className='flex flex-col pt-2 pb-2'>

                {/* <div onClick={() => {
                    props.setWaitingForDriver(false);
                }}
                className='h-1 w-4/5 ml-7 bg-gray-500 rounder-1 mb-2'></div> */}



                <div className="flex w-full items-center justify-between">
                    <h2 className="text-lg font-semibold">Meet at the pickup point</h2>
                    <div className="w-[48px] h-[48px] flex flex-col justify-center items-center rounded font-semibold bg-black text-white">
                        <h2>2</h2>
                        <p>min</p>
                    </div>
                </div>

                {/* vehicle detail area  */}
                <div className='flex justify-between px-3 items-center'>
                    <img className='w-34' src={uberCarLogo} alt="" />
                    <div className='flex flex-col items-end'>
                        <h2 className='text-lg font-semibold capitalize'>{props.ride?.captain.fullname.firstname}</h2>
                        <h1 className='text-xl font-bold'>{props.ride?.captain.vehicle.plate}</h1>
                        <span className='text-sm font-light'>White Suzuki S-Presso LXI</span>
                        {/* <h2 className='text-lg font-semibold'>Hanem</h2>
                        <h1 className='text-xl font-bold'>KA15AK00-0</h1>
                        <span className='text-sm font-light'>White Suzuki S-Presso LXI</span> */}
                        <span className='flex items-center gap-1'><FaStar /> 4.9</span>
                    </div>
                </div>

                <div className='w-full flex justify-end font-bold text-xl pr-3'>{props.ride?.otp}</div>

                {/* <div className='flex gap-[48px] justify-center mt-4 border-b-gray-300 border-b-2 p-5'> */}
                <div className='grid grid-cols-3 gap-4 mx-4 my-6'>

                    <div className='flex flex-col items-center justify-center'>
                        <div className='h-12 w-12 flex justify-center items-center bg-gray-200 rounded-[24px]'><FaShield size={26} style={{ color: "#00B5EF" }} /></div>
                        <span className='font-semibold'>Safety</span>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <div className='h-12 w-12 flex justify-center items-center bg-gray-200 rounded-[24px]'><MdOutlineEmergencyShare size={26} style={{ color: "#00B5EF" }} /></div>
                        <span className='font-semibold'>Share trip</span>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <div className='h-12 w-12 flex justify-center items-center bg-gray-200 rounded-[24px]'><FaPhoneAlt size={26} style={{ color: "#00B5EF" }} /></div>
                        <span className='font-semibold'>Call driver</span>
                    </div>
                </div>

                <div className='flex items-center gap-4 pl-5 pt-2'>
                    <FaLocationDot />
                    <div>
                        <h2 className='text-xl font-semibold'>562/11-A</h2>
                        <p className='text-sm text-gray-500'>{props.ride?.pickup}</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 pl-5 pt-2'>
                    <FaLocationDot />
                    <div>
                        <h2 className='text-xl font-semibold'>562/11-A</h2>
                        <p className='text-sm text-gray-500'>{props.ride?.destination}</p>
                    </div>
                </div>

                <div className='bg-[#10b461] w-full flex items-center justify-center mt-4 rounded px-4 py-2 '>
                    <Link to='#'
                        className='felx item-center justify-center text-white font-semibold text-lg'>
                        Payment</Link>
                </div>






            </div>



        </>
    )
}


export default WaitingForDriver;