

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
import { useState } from 'react';

import axios from 'axios';


const ConfirmRidePopup = (props) => {

    const [otp, setOtp] = useState('');
    console.log(props.ride);


    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false);
            props.setRidePopupPanel(false);
            navigate('/captain-riding', { state: { ride: props.ride }});
        }
    }




    return (

        <>


            <div onClick={() => {
                props.setConfirmRidePopupPanel(false);
            }}
                className='absolute right-6 top-5'><MdKeyboardArrowDown size={20} /></div>
            <div className="flex justify-center pt-2">

                <h3 className="text-xl font-semibold mb-0">Confirmation</h3>
            </div>


            <div className="flex flex-col justify-between items-center">
                {/* <div className="p-2 flex items-center mt-4 justify-center mb-2 rounded-full bg-gray-200">
                         */}
                <div className='w-full mt-4 px-5 flex items-center py-3 rounded-lg bg-yellow-200 justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-white p-1 rounded-full'>
                            <img className="h-12 object-cover rounded-full" src={profile} alt="" />
                        </div>
                        <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>

                    </div>
                    <div className="h-8 px-3 flex flex-col justify-center items-center rounded-full font-semibold bg-black text-white">
                        <h2 className=''>5.5 KM</h2>
                    </div>
                </div>



                <div className="w-9/10 mt-5">
                    <div className="flex gap-3 items-center p-3 border-b-2 border-gray-200">
                        <span className='flex items-center gap-2 border-r-2 border-gray-200 pr-6'>
                            <MdLocationPin size={20} /><span className='text-lg font-medium'>Pick-Up</span>
                        </span>
                        <div>
                            <h3 className="text-md font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center p-3 border-b-2 border-gray-200">
                        <span className='flex items-center gap-2 border-r-2 border-gray-200 pr-3'>
                            <FaLocationArrow size={20} /><span className='text-lg font-medium'>Drop-Off</span>
                        </span>
                        <div>
                            <h3 className="text-md font-medium">562/22-A Cafe</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center p-3 border-b-2 border-gray-200">
                        <span className='flex items-center gap-2 border-r-2 border-gray-200 pr-4'>
                            <BsCashCoin size={20} /><span className='text-lg font-medium'>Payment</span>
                        </span>
                        <div>
                            <h3 className="text-md font-medium">₹{props.ride?.fare}</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>

                <div className='w-full flex justify-center gap-6 mt-6'>
                    <div onClick={() => {

                    }} className='w-18 h-18 bg-[#10b461] rounded-full flex flex-col justify-center items-center'>
                        <IoCallSharp size={28} style={{ color: 'white' }} />
                        <h2 className='text-xs font-semibold text-white'>Call</h2>
                    </div>


                    <div className='w-18 h-18 bg-blue-500 rounded-full flex flex-col justify-center items-center'>
                        <MdOutlineMessage size={28} style={{ color: 'white' }} />
                        <h2 className='text-xs font-semibold text-white'>Message</h2>

                    </div>


                    <div
                        onClick={() => {
                            props.setConfirmRidePopupPanel(false);
                            props.setRidePopupPanel(false);

                        }}
                        className='w-18 bg-red-600 rounded-full flex flex-col justify-center items-center'>
                        <FaRegWindowClose size={28} style={{ color: 'white' }} />
                        <h2 className='text-xs font-semibold text-white'>Cancle</h2>

                    </div>
                </div>

                <div className='my-4 h-20'>



                    <form onSubmit={submitHandler}>
                        <div>

                            <p className='font-semibold text-md py-4'>Enter OTP to start the ride</p>
                            <div className='h-10 mb-6 flex gap-2'>
                                <input value={otp}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        setOtp(e.target.value);
                                    }}
                                    type="text" maxLength="6" id='otp1' className='h-10 w-48 pl-4 text-center outline-none font-mono text-lg bg-gray-200 border-b-2 border-blue-500' />

                            </div>
                            {/* <input type="text" maxLength="1" onInput="this.value=this.value.replace(/[^0-9]/g,'');" /> */}
                        </div>





                        <div className="w-full flex justify-center">
                            <button to='/captain-riding'
                                onClick={() => {
                                    //props.setConfirmRidePopupPanel(true);
                                    // props.setVehicleFound(true);
                                    // props.setConfirmRidePanel(false);

                                }}
                                className="w-full flex justify-center items-center rounded-md bg-blue-500 text-white font-semibold h-10">Confirm</button>
                            {/* className="w-full flex justify-center items-center rounded-md bg-[#10b461] text-white font-semibold h-10">Confirm</Link> */}
                        </div>
                    </form>
                </div>

            </div>

        </>
    )
}


export default ConfirmRidePopup;