import { MdKeyboardArrowDown } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import uberCarLogo from '../public/image/uberCar.webp';
import uberMotorLogo from '../public/image/uberMotor.webp';
import uberAutoLogo from '../public/image/uberAuto.webp';

const VehiclePanel = (props) => {
    // console.log(props.fare);

    return (

        <>
            <div onClick={() => {
                props.setVehiclePanel(false);
            }}
                className='absolute right-6 top-6'><MdKeyboardArrowDown size={20} /></div>

            <div onClick={() =>{
                props.setVehicleType('car');
                props.setConfirmRidePanel(true);
            }} className='flex active:border-2 border-black mb-2 rounded-xl w-fulsl p-3 items-center justify-between'>
                <img className='h-16' src={uberCarLogo} alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='flex font-medium text-bse gap-4'>UberGo <span className='flex items-center'><IoPerson />4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.car}</h2>
            </div>

            <div onClick={() =>{
                props.setVehicleType('motorcycle');
                props.setConfirmRidePanel(true);
            }} className='flex active:border-2 border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
                <img className='h-11' src={uberMotorLogo} alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='flex font-medium text-bse gap-4'>Moto <span className='flex items-center'><IoPerson />1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.motorcycle}</h2>
            </div>

            <div onClick={() =>{
                props.setVehicleType('auto');
                props.setConfirmRidePanel(true);
            }} className='flex active:border-2 border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
                <img className='h-11' src={uberAutoLogo} alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='flex font-medium text-bse gap-4'>UberGo <span className='flex items-center'><IoPerson />3</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, Auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
            </div>


        </>
    )
}


export default VehiclePanel;