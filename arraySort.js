const array = [1, 2, -2, 11, 7, 1];

//sort the array in ascending order without using builtin sort method

function sortArray(arr) {
    let temp;

    for (let i = 0; i < arr.length; i++){
        for (let j = i + 1; j < arr.length; j++){
            if (arr[i] > arr[j]) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
       
    }
    return arr;
}

console.log(sortArray(array));
