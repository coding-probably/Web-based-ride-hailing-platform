import { MdKeyboardArrowDown } from "react-icons/md";
import uberCarLogo from '../public/image/uberCar.webp';


import { MdLocationPin } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";



const LookingForDriver = (props) => {



    return (


        <>
         <div>
        
                        <div 
                        onClick={() => {
                            props.setVehicleFinding(false);
                        }}
                            className='absolute right-6 top-5'><MdKeyboardArrowDown size={20} /></div>
        
                        <div className="flex justify-center pt-2">
        
                            <h3 className="text-xl font-semibold mb-0">Looking For Driver</h3>
                        </div>
        
        
                        <div className="flex flex-col justify-between items-center">
                            <div className="w-full flex justify-center mb-2">    
                                <img className="h-30" src={uberCarLogo} alt="" />
                            </div>
    
                            <div className="w-9/10 mt-5 mb-3">
                                <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
                                    <MdLocationPin size={30} />
                                    <div>
                                        <h3 className="text-lg font-medium">562/11-A</h3>
                                        <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
                                    </div>
                                </div>
        
                                <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
                                    <FaLocationArrow size={30} />
                                    <div>
                                        <h3 className="text-lg font-medium">562/22-A Cafe</h3>
                                        <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 p-3">
                                    <BsCashCoin size={30} />
        
                                    <div>
                                        <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
                                        <p className="text-sm -mt-1 text-gray-600">Casj Cash</p>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
        
        
        
        </>
    )
}





export default LookingForDriver;