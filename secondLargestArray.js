const input = [1, 2, -2, 11, 7, 1];
const input1 = [1, 4, 7, 2, 4, 7];


const output = (input1) => {
     
    const sortedInput = input1.sort((a, b) => a - b);
    
    let secondLargest = 0;
      
    let largest = sortedInput[sortedInput.length - 1];

    for (let i = sortedInput.length - 2; i >= 0; i--){
        
        if (largest !== sortedInput[i]) {
          secondLargest =sortedInput[i];
          break;
        }
    }
    return secondLargest;
}

console.log(output(input1));