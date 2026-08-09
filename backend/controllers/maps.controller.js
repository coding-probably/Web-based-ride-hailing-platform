const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    console.log("inside controller")

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinate not found' + error.message });
    }
}

module.exports.getDistanceTime = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }



}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;
        if (!input || typeof input !== 'string') {
            return res.status(400).json({ error: 'Input must be a non-empty string' });
        }
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        return res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error in getAutoCompleteSuggestion', error);
        return res.status(500).json({ error: 'Internal Sever Error' });
    }
}