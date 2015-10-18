'use strict';

let corser = require('corser');

exports.cors = corser.create({
  origins: ['http://auth.test'],
  methods: ['POST']
});
