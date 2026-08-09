import { Link } from 'react-router-dom';
import logoWhite from '../public/image/logoWhite.jpg'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const { captain, setCaptain } = useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const captainDate = {
            email: email,
            password: password
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainDate);

        if (response.status === 200) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }
        
        setEmail('');
        setPassword('');
    }

    return (
        <>
            {/** <div className='p-7 h-screen flex flex-col justify-center'>**/}
            <div className="h-screen w-full flex flex-col items-center">
                <div className='flex items-center h-16 w-full bg-black'>
                    <img className='pl-4 h-8' src={logoWhite} alt="" />
                </div>
                <div className="w-4/5 h-full mt-7 p-4 flex flex-col justify-between">
                    <div>
                        <form className="flex flex-col" onSubmit={(e) => {
                            submitHandler(e);
                        }}>

                            <h3 className='text-xl mb-2'>What's your email</h3>
                            <input
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className='bg-[#eeeeee] mb-7 rounderd px-4 py-2 w-full text-lg placeholder:text-base'
                                type='email'
                                placeholder='Enter your email' />
                            <h3 className='text-xl mb-2'>Enter Password</h3>
                            <input
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className='bg-[#eeeeee] mb-7 rounderd px-4 py-2 w-full text-lg placeholder:text-base'
                                type='password'
                                placeholder='Enter password' />

                            <button
                                className="bg-[#111] text-white font-semibold rounded mb-7 px-4 py-2 w-full text-lg">Login</button>

                        </form>
                        <p className='text-center'>Join a fleet?<Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
                    </div>
                    <div className='bg-[#10b461] w-full flex items-center justify-center  rounded mb-7 px-4 py-2 '>
                        <Link to='/login'
                            className='felx item-center justify-center text-white font-semibold text-lg'>
                            Sign in as User</Link>
                    </div>
                </div>
            </div>


        </>
    )
}

export default CaptainLogin;