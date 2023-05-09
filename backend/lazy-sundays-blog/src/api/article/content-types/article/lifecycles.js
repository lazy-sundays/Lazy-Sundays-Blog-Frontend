'use strict';

const { default: readTimeEstimate } = require('read-time-estimate');

module.exports = {
  
    async afterCreate(event) {
      const { result, params } = event;

      //calculate and store time it takes to read
      const entry = await strapi.entityService.update('api::article.article', result.id, {
        data: { 
          readTime: readTimeEstimate(result.body).duration.toFixed(2)
        },
      });

    },

    async afterUpdate(event) {
      const { result, params } = event;

      //calculate and store time it takes to read
      const entry = await strapi.entityService.update('api::article.article', result.id, {
        data: { 
          readTime: readTimeEstimate(result.body).duration.toFixed(2)
        },
      });
    },
};