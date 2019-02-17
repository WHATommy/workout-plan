const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonwebtoken = require('jsonwebtoken');
const faker = require('faker');

const { secretOrKey } = require('../config/keys_dev');
const { User } = require('../models/user');
const { app, startServer, stopServer } = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Integration tests for: /api/user', function () {
    let testUser;
    let jwtToken;
    let JWT_SECRET = secretOrKey

    before(function () {
        return startServer(true);
    });

    after(function () {
        return stopServer();
    });

    beforeEach(function () {
        testUser = createFakerUser();

        return User.hashPassword(testUser.password).then(hashedPassword => {
            return User.create({
                username: testUser.username,
                email: testUser.email,
                password: hashedPassword,
                password2: hashedPassword
            })
                .then(createdUser => {
                    testUser.id = createdUser.id;

                    jwtToken = jsonwebtoken.sign(
                        {
                            user: {
                                id: testUser.id,
                                email: testUser.email
                            }
                        },
                        secretOrKey,
                        {
                            algorithm: 'HS256',
                            expiresIn: 21600,
                            subject: testUser.email
                        }
                    );
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });

    afterEach(function () {
        return new Promise((resolve, reject) => {
            mongoose.connection.dropDatabase()
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    });

    it('Should login correctly and return a valid JSON Web Token', function () {
        console.log(testUser);
        let email = testUser.email;
        let password = testUser.password;
        console.log(`--------${email}, ${password}--------`);
        return chai.request(app)
            .post('/api/user/login')
            .send({
                email: email,
                password: password
            })
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('success', 'token');

                const token = res.body.token.replace("Bearer", "");

                const jwtPayload = jsonwebtoken.verify(token, JWT_SECRET, {
                    algorithm: ['HS256']
                });
                expect(jwtPayload.user).to.be.a('object');
                expect(jwtPayload.user).to.deep.include({
                    username: testUser.username,
                    email: testUser.email
                });
            });
    });

    it('Should refresh the user JSON Web Token', function () {
        const firstJwtPayload = jsonwebtoken.verify(jwtToken, JWT_SECRET, {
            algorithm: ['HS256']
        });
        return chai.request(app)
            .post('/api/user/refresh')
            .set('Authorization', `Bearer ${jwtToken}`)
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('jwtToken');

                const newJwtPayload = jsonwebtoken.verify(res.body.jwtToken, JWT_SECRET, {
                    algorithm: ['HS256']
                });
                expect(newJwtPayload.user).to.be.a('object');
                expect(newJwtPayload.user).to.deep.include({
                    username: testUser.username,
                    email: testUser.email,
                    name: testUser.name
                });

                expect(newJwtPayload.exp).to.be.at.least(firstJwtPayload.exp);
            });
    });

    function createFakerUser() {
        return {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };
    }
});