import logoBlack from '../public/image/logoBlack.svg';
import mapImage from '../public/image/map.gif';

import { IoExitOutline } from "react-icons/io5";

import { data, Link } from 'react-router-dom';
import RidePopUp from '../components/RidePopup';
import { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import CaptainDetailHome from '../components/CaptainDetailHome';
import ConfirmRidePopup from '../components/ConfirmRidePopup';

import axios from 'axios';
// ---------------- context -------------------
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainHome = () => {



    // for looking for driver confirm panel function
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const ridePopupPanelRef = useRef(null);
    useEffect(() => {
        const tl = gsap.timeline({
            defaults: { duration: 0.6 },
        });

        if (ridePopupPanel) {
            tl.to(".ridePopupPanel", { transform: 'translateY(0)' });
        } else {
            tl.to(".ridePopupPanel", { transform: 'translateY(100%)' });
        }
        ridePopupPanelRef.current = tl;
        return () => {
            ridePopupPanelRef.current = null;
        };
    }, [ridePopupPanel]);


    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const confirmRidePopupPanelRef = useRef(null);
    useEffect(() => {
        const tl = gsap.timeline({
            defaults: { duration: 0.6 },
        });

        if (confirmRidePopupPanel) {
            tl.to(".confirmRidePopupPanel", { transform: 'translateY(0)' });
        } else {
            tl.to(".confirmRidePopupPanel", { transform: 'translateY(100%)' });
        }
        confirmRidePopupPanelRef.current = tl;
        return () => {
            confirmRidePopupPanelRef.current = null;
        };
    }, [confirmRidePopupPanel]);



    //=============================== SOCKET IO =================================
    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);

    useEffect(() => {
        // if (!user) return
        console.log(captain);
        socket.emit("join", { userType: "captain", userId: captain._id });

        // this logic will update the live locaiton of captain in interval of 10 seconds   =
           const coordChnage = (value) => {
            const random = Math.random();
            if (random < 0.5) {
                return value + (Math.random());
            } else {
                return value - (Math.random());
            }
        }

        const updateLocation = () => {
            const data = {
                userId: captain._id,
                location: {
                    ltd: 28.5549880,
                    lng: 77.0846833
                    // ltd: coordChnage(23.2512971),
                    // lng: coordChnage(77.465312)
                }
            }
            console.log(data);
            socket.emit('update-location-captain', data
            )

            // if (navigator.geolocation) {
            //     navigator.geolocation.getCurrentPosition(position => {
            //         socket.emit('update-location-captain', {
            //             userId: captain._id,
            //             location: {
            //                 ltd: position.coords.latitude,
            //                 lng: position.coords.longitude
            //             }
            //         })
            //     })
            // }



            
        }
        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation();

        return () => clearInterval(locationInterval);

    
        // const dummylocation = setInterval(dummuyUpdateLocation, 1000000000);
        // dummuyUpdateLocation();
        

    }, )

    const [ ride, setRide ] = useState(null);

    
    socket.on('new-ride', (data) => {
        console.log("socket message recive");
        console.log(data);
        setRide(data);
        setRidePopupPanel(true);

    })

    async function confirmRide() {
        console.log("ride information : ", ride._id, "\ncaptian: ", captain._id);

        const response = await  axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id,
            captain: captain._id,

            
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        

        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
    }

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

                <div className='fixed w-full z-10 rounded-t-2xl bg-white px-3 py-4 bottom-0'>
                    <CaptainDetailHome />
                </div>



                <div ref={ridePopupPanelRef} className='ridePopupPanel m-2 fixed w-full z-100 bg-white px-3 py-2 bottom-0'>
                    <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel} 
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide} />
                </div>



                <div ref={confirmRidePopupPanelRef} className='confirmRidePopupPanel m-2 h-screen fixed w-full z-110 bg-white px-3 py-2 bottom-0'>
                    <ConfirmRidePopup
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel} 
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
                </div>






            </div>

        </>
    )
}

export default CaptainHome;