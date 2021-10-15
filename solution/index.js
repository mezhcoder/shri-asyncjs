// solution/index.js
module.exports = function (Homework) {
    const { AsyncArray, add, subtract, multiply, divide, less, equal, lessOrEqual } = Homework;
    return (array, fn, initialValue, cb) => {
        async function run() {
            const length = () => new Promise( function(resolve, reject) {
                array.length(resolve);
            });

            const pop = () => new Promise( function(resolve, reject) {
                array.pop(resolve);
            });

            while (await length()) {
                const element = await pop();

                const result = () => new Promise( function(resolve, reject) {
                    fn(initialValue, element, 0, 1, resolve);
                });

                initialValue = await result();
            }
            return initialValue;
        }

        run().then(x => {
            cb(x);
        })
    }
}
