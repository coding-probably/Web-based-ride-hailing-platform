const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destinatin are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const fareRates = {
        car: {
            base: 50,
            perKm: 12,
            perMin: 1.5
        },
        auto: {
            base: 30,
            perKm: 9,
            perMin: 1.2
        },
        motorcycle: {
            base: 20,
            perKm: 6,
            perMin: 1
        }
    }

    const calculateFare = (rate) => {
        return (
            Math.round(
            rate.base +
            rate.perKm * distanceTime.distance_km +
            rate.perMin * distanceTime.distance_min)
        )
    };


    const fare = {
        car: calculateFare(fareRates.car),
        auto: calculateFare(fareRates.auto),
        motorcycle: calculateFare(fareRates.motorcycle),
        // motorcycle: calculateFare(fareRates.motorcycle).toFixed(2),
    };

    return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }

    return generateOtp(num);
}


module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    });

    return ride;
}


module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findByIdAndUpdate({ _id: rideId }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select("+otp");
    console.log("ride : ", ride);

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}


module.exports.startRide = async ({ rideId, otp, capatin }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and otp are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findByIdAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    });


    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}