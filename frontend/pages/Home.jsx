import logoBlack from '../public/image/logoBlack.svg';
import { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import WaitingForDriver from '../components/WaitingForDriver';
import LookingForDriver from '../components/LookingForDriver';
import axios from 'axios';

// ---------------- context -------------------
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);


    // for location panel function
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    useEffect(() => {
        // create a timeline or individual tweens
        const tl = gsap.timeline({
            // defaults for the timeline
            defaults: { duration: 0.6 },
        });

        if (panelOpen) {
            // tl.to(".panel", { height: '70%', opacity: 1 });
            tl.to(".panel", { height: '70%' });
            tl.to(".arrowPanel", { opacity: 1 });

        } else {
            // tl.to(".panel", { height: '0%', opacity: 0 });
            tl.to(".panel", { height: '0' });
            tl.to(".arrowPanel", { opacity: 0 });
        }
        // store the timeline in ref
        panelRef.current = tl;

        return () => {
            // cleanup: revert the timeline when the component unmounts
            //tl.revert(); // ot tl.kill() if you need to completly remove it
            panelRef.current = null;
        };
    }, [panelOpen]);


    // for vehicle panel function
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const vehiclePanelRef = useRef(null);
    useEffect(() => {
        // create a timeline or individual tweens
        const tl2 = gsap.timeline({
            defaults: { duration: 0.6 },
        });

        if (vehiclePanel) {
            tl2.to(".vehicelPanel", { transform: 'translateY(0)' });
        } else {
            tl2.to(".vehicelPanel", { transform: 'translateY(100%)' });
        }
        // store the timeline in ref
        vehiclePanelRef.current = tl2;

        return () => {
            // cleanup: revert the timeline when the component unmounts
            //tl.revert(); // ot tl.kill() if you need to completly remove it
            vehiclePanelRef.current = null;
        };
    }, [vehiclePanel]);


    // for vehicle confirm panel function
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const confirmRidePanelRef = useRef(null);
    useEffect(() => {
        const tl3 = gsap.timeline({
            defaults: { duration: 0.6 },
        });

        if (confirmRidePanel) {
            tl3.to(".confirmRidePanel", { transform: 'translateY(0)' });
        } else {
            tl3.to(".confirmRidePanel", { transform: 'translateY(100%)' });
        }
        confirmRidePanelRef.current = tl3;
        return () => {
            confirmRidePanelRef.current = null;
        };
    }, [confirmRidePanel]);


    // for looking for driver confirm panel function
    const [vehicleFinding, setVehicleFinding] = useState(false);
    const vehicleFindingRef = useRef(null);
    useEffect(() => {
        const tl4 = gsap.timeline({
            defaults: { duration: 0.6 },
        });

        if (vehicleFinding) {
            tl4.to(".vehicleFoundPanel", { transform: 'translateY(0)' });
        } else {
            tl4.to(".vehicleFoundPanel", { transform: 'translateY(100%)' });
        }
        vehicleFindingRef.current = tl4;
        return () => {
            vehicleFindingRef.current = null;
        };
    }, [vehicleFinding]);


    // for looking for driver confirm panel function
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const waitingForDriverRef = useRef(null);
    useEffect(() => {
        const tl4 = gsap.timeline({
            defaults: { duration: 0.6 },
        });

        if (waitingForDriver) {
            tl4.to(".waitingForDriverPanel", { transform: 'translateY(0)' });
        } else {
            tl4.to(".waitingForDriverPanel", { transform: 'translateY(100%)' });
        }
        waitingForDriverRef.current = tl4;
        return () => {
            waitingForDriverRef.current = null;
        };
    }, [waitingForDriver]);


    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState('');

    // =======> for setting up PICKUP location <========
    const handlePickupChnage = async (e) => {
        setPickup(e.target.value);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setPickupSuggestions(response.data);
        } catch (e) {
            console.error('Error occured in handlePickupChnage home.jsx : ', e);
        }
    }

    // =======> for setting up DESTINATION location <========
    const handleDestinationChnage = async (e) => {
        setDestination(e.target.value);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            setDestinationSuggestions(response.data);
        } catch (e) {
            console.error('Error occured in handleDestinationChnage home.jsx : ', e);
        }
    }

    // =======> for calculating FARE <===========
    async function findTrip() {
        setVehiclePanel(true);
        setPanelOpen(false);

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        console.log(response.data);
        setFare(response.data);
    }

    // ========> for creating the RIDE <==========
    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        console.log(response.data)
    }

    const submitHandler = (e) => {
        e.preventDefault();
    }

    /* 
     const [pickupCoord, setPickupCoord] = useState({lat: 28.5549889, lng: 77.0846833 });
    async function findLocationOnMap() {

        if (pickup) {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
                params: { address: pickup },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.status === 200) {
                console.log(response ? response : "non response");
                console.log(response.data);
                setPickupCoord({ lat: response.data.ltd, lng: response.data.lng});
            }
        }
    }
    */



    //=============================== SOCKET IO =================================
    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);

    useEffect(() => {
        console.log(user);
        socket.emit("join", { userType: "user", userId: user._id })
    }, [user])

    const [ride, setRide] = useState(null);

    socket.on('ride-confirmed', ride => {
        setRide(ride);
        console.log('ride confirmed : ', ride);
        setVehiclePanel(false); // for selecting between car, motorcycle, auto
        setConfirmRidePanel(false); // for creating the ride
        setVehicleFinding(false);
        setWaitingForDriver(true);
    })

    const navigate = useNavigate();
    socket.on('ride-started', ride => {
        console.log(" ride started :", ride);
        setWaitingForDriver(false);
        navigate('/riding', { state: { ride } });
    })


    return (
        <>
            <div className="h-screen w-full relative overflow-hidden flex flex-col items-center">
                <img className='w-16 absolute left-5 top-5' src={logoBlack} alt="" />
                <div className='h-screen -z-10 w-screen'>
                    {/* image for temperoary use */}
                    {/* <img className='h-full w-full object-cover' src={mapImage} alt="" /> */}
                    <LiveTracking />
                </div>

                <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
                    <div className='p-5 h-[30%] bg-white relative'>
                        <div ref={panelCloseRef}
                            onClick={() => {
                                setPanelOpen(false);
                            }}
                            className='arrowPanel opacity-0 absolute right-6 top-6'><MdKeyboardArrowDown size={20} /></div>
                        <h4 className='text-2xl font-semibold'>Find a Trip</h4>
                        <form onSubmit={(e) => {
                            submitHandler(e);
                        }}>
                            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full'></div>
                            <input
                                onClick={() => {
                                    setPanelOpen(true);
                                    setActiveField('pickup');
                                }}
                                value={pickup}
                                onChange={handlePickupChnage}
                                className='bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5'
                                type='text' placeholder='Add a pick-up location' />

                            <input
                                onClick={() => {
                                    setPanelOpen(true);
                                    setActiveField('destination');
                                }}
                                value={destination}
                                onChange={handleDestinationChnage}
                                className='bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3'
                                type='text' placeholder='Enter your destination' />

                            <button onClick={findTrip} className='bg-black text-white rounded-lg w-full px-8 py-2 mt-3'>Find Trip</button>
                        </form>
                    </div>

                    <div ref={panelRef} className='panel bg-white'>
                        <LocationSearchPanel
                            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                            setPanelOpen={setPanelOpen}
                            setVehiclePanel={setVehiclePanel}
                            setPickup={setPickup}
                            setDestination={setDestination}
                            activeField={activeField}
                            panelStatus={panelOpen} />
                    </div>
                </div>


                {/*  setVehiclePanel() function fot selecting between car, motorcycle, auto */}
                <div ref={vehiclePanelRef} className='vehicelPanel fixed w-full z-10 bg-white px-3 py-4 bottom-0'>
                    <VehiclePanel
                        fare={fare}
                        setVehicleType={setVehicleType}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setVehiclePanel={setVehiclePanel}
                    />
                </div>


                {/*  setConfirmRide() function to start creating ride & searhing the drivers */}
                <div ref={confirmRidePanelRef} className='confirmRidePanel fixed w-full z-40 bg-white px-3 py-2 bottom-0'>
                    <ConfirmRide
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setVehicleFinding={setVehicleFinding} />
                </div>


                {/* setVehicleFinding() function for looking for driver */}
                <div ref={vehicleFindingRef} className='vehicleFoundPanel fixed w-full z-20 bg-white px-3 py-2 bottom-0'>
                    <LookingForDriver
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setVehicleFinding={setVehicleFinding} />
                </div>


                {/* change classname => 'vehicleFoundPanel' ==> 'waitingForDriverPanel; */}
                <div ref={waitingForDriverRef} className='waitingForDriverPanel fixed w-full z-100 bg-white px-3 py-2 bottom-0'>
                    <WaitingForDriver
                        ride={ride}
                        setVehicleFinding={setVehicleFinding}
                        waitingForDriver={waitingForDriver}
                        setWaitingForDriver={setWaitingForDriver} />
                </div>

            </div>
        </>
    )
}


export default Home;