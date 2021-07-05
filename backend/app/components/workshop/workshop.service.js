
const winston = require('winston');
const moment = require('moment');

const mongoose = require('mongoose');

const userService = require('../user/user.service');

const Workshop = require('./workshop.model');


exports.getById = async (id) => {
  try {
    winston.debug(`Workshop service getting by id ${id}`);
    return await Workshop.findById(id);
  } catch (err) {
    winston.error(`Workshop Service: Error getting workshop by id ${id}`);
    winston.debug(err);
    return false;
  }
}

exports.getNearby = async (id, longitude, latitude) => {
  try {
    winston.debug('Workshop service getting nearby workshops');
    // If coordinates are not specified just get the workshops as they are from the DB
    let workshops;
    if (longitude && latitude) {
      workshops = await Workshop.find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [-73.9667, 40.78] }
          },
        },
      })
    } else {
      workshops = await Workshop.find({});
    }

    // Get Special workshops ( liked & disliked )
    let likedWorkshops = await userService.getLikedWorkshops(id);
    let dislikedWorkshops = await userService.getDislikedWorkshops(id);
    let specialWorkshops = [...likedWorkshops, ...dislikedWorkshops];
    console.log(specialWorkshops);
    // If Liked || if Disliked less than two hours don't show
    for (let i = 0 ; i < workshops.length ; i++) {
      for (let sp of specialWorkshops) {
        if (workshops[i]._id.toString() === sp.workshopId.toString()) {
          if (sp.likedTime) {
            // TODO-code-challenge: Secondary Functionality: As a User, I can like a workshop, so it can be added to my preferred workshops
          } else if (sp.dislikedTime) {
            // TODO-code-challenge: Bonus: As a User, I can dislike a workshop, so it won’t be displayed within “Nearby WorkShops” list during the next 2 hours
          }
        }
      }
    }
    return workshops;
  } catch (err) {
    winston.error('Workshop service Error: could not get nearby workshops');
    winston.debug(err);
    return false;
  }
};
