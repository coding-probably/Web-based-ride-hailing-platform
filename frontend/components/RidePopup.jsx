
import uberCarLogo from '../public/image/uberCar.webp';
import profile from '../public/image/profile.jpg'

import { MdKeyboardArrowDown } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";


const RidePopUp = (props) => {

    console.log(props.ride);


    return (

        <div>
            <div onClick={() => {
                props.setRidePopupPanel(false);
            }}
                className='absolute right-6 top-5'><MdKeyboardArrowDown size={20} /></div>
            <div className="flex justify-center pt-2">

                <h3 className="text-xl font-semibold mb-0">New Ride Available!</h3>
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
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
                        <MdLocationPin size={30} />
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
                        <FaLocationArrow size={30} />
                        <div>
                            <h3 className="text-lg font-medium">562/22-A Cafe</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                        <BsCashCoin size={30} />

                        <div>
                            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
                        </div>
                    </div>




                </div>


                <div className='w-full flex gap-2'>

                    <div className="w-1/2 mt-5 flex justify-center">
                        <button
                            onClick={() => {
                                props.setRidePopupPanel(false);
                                // props.setVehicleFound(true);
                                // props.setConfirmRidePanel(false);

                            }} className="w-full rounded-md text-white bg-gray-600 font-semibold h-10">Ignore</button>
                    </div>

                    <div className="w-1/2 mt-5 flex justify-center">
                        <button
                            onClick={() => {
                                props.setConfirmRidePopupPanel(true);
                                props.confirmRide();
                                // props.setVehicleFound(true);
                                // props.setConfirmRidePanel(false);

                            }} className="w-full rounded-md bg-[#10b461] text-white font-semibold h-10">Accept</button>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default RidePopUp;