// stores the votes and WordsWithIds which are displayed right now
// allows a "back" action
var displayedVotesStack = [];
var displayedWordsWithIdsStack = [];

// loads the words for the wordcloud
function loadWords(){
  var currentVotes = displayedVotesStack[displayedVotesStack.length-1];   // get the current votes
  var newWordList = [];
  for(var i = 0; i<currentVotes.length; ++i){
    var vote = currentVotes[i];
    var description = vote.description.replace(/["()«»:0-9-]/g, "");  // get the description and remove all specail characters except characters and dots
    var words = description.split(" ");
    for(var j=0; j<words.length; ++j){
      var word = words[j];
      if(word == "" || word.length<3 ||(word.length<7 && word.charAt(0) === word.charAt(0).toLowerCase())){   // if one of these criteria is met, the word shouldn't be in the wordcloud
        continue;
      }
      var wordAdded = false;
      for(var l=0; l<newWordList.length; ++l){
        var currentWord = newWordList[l];
        var returnWord = currentWord.compareWord(word, vote.id)
        if(returnWord != null){
          wordAdded = true;
          if(!isWordAlreadyInList(newWordList, returnWord)){
            newWordList.push(returnWord);
          }
        }
      }
      if(!wordAdded){    // if the word is not already added to some wordWithIds object, create a new one
        newWordList.push(new WordWithIds(word, vote.id));
      }
    }
  }
  for(var i=0; i<newWordList.length; ++i){
    console.log(newWordList[i].word+": "+newWordList[i].getCount());
  }
  console.log("Wörter: "+newWordList.length);
  console.log("finished looping");
}

function isWordAlreadyInList(wordList, wordWithIds){
  if(wordList.indexOf(wordWithIds)==-1){
    return true;
  }
  var isSimilar = false;
  for(var i=0; i<wordList.length; ++i){
    if(wordList[i].isWordSimilar(wordWithIds.word)){
      wordList[i].addIds(wordWithIds.ids);
      isSimilar = true;
    }
  }
  if(isSimilar){
    return true;
  }
  return false;
}

$(document).ready(function(){
  // loads the json with the results of all votes
  $.getJSON("results_kanton.json", function(data){
    var votes = [];
    $.each(data, function(key, val){
      var vote = new Vote(val);
      votes.push(vote);
    });
    displayedVotesStack.push(votes);
    loadWords();
  }).fail( function(d, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: "+error)
  });
});
