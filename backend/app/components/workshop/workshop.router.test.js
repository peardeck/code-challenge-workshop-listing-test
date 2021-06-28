
module.exports = (app, chai) => {
  const should = chai.should();
  describe('Workshops API', () => {
    const user = {
      name: "Dummy Bob",
      email: "bob@gmail.com",
      password: "passpass"
    };

    it('Get All Workshops sorted by distance', (done) => {
      chai.request(app)
          .post('/api/v1/users/sign-up')
          .send(user)
          .end((err, res) => {
              if (!err && res.status === 200) {
                chai.request(app)
                    .post('/api/v1/users/sign-in')
                    .send({email: user.email, password: user.password})
                    .end((err, res) => {
                      if (!err && res.status === 200) {
                        chai.request(app)
                            .get('/api/v1/workshops/nearby')
                            .set ('Authorization', `Bearer ${res.body.token}`)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('array');
                                res.body.length.should.be.at.least(1);
                                done();
                            });
                      }
                    });
              }

          });
      });
  });
};
