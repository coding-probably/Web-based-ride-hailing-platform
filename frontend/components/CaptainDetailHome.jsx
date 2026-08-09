import uberCarLogo from '../public/image/uberCar.webp';

import { IoIosTimer } from "react-icons/io";
import { MdSpeed } from "react-icons/md";
import { LuNotebookTabs } from "react-icons/lu";
import { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainDetailHome = () => {

    const { captain } = useContext(CaptainDataContext);
    console.log(captain);



    return (

        <>
            <div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-start gap-2'>
                        <img className='h-10 w-10 rounded-full object-cover' src={uberCarLogo} alt="" />
                        <div className='flex flex-col ml-2'>
                            <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + ' ' + captain.fullname.lastname}</h4>
                            <span className='text-sm font-light'>White Suzuki S-Presso LXI</span>
                        </div>
                    </div>
                    <div className="w-[80px] h-[48px] flex flex-col justify-center items-center rounded font-semibold bg-black text-white">
                        <h2 className=''>₹295.20</h2>
                        <p className='text-sm'>Earned</p>
                    </div>
                </div>

                <div className='flex justify-center gap-5 items-start bg-gray-200 rounded-xl p-6 mt-6'>
                    <div className='flex flex-col justify-center items-center'>
                        <IoIosTimer size={30} />
                        <h5 className='text-lg font-medium -mb-2'>10.2</h5>
                        <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <MdSpeed size={30} />
                        <h5 className='text-lg font-medium -mb-2'>10.2</h5>
                        <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <LuNotebookTabs size={30} />
                        <h5 className='text-lg font-medium -mb-2'>10.2</h5>
                        <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                </div>

                <div>
                    
                </div>
            </div>



        </>
    )
}


export default CaptainDetailHome;