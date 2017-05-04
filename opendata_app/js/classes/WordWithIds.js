// constructor
function WordWithIds(word, ids){
  this.word = word;
  if(Array.isArray(ids)){
    this.ids = ids;
  } else {
    this.ids = [];
    this.ids.push(ids);
  }
}

// adds one id
WordWithIds.prototype.addId = function(additionalId){
  if(this.ids.indexOf(additionalId)==-1){
    this.ids.push(additionalId);
  }
}

// adds multiple ids
WordWithIds.prototype.addIds = function(additionalIds){
  for(var i=0; i<additionalIds.length; ++i){
    this.addId(additionalIds[i]);
  }
}

// returns how many ids are associated with this word
WordWithIds.prototype.getCount = function(){
  return this.ids.length;
}

/*
 * Checks, if two words are familiar and could be merged into each other.
 * If no second word is specified, use this word.
 */
WordWithIds.prototype.isWordSimilar = function(wordToMerge, wordToMergeInto = this.word ){
  var word1 = wordToMergeInto.toLowerCase();
  var word2 = wordToMerge.toLowerCase();
  if(new RegExp(word1).test(word2) && word2.length - word1.length <= 2 && word1.charAt(0) === word2.charAt(0) && word1.charAt(1) === word2.charAt(1) && word1.charAt(2) === word2.charAt(2)){
    return true;
  }
  return false;

}

WordWithIds.prototype.compareWord = function(word, id){
  var word1 = this.word.toLowerCase();
  var word2 = word.toLowerCase();
  if(word1.localeCompare(word2)==0){
    this.addId(id);
    return this;
  }
  if(new RegExp(word1).test(word2)){
    this.addId(id);
    if(this.isWordSimilar(word2, word1)){
      return this;
    } else {
      return new WordWithIds(word, id);
    }
  }
  if(new RegExp(word2).test(word1)){
    if(this.isWordSimilar(word1, word2)){
      this.word = word;
      return this;
    } else {
      return new WordWithIds(word, this.ids).addId(id);
    }
  }
  return null;
}
