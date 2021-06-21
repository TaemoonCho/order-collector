const chunkenizeArray = (arr, size) => {
    let j = 0;
    const temparray = [],
        chunk = size;
    for (let i = 0, j = arr.length; i < j; i += chunk) {
        temparray.push(arr.slice(i, i + chunk));
    }
    return temparray;
};

export { chunkenizeArray };
