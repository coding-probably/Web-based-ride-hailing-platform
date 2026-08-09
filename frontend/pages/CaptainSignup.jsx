import { Link } from 'react-router-dom';
import logoWhite from '../public/image/logoWhite.jpg'
import { useContext, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const CaptainSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();


        const captainData = {
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
        console.log("hfkasgkhkgn");
        if (response.status === 201) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }


        
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
    }

    return (
        <>
            <div className="h-screen w-full flex flex-col items-center">
                <div className='flex items-center h-16 w-full bg-black'>
                    <img className='pl-4 h-8' src={logoWhite} alt="" />
                </div>
                <div className="w-9/10 h-full p-4 flex flex-col justify-between">
                    <div>
                        <form className="flex flex-col" onSubmit={(e) => {
                            submitHandler(e);
                        }}>

                            <h3 className='text-base font-medium mb-2'>What's your name</h3>
                            <div className='flex gap-4 mb-6'>
                                <input
                                    required
                                    value={firstname}
                                    onChange={(e) => {
                                        setFirstname(e.target.value)
                                    }}
                                    className='bg-[#eeeeee] rounderd w-1/2 px-4 py-2 text-base placeholder:text-sm'
                                    type='text'
                                    placeholder='First name' />

                                <input
                                    required
                                    value={lastname}
                                    onChange={(e) => {
                                        setLastname(e.target.value)
                                    }}
                                    className='bg-[#eeeeee] rounderd w-1/2 px-4 py-2 text-base placeholder:text-sm'
                                    type='text'
                                    placeholder='First name' />

                            </div>

                            <h3 className='text-base font-medium mb-2'>What's your email</h3>
                            <input
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className='bg-[#eeeeee] mb-6 rounderd px-4 py-2 w-full text-base placeholder:text-sm'
                                type='email'
                                placeholder='Enter your email' />
                            <h3 className='text-bas font-medium mb-2'>Enter Password</h3>
                            <input
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className='bg-[#eeeeee] mb-6 rounderd px-4 py-2 w-full text-base placeholder:text-sm'
                                type='password'
                                placeholder='Enter password' />



                            <h3 className='text-bas font-medium mb-2'>Vehicle Information</h3>
                            <div className='flex gap-4 mb-4'>
                                <input
                                    required
                                    value={vehicleColor}
                                    onChange={(e) => {
                                        setVehicleColor(e.target.value)
                                    }}
                                    className='bg-[#eeeeee] rounderd w-1/2 px-4 py-2 text-base placeholder:text-sm'
                                    type='text'
                                    placeholder='Vehicle Color' />

                                <input
                                    required
                                    value={vehiclePlate}
                                    onChange={(e) => {
                                        setVehiclePlate(e.target.value)
                                    }}
                                    className='bg-[#eeeeee] rounderd w-1/2 px-4 py-2 text-base placeholder:text-sm'
                                    type='text'
                                    placeholder='Vehicle Plate' />
                            </div>
                            <div className='flex gap-4 mb-7'>
                                <input
                                    required
                                    value={vehicleCapacity}
                                    onChange={(e) => {
                                        setVehicleCapacity(e.target.value)
                                    }}
                                    className='bg-[#eeeeee] rounderd w-1/2 px-4 py-2 text-base placeholder:text-sm'
                                    type='number'
                                    placeholder='Velicle Capacity' />

                                <select
                                    required
                                    value={vehicleType}
                                    onChange={(e) => {
                                        setVehicleType(e.target.value)
                                    }}
                                    className='bg-[#eeeeee] rounderd w-1/2 px-4 py-2 text-base placeholder:text-sm'
                                >
                                    <option value='' disabled>Select Vehicle</option>
                                    <option value='car'>Car</option>
                                    <option value='auto'>Auto</option>
                                    <option value='motorcycle'>MotorCylce</option>
                                </select>
                            </div>

                            <button
                                className="bg-[#111] text-white font-semibold rounded mb-4 px-4 py-2 w-full text-lg">Create Captain Account</button>

                        </form>
                        <p className='text-center'>Already have a Account?<Link to='/signup' className='text-blue-600'>Login Here</Link></p>
                    </div>

                    <p className='text-[10px] leading-tight mt-8'>This site is protected by reCAPTCH and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply.</span></p>

                </div>
            </div>


        </>
    )
}

export default CaptainSignup;