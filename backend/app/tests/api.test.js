process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app');

//const mongoose = require('mongoose');
//const User = require('../components/user/user.model');
require('../app.db')("mongo");
require('../components/user/user.router.test')(app,chai);
require('../components/workshop/workshop.router.test')(app,chai);

/*
User.remove({}).then ( (res) => {
  console.log('removed all users');
  //require('../components/workshop/workshop.router.test')(app,chai);
  require('../components/user/user.router.test')(app,chai);
});
*/
