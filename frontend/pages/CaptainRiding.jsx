import { Link, useLocation } from "react-router-dom";
import logoBlack from '../public/image/logoBlack.svg';
import mapImage from '../public/image/map.gif';

import { IoExitOutline } from "react-icons/io5";


import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import FinishRide from "../components/FinishRide";





const CaptainRiding = () => {

    // for looking for driver confirm panel function
    const [captainRidingPanel, setCaptainRidingPanel] = useState(false);
    const captainRidingPanelRef = useRef(null);
    useEffect(() => {
        const tl = gsap.timeline({
            defaults: { duration: 0.6 },
        });

        const tl1 = gsap.timeline({
            defaults: { duration: 0 },
        });

        if (captainRidingPanel) {
            tl.to(".captainRidingPanel", { transform: 'translateY(66%)' });
            tl1.to(".captainRidingArrow", { transform: 'rotate(180deg)' });
        } else {
            tl.to(".captainRidingPanel", { transform: 'translateY(0)' });
            tl1.to(".captainRidingArrow", { transform: 'rotate(0)' });
        }
        captainRidingPanelRef.current = tl;
        return () => {
            captainRidingPanelRef.current = null;
        };
    }, [captainRidingPanel]);


     // for looking for driver confirm panel function
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    useEffect(() => {
        const tl = gsap.timeline({
            defaults: { duration: 0.6 },
        });

        if (finishRidePanel) {
            tl.to(".finishRidePanel", { transform: 'translateY(0)' });
         
        } else {
            tl.to(".finishRidePanel", { transform: 'translateY(100%)' });
            
        }
        finishRidePanelRef.current = tl;
        return () => {
            finishRidePanelRef.current = null;
        };
    }, [finishRidePanel]);


    const location = useLocation(); // for extracting the value from state after being navigated
    const ride = location.state?.ride;

    console.log(ride);


    return (


        <>

            <div className="h-screen w-full relative overflow-hidden flex flex-col items-center">
                <div className='w-full absolute px-5 top-3 flex items-center justify-between'>
                    <img className='w-16' src={logoBlack} alt="" />
                    <Link to='/captain-login' className='h-8 w-8 flex items-center justify-center rounded-full bg-white'>
                        <IoExitOutline size={20} />
                    </Link>

                </div>
                <div className='h-screen w-screen'>
                    {/* image for temperoary use */}
                    <img className='h-full w-full object-cover' src={mapImage} alt="" />
                </div>

                <div ref={captainRidingPanelRef} className='captainRidingPanel fixed w-full z-10 flex flex-col items-center justify-center bg-yellow-400 px-3 pb-6 bottom-0'>
                    {/* <CaptainDetailHome/> */}
                    <div
                        onClick={() => {
                            setCaptainRidingPanel(captainRidingPanel ? false : true);
                        }} className='w-full flex justify-center items-center p-2'>
                        <div className="captainRidingArrow">
                            <MdKeyboardArrowDown size={20} /></div>
                    </div>

                    <div className="w-full flex justify-center items-center gap-4">
                        <h1 className="text-xl font-semibold">4 KM away</h1>
                        <button
                        onClick={() => {
                            setFinishRidePanel(true);
                        }}
                        className="flex w-1/2 justify-center items-center rounded-md bg-[#10b461] text-white font-semibold h-10">Complete Ride</button>
                    </div>
                </div>

                <div ref={finishRidePanelRef} className='finishRidePanel fixed w-full z-110 rounded-t-3xl pb-4 bg-white bottom-0'>
                    <FinishRide
                    ride={ride}
                    setFinishRidePanel={setFinishRidePanel}/>
                </div>








            </div>


        </>
    )
}

export default CaptainRiding;