/**
 * @description jest server
 * @author 一抹晨曦
 */

const request = require('supertest');
const server = require('../src/app').callback();

module.exports = request(server);