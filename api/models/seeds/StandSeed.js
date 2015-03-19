'use strict';

/*
 * StandSeed.js
 *
*/

module.exports = {

  tableName: 'stands',

  seedData: [
    {
      user_id: 1,
      category: 1,
      title: 'Save the planet',
      image_original_url: 'http://lorempixel.com/output/nature-q-c-640-480-1.jpg',
      youtube: 'kWTQZYMIEKE',
      description: 'Super Stand',
      goal_result: 'We\'ll do this and that ...',
      goal: 100,
      duration: 30,
      is_public: true
    },
    {
      user_id: 1,
      category: 2,
      title: 'Oceans are awesome',
      image_original_url: 'http://lorempixel.com/output/nature-q-c-640-480-2.jpg',
      youtube: 'JtJgbd1Jfuk',
      description: 'Super Stand',
      goal_result: 'We\'ll do this and that ...',
      goal: 50,
      duration: 30,
      is_public: true
    },
    {
      user_id: 1,
      category: 3,
      title: 'Antarctica',
      image_original_url: 'http://lorempixel.com/output/nature-q-c-640-480-3.jpg',
      youtube: '3HAuTQGVgjc',
      description: 'Super Stand',
      goal_result: 'We\'ll do this and that ...',
      goal: 200,
      duration: 30
    }
  ]
};
