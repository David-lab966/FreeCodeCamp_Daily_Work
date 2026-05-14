const poll = new Map();

/****FUNCTION****/
const isEmpty = (option) =>{
  if(option==="" || option===null || option===undefined){
    return true;
  }
  return false;
}

//增加候选者(项)
const addOption = (option) =>{
  if(isEmpty(option)){
    return "Option cannot be empty.";
  }
  if(!poll.has(option)){
    poll.set(option,new Set());
    return `Option "${option}" added to the poll.`
  }
  return `Option "${option}" already exists.`;
}
// console.log(addOption(null));

//投票给候选人(需要验证是否投过票了 )
const vote = (option, voterId) => {
  if(!poll.has(option)){
    return `Option "${option}" does not exist.`
  }
  //if the voterId has already voted for this option.
  if(poll.get(option).has(voterId)){
    return `Voter ${voterId} has already voted for "${option}".`
  }

  //add to the Set(先取出set再对它增加然后放回去,直接用加到新set然后覆盖旧set就只有一个值!)
  if(!isEmpty(poll.get(option))){
    poll.get(option).add(voterId);
  }else{
    const mySet = new Set();
    mySet.add(voterId);
    poll.set(option,mySet);
  }
  // console.log(`Voter "${voterId}" voted for "${option}".`);
  return `Voter ${voterId} voted for "${option}".`
}
const displayResults = () => {
  let resStr = "";
  poll.keys().forEach(item=> {//增加一步,以防止没有得票的人get返回空
    resStr += `${item}: ${poll.get(item).size ?? 0} votes\n`;
  });
  return "Poll Results:\n"+resStr.slice(0,-1);
  
}

const main = () => {
  ["Turkey","Morocco","Spain"].forEach(item=>addOption(item));
  // vote("Book",1);
  // vote("Book",2);
  // vote("Book",4);
  vote("Turkey",3);
  vote("Turkey",5);
  vote("Morocco",6);

}

main();
  
console.log(displayResults());
console.log("Poll Results:\nTurkey: 2 votes\nMorocco: 1 votes\nSpain: 0 votes");


