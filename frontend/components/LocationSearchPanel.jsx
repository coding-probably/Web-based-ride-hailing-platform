
import { FaLocationDot } from "react-icons/fa6";


const LocationSearchPanel = ({ suggestions, setPanelOpen, setVehiclePanel, setPickup, setDestination, activeField }) => {


    const location = [
        "24B, Near Kapoor's cafa, New Delhi",
        "22A, Near Malhotra's cafa, New Delhi",
        "20B, Near Singhaniya's cafa, New Delhi",
        "18A, Near Pixel's cafa, New Delhi",
    ]
    const handleSuggestionPanel = (suggestion) => {
        console.log(suggestion);
        if (activeField === 'pickup') {
            setPickup(suggestion);
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }



    return (
        <>
            <div className="p-5">
                {
                    suggestions.map((ele, idx) => [

                        <div key={idx}
                            onClick={() => handleSuggestionPanel(ele.display_name)
                                // props.setVehiclePanel(true);
                                // props.setPanelOpen(false);
                            }
                            className="flex items-center gap-4 border-2 p-2 border-gray-50 active:border-black rounded-xl justify-start my-1">
                            <FaLocationDot size={20} />
                            <div>

                                <h4 className="font-medium">{ele.name}</h4>
                                <p className="font-base">{ele.display_name}</p>
                            </div>


                        </div>
                    ])
                }


            </div>

        </>
    )



}

export default LocationSearchPanel;