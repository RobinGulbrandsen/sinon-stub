import sinon from 'sinon';
import {expect} from 'chai';

import UserController from './UserController';
import UserService from './UserService';

describe('UserController', () => {

    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    describe('getUsersByName', () => {

        let UserServiceMock;

        beforeEach(() => {
            UserServiceMock = sandbox.stub(UserService.prototype, 'get');
        });
        afterEach(() => {
            UserServiceMock.restore();
        });

        it('Should call UserService with foo', done => {
            UserServiceMock.returns(Promise.resolve());
            UserController.getUsersByName();

            const args = UserServiceMock.getCalls()[0].args;
            expect(args[0]).to.equal('foo');
            done();
        });

        it('should call UserService and get a user', done => {
            const expectedResultFromMock = [{
                username: 'Batman',
                roles: ['admin', 'awesome']
            }];
            UserServiceMock.returns(Promise.resolve(expectedResultFromMock));

            UserController.getUsersByName().then(result => {
                expect(expectedResultFromMock).to.deep.equal(result);
                done();
            }).catch(err => done(err));
        });
    });
});