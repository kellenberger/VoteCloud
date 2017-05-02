// constructor
function WordWithIds(word, ids){
  this.word = word;
  if(Array.isArray(ids)){
    this.ids = ids;
  } else {
    this.ids = [];
    ids.push(id);
  }
}

// adds multiple ids
WordWithIds.prototype.addIds = function(additionalIds){
  additionalIds.foreach(function(id){
    if(this.ids.indexOf(id)=-1){
      ids.push(id);
    }
  });
}

// returns how many ids are associated with this word
WordWithIds.prototype.getCount = function(){
  return ids.length;
}

/*
 * Checks, if two words are familiar and could be merged into each other.
 * If no second word is specified, use this word.
 */
WordWithIds.prototype.isWordSimilar = function(wordToMerge, wordToMergeInto = this.word ){
  var word1 = wordToMergeInto.toLowerCase();
  var word2 = wordToMerge.toLowerCase();
  if(word1.test(new RegExp(word2)) && word2.length - word1.length <= 2 && word1.charAt(0) == word2.charAt(0) && word1.charAt(1) == word2.charAt(1) && word1.charAt(2) == word2.charAt(2)){
    return true;
  }
  return false;

}
