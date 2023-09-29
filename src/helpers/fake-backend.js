import ROLES from 'constants/roles';

export function configureFakeBackend() {
    let users = [
        { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User', role: ROLES.SUPER_ADMIN },
        { id: 2, username: 'test1', password: 'test1', firstName: 'Test1', lastName: 'User1', role: ROLES.COR_SUPER_ADMIN },
        { id: 3, username: 'test2', password: 'test2', firstName: 'Test2', lastName: 'User2', role: ROLES.SUPERVISOR_ADMIN },
        { id: 4, username: 'test3', password: 'test3', firstName: 'Test3', lastName: 'User3', role: ROLES.PROFESSIONAL },
        { id: 5, username: 'test4', password: 'test4', firstName: 'Test4', lastName: 'User4', role: ROLES.CONSUMER },
        { id: 6, username: 'test5', password: 'test5', firstName: 'Test5', lastName: 'User5', role: ROLES.FREE_APP_SUITE },
        { id: 7, username: 'test6', password: 'test6', firstName: 'Test6', lastName: 'User6', role: ROLES.VIEW_ONLY },
    ];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb2RlcnRoZW1lIiwiaWF0IjoxNTU1NjgyNTc1LCJleHAiOjE1ODcyMTg1NzUsImF1ZCI6ImNvZGVydGhlbWVzLmNvbSIsInN1YiI6InRlc3QiLCJmaXJzdG5hbWUiOiJIeXBlciIsImxhc3RuYW1lIjoiVGVzdCIsIkVtYWlsIjoidGVzdEBoeXBlci5jb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4ifQ.8qHJDbs5nw4FBTr3F8Xc1NJYOMSJmGnRma7pji0YwB4'
                        };
                        resolve({ ok: true, json: () => responseJson });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }
                    return;
                }

                // register
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // add new users
                    let { firstName, lastName } = params.fullname.split(" ");
                    let newUser = { id: users.length + 1, username: firstName, password: params.password, firstName: firstName, lastName: lastName, role: 'Admin' }
                    users.push({ newUser })

                    let responseJson = {
                        id: newUser.id,
                        username: newUser.username,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        role: newUser.role,
                        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb2RlcnRoZW1lIiwiaWF0IjoxNTU1NjgyNTc1LCJleHAiOjE1ODcyMTg1NzUsImF1ZCI6ImNvZGVydGhlbWVzLmNvbSIsInN1YiI6InRlc3QiLCJmaXJzdG5hbWUiOiJIeXBlciIsImxhc3RuYW1lIjoiVGVzdCIsIkVtYWlsIjoidGVzdEBoeXBlci5jb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4ifQ.8qHJDbs5nw4FBTr3F8Xc1NJYOMSJmGnRma7pji0YwB4'
                    };
                    resolve({ ok: true, json: () => responseJson });
                    return;
                }

                // forget password
                if (url.endsWith('/users/password-reset') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username;
                    });

                    if (filteredUsers.length) {
                        let responseJson = {
                            message: "We've sent you a link to reset password to your registered email."
                        };
                        resolve({ ok: true, json: () => responseJson });
                    } else {
                        // else return error
                        reject('Sorry, we could not find any registered user with entered username');
                    }
                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb2RlcnRoZW1lIiwiaWF0IjoxNTU1NjgyNTc1LCJleHAiOjE1ODcyMTg1NzUsImF1ZCI6ImNvZGVydGhlbWVzLmNvbSIsInN1YiI6InRlc3QiLCJmaXJzdG5hbWUiOiJIeXBlciIsImxhc3RuYW1lIjoiVGVzdCIsIkVtYWlsIjoidGVzdEBoeXBlci5jb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4ifQ.8qHJDbs5nw4FBTr3F8Xc1NJYOMSJmGnRma7pji0YwB4') {
                        resolve({ ok: true, json: () => users });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}