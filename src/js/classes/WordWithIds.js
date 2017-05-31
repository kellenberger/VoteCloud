// constructor
function WordWithIds(word, id){
  this.word = word;
  if(typeof id ==="number"){
    this.ids = new Set();
    this.ids.add(id);
  } else {
    this.ids = id;
  }
}

// checks if word has special id
WordWithIds.prototype.hasOtherIds = function(otherIds){
  if(otherIds.size==0){
    return true;
  }
  var hasSpecialId = false;
  this.ids.forEach(function(id){
    if(!otherIds.has(id)){
      hasSpecialId = true;
      return;
    }
  });
  if(hasSpecialId){
    return true;
  }
  return false;
}
