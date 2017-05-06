// stores the votes and WordsWithIds which are displayed right now
// allows a "back" action
var votesArray;
var possibleWordsWithIdsStack = [];
var displayedWords = [];

// stores the word and ids pairs of all words. Is calculated initially and can later be reused.
var calculatedWordsHash = {};

// older browsers don't support the 'includes' function. In this case the function is defined separately
if (!String.prototype.includes) {
     String.prototype.includes = function(word) {
         return this.search(word)!=-1;
     };
 }

// loads the words for the wordcloud
function loadWords(){
  var badWords = ["januar", "februar", "märz", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "dezember",
				"betreffend", "art", "bbl", "teil", "neu", "artikel", "mass", "der", "gegen", "pro", "schluss", "aug", "ein", "urs", "bei", "für", "nach", "mit", "gesetz", "beschluss"];
  var currentVotes = votesArray;   // get the current votes
  var newWordList = [];
  var wordHash = {};
  for(var i = 0; i<currentVotes.length; ++i){
    var vote = currentVotes[i];
    var description = vote.description.replace(/["()!«»\[\]:0-9-]/g, "");  // get the description and remove all specail characters except characters and dots
    var words = description.split(" ");
    for(var j=0; j<words.length; ++j){
      var word = words[j];
      if(word == "" || word.indexOf(".")!=-1 || word.length<3 ||(word.length<7 && word[0] === word[0].toLowerCase())){   // if one of these criteria is met, the word shouldn't be in the wordcloud
        continue;
      }
      word = word.toLowerCase();
      if(badWords.indexOf(word)!=-1){
        continue;
      }
      if(!wordHash.hasOwnProperty(word)){
        wordHash[word] = new Set();
      }
      wordHash[word].add(vote.id);
    }
  }
  var hashKeys =Object.keys(wordHash);
  var checkedWords = {};
  for(var i=0; i<hashKeys.length; ++i){
    var word = hashKeys[i];
    if(!wordHash.hasOwnProperty(word)){   //continue if this word has already been deleted.
      continue;
    }
    var ids = wordHash[word];
    var toBeDeleted = false;
    var updatedKeys = Object.keys(wordHash);
    for(var j=0; j<updatedKeys.length; ++j){
      var compareWord = updatedKeys[j];
      if((checkedWords[compareWord] && !word.includes(compareWord)) || word.localeCompare(compareWord)==0){
        continue;
      } else if(compareWord.includes(word)){
        wordHash[word] = new Set([...ids, ...wordHash[compareWord]]);
        if(isSameWord(word, compareWord)){
          delete wordHash[compareWord];
        }
      } else if(word.includes(compareWord)){
        wordHash[compareWord] = new Set([...ids, ...wordHash[compareWord]]);
        if(isSameWord(compareWord, word)){
          toBeDeleted = true
        }
      }
    }
    if(toBeDeleted){
      delete wordHash[word];
    } else {
      checkedWords[word]=true;
    }
  }
  calculatedWordsHash = wordHash;

  var hashKeys = Object.keys(wordHash);
  var wordList = [];
  for(var i=0; i<hashKeys.length; ++i){
    var word = hashKeys[i];
    var ids = wordHash[word];
    wordList.push(new WordWithIds(word, ids));
  }
  wordList.sort(function(word1, word2){
    return word2.ids.size - word1.ids.size;
  });
  possibleWordsWithIdsStack.push(wordList);
}

function displayWordCloud(){
  $("svg").remove();
  var wordList = possibleWordsWithIdsStack[possibleWordsWithIdsStack.length-1];
  var trimmedWordList = [];
  var ids = new Set();
  for(var i=0; i<wordList.length; ++i){
    if(wordList[i].hasOtherIds(ids)){
      trimmedWordList.push(wordList[i]);
      ids = new Set([...ids, ...wordList[i].ids]);
    }
  }
  if(trimmedWordList.length < 50){
    for(var i=0; i<wordList.length && trimmedWordList.length < 50; ++i){
      if(trimmedWordList.indexOf(wordList[i])==-1){
        trimmedWordList.push(wordList[i]);
      }
    }
  }

  var fill = d3.scale.category20();

  var words = trimmedWordList.map(function(word) {
    var size =15 + word.ids.size / 10;
    return {text: word.word.toUpperCase(), size: size};
  });

  d3.layout.cloud().size([960, 600])
      .words(words)
      .padding(5)
      .rotate(function() { return ~~(Math.random() * 2) *90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
    d3.select("body").append("svg")
        .attr("width", 960)
        .attr("height", 600)
      .append("g")
        .attr("transform", "translate(480,300)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
}

function isSameWord(word1, word2){
  if(word2.length - word1.length <= 2 && word1[0] === word2[0] && word1[1] === word2[1] && word1[2] === word2[2]){
    return true;
  }
  return false;

}

function calculateNewList(){
  var matchingIds = calculatedWordsHash[displayedWords[0]];
  for(var i=1; i<displayedWords.length; ++i){
    matchingIds = matchingIds.filter(function(id){ return calculatedWordsHash[displayedWords[i]].has(id)});
  }
  var newWordList = [];
  for(var i=0; i<possibleWordsWithIdsStack[0].length; ++i){
    var wordWithIds = possibleWordsWithIdsStack[0][i];
    if(displayedWords.indexOf(wordWithIds.word)!=-1){
      continue;
    }
    var newWord = new WordWithIds(wordWithIds.word, wordWithIds.ids.filter(function(id){return matchingIds.has(id);}));
    if(newWord.ids.size != 0){
      newWordList.push(newWord);
    }
  }
  newWordList.sort(function(word1, word2){
    return word2.ids.size - word1.ids.size;
  });
  possibleWordsWithIdsStack.push(newWordList);
  return matchingIds.size;
}

Set.prototype.filter = function(f) {
  var newSet = new Set();
  for (var v of this){
    if(f(v)){
      newSet.add(v);
    }
  }
  return newSet;
};

$(document).ready(function(){
  // loads the json with the results of all votes
  $.getJSON("results_kanton.json", function(data){
    var votes = [];
    $.each(data, function(key, val){
      var vote = new Vote(val);
      votes.push(vote);
    });
    votesArray = votes;
    loadWords();
    displayWordCloud();
  }).fail( function(d, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: "+error)
  });

  $("body").on("click", "text", function(event){
    var selectedWord = $(this).html().toLowerCase();
    displayedWords.push(selectedWord);
    console.log(displayedWords);
    var count = calculateNewList();
    if(count <= 25){
      console.log(count+" Einträge passen dazu");
    } else {
      displayWordCloud();
    }
  });
});
