/**
 * Adds 1 to any number passed in
 * @param {number} n - a number to add 1 to
 * @returns {number}
 */
export const addOne = (n) => n + 1;

export const solution = (s) => {
    const strArr = s.split("");

    let arr = [];
    let single = new Set();
    let tempMax = 0;

    return strArr.reduce((max, current) => {
        arr.push(current);
        single.add(current);

        tempMax = single.size;

        if (arr.length !== tempMax) {
            const repeatCharIndex = arr.indexOf(current);

            arr = arr.slice(repeatCharIndex + 1);

            single = new Set(arr);
        }

        return Math.max(max, tempMax);
    }, 0);
};
