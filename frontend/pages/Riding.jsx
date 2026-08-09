import logoBlack from '../public/image/logoBlack.svg';
import mapImage from '../public/image/map.gif';

import uberCarLogo from '../public/image/uberCar.webp';

import { FaStar } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import { MdOutlineEmergencyShare } from "react-icons/md";

import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';


// ---------------- context -------------------
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';

const CaptainHome = () => {

    const location = useLocation();
    const { ride } = location.state || {};
    console.log(ride);

    const navigate = useNavigate();

    //=============================== SOCKET IO =================================
    const { socket } = useContext(SocketContext);
    socket.on('ride-ended', () => {
        navigate('/home');
    })

    return (
        <>
            <div className="h-screen w-full relative overflow-hidden flex flex-col items-center">
                <div className='w-full absolute left-5 top-5 flex items-center'>
                    <img className='w-16' src={logoBlack} alt="" />
                    <div className='h-1/2 bg-gray-200'>

                        <IoExitOutline />
                    </div>

                </div>
                <div className='h-screen w-screen'>
                    {/* image for temperoary use */}
                    <img className='h-1/2 w-full object-cover' src={mapImage} alt="" />
                </div>

                <div className='vehicelPanel fixed w-full z-10 bg-white px-3 py-4 bottom-0'>

                    <div className="flex w-full items-center justify-between">
                        <h2 className="text-lg font-semibold">Meet at the pickup point</h2>
                        <div className="w-[48px] h-[48px] flex flex-col justify-center items-center rounded font-semibold bg-black text-white">
                            <h2>2</h2>
                            <p>min</p>
                        </div>
                    </div>

                    {/* vehicle detail area  */}
                    <div className='flex justify-between items-center'>
                        <img className='w-34' src={uberCarLogo} alt="" />
                        <div className='flex flex-col items-end'>
                            <h2 className='text-lg font-semibold'>{ride?.captain.fullname.firstname}</h2>
                            <h1 className='text-xl font-bold'>{ride?.captain.vehicle.plate}</h1>
                            <span className='text-sm font-light'>White Suzuki S-Presso LXI</span>
                            <span className='flex items-center gap-1'><FaStar /> 4.9</span>
                        </div>
                    </div>

                    <div className='flex gap-[48px] justify-center mt-4 border-b-gray-300 border-b-2 p-5'>

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
                            <p className='text-sm text-gray-500'>{ride?.pickup}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-4 pl-5 pt-2'>
                        <FaLocationDot />
                        <div>
                            <h2 className='text-xl font-semibold'>562/11-A</h2>
                            <p className='text-sm text-gray-500'>{ride?.destination}</p>
                        </div>
                    </div>
                </div>






            </div>

        </>
    )
}

export default CaptainHome;