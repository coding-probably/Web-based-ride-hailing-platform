const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    if (!address || typeof address !== 'string') {
        throw new Error('Address must be a non-empty string');
    }
    const url = 'https://nominatim.openstreetmap.org/search';
    console.log("map services");
    try {
        const response = await axios.get(url,
            // `q=sheriyans+coding+school+indrpuri&format=json&addressdetails=1`);
            {
                params: {
                    q: address,
                    format: 'json',

                },
            });
        console.log(response.data);
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            console.log("map data: ", response.data);
            return {
                ltd: parseFloat(lat),
                lng: parseFloat(lon)
            };

        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }

    // const url = 'https://nominatim.openstreetmap.org/search';
    // console.log("map services");
    // try {
    //     const response = await axios.get(url,
    //         // `q=sheriyans+coding+school+indrpuri&format=json&addressdetails=1`);
    //         {
    //         params: {
    //             q: address,
    //             format: 'json',

    //         },
    //     });
    //     console.log(response.data);
    //     if (response.data && response.data.length > 0) {
    //         const { lat, lon } = response.data[ 0 ];
    //         console.log("map data: ",response.data);
    //         return {
    //             ltd: parseFloat(lat),
    //             lng: parseFloat(lon)
    //         };

    //     } else {
    //         throw new Error('Unable to fetch coordinates');
    //     }
    // } catch (error) {
    //     console.error(error);
    //     throw error;
    // }



}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and Distance is rquired');
    }
    return {
        distance_km: 123,
        distance_min: 12
    }


    // =====> if have google api <=======
    // const apiKey = process.env.GOOGLE_MAPS_API;

    // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins`;
    // try {
    //     const response = await axios.get(url);
    //     if (response.data.status === 'OK') {
    //         if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
    //             throw new Error('No routes found');
    //         }
    //         return response.data.rows[0].elements[0];
    //     } else {
    //         throw new Error('Unable to fetch distance and time');
    //     }

    // } catch (error) {
    //     console.error(error);
    //     throw error
    // }

    



}

module.exports.getAutoCompleteSuggestions = async (address) => {
    if (!address || typeof address !== 'string') {
        throw new Error('query is required');
    }
    const url = 'https://nominatim.openstreetmap.org/search';
    try {
        const response = await axios.get(url, {
            params: {
                q: address,
                format: 'json',
                addressdetails: 1,
                limit: 5
            }
        });

        if (response.data && response.data.length > 0) {
            return response.data.map(items => ({
                name: items.name,
                display_name: items.display_name,
                lat: parseFloat(items.lat),
                lan: parseFloat(items.lon)
            }));
        } else {
            throw new Error('No suggestions found for the given input');
        }
    } catch (error) {
        throw new Error('Failed to fetch the suggestions : ' + error.message);




        // ======> If have google api <======
        // if (!address) {
        //     throw new Error('query is required');
        // }
        // const apiKey = ProcessingInstruction.env.GOOGLE_MAPS_API;
        // const url = `<webaddress${address}`;
        // try {
        //     const response = await axios.get(url);
        //     if (response.data.status === 'OK'){
        //         return response.data.predictions;

        //     } else {
        //         throw new Error('Unable to fetch suggestions');
        //     }
        // } catch (error) {
        //     console.log(error);
        //     throw error;
        // }
    }
}

module.exports.getCaptainInTheRadius = async (ltd, lng, radius)  => {

    const captains = await captainModel.find({

        // radiusin km
        location: {
            $geoWithin: {
                $centerSphere : [ [ltd, lng ], radius/ 6371 ]
            }
        }
    });

    return captains;
}