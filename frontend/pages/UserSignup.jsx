import logoWhite from '../public/image/logoWhite.jpg'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if (response.status === 201 ) {
            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token', data.token);


            navigate('/home')
        }


        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
    }

    return (
        <>
            <div className="h-screen w-full flex flex-col items-center">
                <div className='flex items-center h-16 w-full bg-black'>
                    <img className='pl-4 h-8' src={logoWhite} alt="" />
                </div>
                <div className="w-4/5 h-full mt-7 p-4 flex flex-col justify-between">
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
                                    placeholder='First name'/>

                                    <input
                                    required
                                    value={lastname}
                                    onChange={(e) => {
                                        setLastname(e.target.value)
                                    }}
                                    className='bg-[#eeeeee] rounderd w-1/2 px-4 py-2 text-base placeholder:text-sm'
                                    type='text'
                                    placeholder='First name'/>

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

                            <button
                                className="bg-[#111] text-white font-semibold rounded mb-4 px-4 py-2 w-full text-lg">Create Account</button>

                        </form>
                        <p className='text-center'>Already have a Account?<Link to='/login' className='text-blue-600'>Login Here</Link></p>
                    </div>
                    
              <p className='text-[10px] leading-tight'>This site is protected by reCAPTCH and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply.</span></p>
                </div>
            </div>


        </>
    )
}

export default UserSignup;