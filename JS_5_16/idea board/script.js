const projectStatus = {
  "PENDING":{
    "description":"Pending Execution",
  },
  "SUCCESS":{
    "description":"Executed Successfully",
  },
  "FAILURE":{
    "description":"Execution Failed",
  },
}

class ProjectIdea{
  constructor(title,description){
    this.title = title;
    this.description = description;
    this.status = projectStatus.PENDING;
  }
  updateProjectStatus(newStatus){
    this.status = newStatus;
  }
}

class ProjectIdeaBoard{
  constructor(title){
    this.title = title;
    this.ideas = [];//holding instances of the ProjectIdea class.
  }
  pin(obj){this.ideas.push(obj);}
  unpin(obj){
    //不会直接对原数组修改,而是返回新数组!!!
    this.ideas = this.ideas.filter(item=>item.title !== obj.title);
  }
  count(){return this.ideas.length}
  formatToString(){
    let resStr = "";
    this.ideas.forEach(idea=>resStr += `${idea.title} (${idea.status["description"]}) - ${idea.description}\n`);
    return `${this.title} has ${this.ideas.length} idea(s)\n` + resStr; 
  }
}
