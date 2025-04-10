const inputArray = [2, 7, 11, 4, -2];
let initialSum = 0;
let initialSum2 = 0;
const outputArray1 = [];
const outputArray2 = [];
for (let i = 0; i <= inputArray.length - 1; i++){
    initialSum += inputArray[i];
    outputArray1.push(initialSum);
}
console.log(outputArray1);

for (let i = inputArray.length - 1; i >= 0; i--){
    initialSum2 += inputArray[i];
    outputArray2[i] = initialSum2;
}
console.log(outputArray2);