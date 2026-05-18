function countup(number) {
  let countArray = [];
  if (number < 1) {
    return [];
  } else {
    countArray = countup(number - 1);
    countArray.push(number);
    return countArray;
  }
}
console.log(countup(5));

//countdown
const countdown = (num) => {
  let returnArray = [];
  if(num < 1){
    return [];
  }
  else{
    returnArray.push(num);

    returnArray = returnArray.concat(countdown(num-1));

    return returnArray;
  }
}
console.log(countdown(2));
//countdown - another way
const countdown = (num) => {
  if (num < 1) return [];
  return [num, ...countdown(num - 1)];
};
