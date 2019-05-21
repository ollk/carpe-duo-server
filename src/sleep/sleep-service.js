'use strict';

const SleepService = {

  getUserSleep(db, user_id) {
    return db
      .from('carpeduo_users')
      .select(
        'sat_wake',
        'sat_bed',
        'sun_wake',
        'sun_bed'
      )
      .where('id', user_id);
  },

  updateSleep(db, newSleep) {
    return db
      .into('carpeduo_users')
      .update({
        sat_wake: newSleep.sat_wake,
        sat_bed: newSleep.sat_bed,
        sun_wake: newSleep.sun_wake,
        sun_bed: newSleep.sun_bed
      })
      .where('id', '=', newSleep.id)
      .returning(['sat_wake','sat_bed','sun_wake','sun_bed']);
  },
};

module.exports = SleepService;