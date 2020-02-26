
// Note: Promise.allSettled(iterable) is not used.

/*
A Promise is in one of these 3 states:

pending: initial state.
fulfilled: success. resolve() was called.
rejected: failed. reject() was called..

*/


describe('Lukes Awesome Promise Test', () => {

    test('Q1', async () => {

        function someApiCalled() {
            return new Promise(function (resolve, reject) {
                return {
                    apiData: 'api call value'
                }
            })
        }

        const result = await someApiCalled();

        expect(result).toEqual('api call value'); // Does this pass?

    });

    test('Q2', async () => {

        const promise = new Promise(function(resolve, reject) {
            resolve("resolved1");
            console.log('test');
            reject(new Error("…"));
            resolve("resolved2")
        });

        expect(await promise).toEqual('resolved2') // Does this pass?

    });


    // NOTE: Do not scroll down to Q3 until Q2 is done

    test('Q3', async () => {

        const promise = new Promise(function(resolve, reject) {
            resolve("resolved1");
            reject(new Error("…"));
            resolve("resolved2")
        });

        expect(promise).toEqual('resolved2') // Does this pass?

    });


    test('Q4', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        return promise1.then(function(value) {
            console.log(value);
        }).then(function(value) {
            console.log(value);
        });

        // What is the output?

    });

    // *********
    test('Q5', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        await promise1.then(function(value) {
            console.log(value);
        });

        await promise1.then(function(value) {
            console.log(value);
        });

        // What is the output?

    });

    test('Q6', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        await promise1.then(function(value) {
            console.log(value);
        });

        await promise1.then(function(value) {
            console.log(value);
        }).then(function(value) {
            console.log(value);
        });

        // What is the output?

    });

    test('Q7', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
            console.log('I resolved');
        });

        return promise1;

        // What is the output?


    });

    test('Q8', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            reject('foo');
        });

        promise1.then(function(value) {
            console.log(value);
        });

        return promise1.then(function(value) {
            console.log(value);
        }).then(function(value) {
            console.log(value);
        }).catch(function (error) {
            console.log(error);
        });

        // What is the output?


    });

    test('Q9', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        promise1.then(function(value) {
            console.log(value);
        }).then(function() {
            console.log(value === 'foo');
        }).catch( function (error) {
            console.log('error', error)
        });

        // What is the output?

    });

    test('Q10', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        const printValue = function(value) {
            console.log(value);
        };

        return promise1.then(printValue()).then(function() {
            console.log('foo');
        }).catch( function (error) {
            console.log('error')
        });

        // What is the output?

    });

    test('Q11', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        return promise1.then().then(function() {
            console.log('foo');
        }).catch( function (error) {
            console.log('error')
        });

        // What is the output?

    });

    test('Q12', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        return promise1.then(function() {
            console.log('foo');
            throw new Error('oh')
        }).catch( function (error) {
            console.log('error')
        }).finally(function () {
            console.log('finally')
        });

        // What is the output?

    });

    test('Q13', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        const promise2 = new Promise(function(resolve, reject) {
            reject('bar');
        });

        return Promise.all([promise1, promise2]).then(function(data) {
            console.log('foo');
        }).catch( function (error) {
            console.log('error')
        });

        // What is the output?

    });

    test('Q14', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        const promise2 = new Promise(function(resolve, reject) {
            reject('bar');
        });

        return Promise.race([promise1, promise2]).then(function() {
            console.log('foo');
        }).catch( function (error) {
            console.log('error')
        });

        // What is the output?

    });

    test('Q15', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        return promise1.then(function() {
            console.log('foo');
            throw Error('test')
        }).catch( function (error) {
            console.log('error');
            return 'error happened'
        }).then( function (message) {
            console.log('message', message)
        }).catch(function (error) {
            console.log('error', error)
        });

        // What is the output?

    });

    test('Q16', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        return promise1.then(function() {
            return Promise.resolve(Promise.resolve(Promise.reject(':(')))
        }).catch( function (error) {
            console.log('error');
            return 'error happened'
        }).then( function (message) {
            console.log('message', message)
        }).catch(function (error) {
            console.log('error', error)
        });

        // What is the output?

    });


    // Testing related questions

    test('Testing - Q1', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            reject('foo');
        });

        expect(promise1).resolves.toReturn();
        // Does it pass?

    });

    function mockReturnValue2(promise) {
        return promise.then(() => {
            return Promise.reject(); // Pretend the test forgot formatting and an error was thrown.
        })
    }

    function mockReturnValue(promise) {
        return promise.then(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('I did it');
                    resolve('Your did it')
                }, 1000);
            })

        })

    }

    test('Testing - Q2', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        mockReturnValue(promise1);

        return promise1.then((data) => {
            console.log('I am done', data)

        });

        // What is my output?

    });

    test('Testing - Q3', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        await mockReturnValue(promise1);

        return promise1.then((data) => {
            console.log('I am done', data)
        });

        // What is my output?

    });

    test('Testing - Q4', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        return mockReturnValue(promise1).then((data) => {
            console.log('I am done', data)
        });

        // What is my output?

    });

    test('Testing - Q5', async () => {

        const promise1 = new Promise(function(resolve, reject) {
            resolve('foo');
        });

        mockReturnValue2(promise1);

        return promise1.catch((data) => {
            console.log('I am done', data)
        });

        // What is my output?

    });

    // Oh hello there. If you are reading this you should defiantly let me, Luke Barnes know. Who knows, maybe you will get a prize.


});