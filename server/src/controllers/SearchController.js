
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    async index(req, res) {
        //search devs raio 10km
        //filter by techs

        const {latitude, longitude, techs } = req.query;
        
        const techsArray = parseStringAsArray(techs);

        let devs = await Dev.find({
            techs: {
                $in: techsArray,  
            },
            location: {
                $near: {
                    $geometry: {
                         type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                }

            }
        })

        return res.json(devs);
    },


    
}