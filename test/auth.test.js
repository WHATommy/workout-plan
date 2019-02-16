const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonwebtoken = require('jsonwebtoken');
const faker = require('faker');

const { secretOrKey } = require('../config/keys_dev');
const { User } = require('../models/user');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Integration tests for: /api/user', function () {
    let testUser, jwtToken;

    beforeEach(function () {
        testUser = createFakerUser();

        return User.create({
            username: testUser.userName,
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
                            username: testUser.userName,
                            email: testUser.email
                        }
                    },
                    secretOrKey,
                    {
                        algorithm: 'HS256',
                        expiresIn: 21600,
                        subject: testUser.username
                    }
                );
            })
            .catch(err => {
                console.log(err);
            });
    });

    it('Should login correctly and return a valid JSON Web Token', function () {
        return chai.request(app)
            .post('/api/user/login')
            .send({
                email: testUser.email,
                password: testUser.password
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('jwtToken');

                const jwtPayload = jsonwebtoken.verify(res.body.jwtToken, JWT_SECRET, {
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
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
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
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            username: `${faker.lorem.word()}${faker.random.number(100)}`,
            password: faker.internet.password(),
            email: faker.internet.email()
        };
    }
});