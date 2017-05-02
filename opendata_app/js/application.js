var displayedVotesStack = [];
var displayedWordsWithIdsStack = [];

function loadWords(){
  if(displayedVotesStack.length = 0){
    var votes = []:
    $.getJSON("results_kanton.json", function(data){
      $.each(data, function(key, val){
        var vote = new Vote(val);
        votes.push(vote);
      });
    }).fail( function(d, textStatus, error) {
          console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    });
    displayedVotesStack.push(votes);
  }

  var currentVotes = displayedVotesStack[displayedVotesStack.length-1];
  var newWordList = [];
  currentVotes.foreach(function(vote){
    var description = vote.description.replace(/["()«»/.0-9-]/g);
    var words[] = description.split(" ");
    words.foreach(function(word){
      var isAdded = false;
      newWordList.foreach(function(wordWithIds){

      });
      unless(isAdded){
        newWordList.push(new WordWithIds(vote.description, vote.id));
      }
    });
  });
}

$(document).ready(function(){

  setTimeout(function(){
    console.log(votes.length);
    console.log(votes[10]);
    votes.forEach(function(vote){
      $("body").append("<p>"+vote.date+": "+vote.description+"</p>")
    });
  }, 1000);
});
