'use strict';

//const xss = require('xss');

const SleepService = {

  updateSleep(db, newSleep) {
    return db
      .into('carpeduo_users')
      .update({
        usersatwake: newSleep.userSatWake,
        usersatbed: newSleep.userSatBed,
        usersunwake: newSleep.userSunWake,
        usersunbed: newSleep.userSunBed
      })
      .where('id', '=', newSleep.id)
      .returning(['usersatwake','usersatbed','usersunwake','usersunbed']);
    //end here?  may work for this purpose
  },

  //Any reason to serialize??
  // serializeSleep(sleep) {
  //   return {
  //     userSatWake: sleep.userSatWake,
  //     userSatBed: sleep.userSatBed,
  //     userSunWake: sleep.userSunWake,
  //     userSunBed: sleep.userSunBed
  //   };
  // }
};

module.exports = SleepService;