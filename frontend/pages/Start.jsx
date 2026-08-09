import logoWhite from '../public/image/logoWhite.jpg'
import home from '../public/image/home.jpg'

import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserDataContext } from '../context/userContext'

const Start = () => {

    const ans = useContext(UserDataContext);
    console.log(ans);

    return (
        <>
            <div>
                <div className="h-screen bg-amber-300 flex flex-col justify-between w-full">
                    {/**<div className='flex items-center justify-center h-16 w-full bg-black'>
                        <div className="min-w-xs w-9/10 flex justify-between">
                            <img className='h-8' src={logoWhite} alt="" />
                            <div className="flex gap-2">
                                <button className="h-8 text-white bg-stone-900 rounded-full pl-2 pr-2">login</button>
                                <button className="h-8 bg-white rounded-full pl-2 pr-2">signup</button>
                            </div>
                        </div>
                    </div>**/}
                    <div className="">
                        <img src={ home } alt="" />
                    </div>

                    <div className="bg-white py-4 px-4">
                        <h2 className="text-3xl font-bold">Get Started with Uber</h2>
                        <Link to='/login'>
                        <button className="w-full bg-black text-white py-3 rounded mt-5">Continue</button>
                        </Link>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Start;