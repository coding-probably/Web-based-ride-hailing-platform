import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useState } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

const LiveTracking = (props) => {
    const [position, setPosition] = useState([ 28.5549889, 77.0846833 ]);

    // const da = {
    //     lat: props.pickupCoord.lat,
    //     lng: props.pickupCoord.lng
    // }
    

    // useEffect(() => {
    //     const updateLocation = () => {
    //         setPosition([da.ltd, da.lng]);
            
    //     }
    //     const locationInterval = setInterval(updateLocation, 10000);
    //     updateLocation();

    //     return () => clearInterval(locationInterval);
    // }, )



    return (

        <>
            <div className='h-screen w-full'>
                { position ? (
                    <MapContainer center={position} zoom={20} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"/>
                        <Marker position={position}>
                            <Popup> You are here</Popup>
                        </Marker>
                    </MapContainer>
            ) : (
                <p className='text-center mt-4'>Fetching your location</p>
            )}
            </div>
        </>
    )
}

export default LiveTracking;


/*---------------------------- if have google api ------------------------------------- 
import {LoadScript, GoogleMap, Marker} from '@react-google-maps/api'
import { useEffect, useState } from 'react';

const containerStyle = {
    width: '100%',
    height: '400ox'
}

const center = {
    lat: -3.745,
    lng: -38.523
}

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        
       

        const watahId = navigator.geolocation.watchPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition({ lat: latitude, lng: longitude});
            },
            (err) => {
                console.error(err);
                alert('Unable to retrive your location');
            }, {
            enableHighAccuracy: true, maximumAge: 1000, timeout: 5000
        }
        );

        return () => navigator.geolocation.clearWatch(watahId);
    }, []);


    return (

        <>
           <div>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API=KEYS">
                <GoogleMap mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}>
                    <Marker position={currentPosition}/>
                </GoogleMap>
            </LoadScript>
           </div>


        </>
    )
}

export default LiveTracking;
*/