import uberCarLogo from '../public/image/uberCar.webp';
import profile from '../public/image/profile.jpg'

import { MdKeyboardArrowDown } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";

import { IoCallSharp } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";

import { FaRegWindowClose } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const FinishRide = (props) => {
    console.log(props);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 200) {
            props.setFinishRidePanel(false);
            navigate('/captain-home');
        }
    }


    return (

        <>
            {/* <div onClick={() => {
                // props.setConfirmRidePopupPanel(false);
            }}
                className='absolute right-6 top-5'><MdKeyboardArrowDown size={20} /></div> */}
            <div className="flex flex-col justify-center py-2 items-center bg-yellow-200 rounded-t-3xl border-b-2 border-yellow-400">
                <div
                    onClick={() => {
                        props.setFinishRidePanel(false);
                    }} className='w-full flex justify-center items-center'>
                    <div className="captainRidingArrow">
                        <MdKeyboardArrowDown size={20} /></div>
                </div>

                <h3 className="text-xl font-semibold">Finish this Ride</h3>
            </div>


            <div className="flex flex-col justify-between items-center px-3">

                <div className='w-full mt-4 px-5 flex items-center py-3 rounded-lg bg-yellow-200 justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-white p-1 rounded-full'>
                            <img className="h-12 object-cover rounded-full" src={profile} alt="" />
                        </div>
                        <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>

                    </div>
                    <div className="h-8 px-3 flex flex-col justify-center items-center rounded-full font-semibold bg-black text-white">
                        <h2 className=''>₹{props.ride?.fare}</h2>
                    </div>
                </div>



                <div className="w-9/10 mt-5">
                    <div className="flex gap-3 items-center p-3 border-b-2 border-gray-200">
                        <span className='flex items-center gap-2 border-r-2 border-gray-200 pr-6'>
                            <MdLocationPin size={20} /><span className='text-lg font-medium'>Pick-Up</span>
                        </span>
                        <div>

                            <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center p-3 border-b-2 border-gray-200">
                        <span className='flex items-center gap-2 border-r-2 border-gray-200 pr-3'>
                            <FaLocationArrow size={20} /><span className='text-lg font-medium'>Drop-Off</span>
                        </span>
                        <div>

                            <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
                        </div>
                    </div>


                </div>


                <div className='w-full px-4 flex flex-col justify-center mt-6'>
                    <button
                        onClick={handleSubmit}
                        to='/captain-home' className='bg-[#10b461] h-12 w-full rounded-lg flex justify-center items-center text-lg font-semibold text-white'>
                        Finish This Ride </button>
                </div>
            </div>

        </>
    )
}

export default FinishRide