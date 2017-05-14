$(document).ready(function(){
  //initializes the help modal
  $('.modal').modal();

  // loads the json with the results of all votes
  $.getJSON("json/results_kanton.json", function(data){
    var votes = [];
    $.each(data, function(key, val){
      var vote = new Vote(val);
      votes.push(vote);
    });
    votes.sort(function(vote1, vote2){
      return vote2.date - vote1.date;
    });
    votesArray = votes;
    loadWords();
    $("#vote-count").show();
    displayWordCloud();
  }).fail( function(d, textStatus, error) {
    console.error("getJSON failed, status: " + textStatus + ", error: "+error)
  });

  $("body").on("click", "text", function(event){
    $("svg").remove();
    $("table").remove();
    $(".preloader-wrapper").show();
    var selectedWord = $(this).html();
    $(".breadcrumb-wrapper").append("<a href=\"#!\" class=\"breadcrumb\">"+selectedWord+"</a>");
    displayedWords.push(selectedWord.toLowerCase());
    var currentIds = calculateNewList();
    if(currentIds.size <= 25){
      showDetailTable(currentIds);
    } else {
      displayWordCloud();
    }
  });

  $("body").on("click", ".breadcrumb", function(event){
    $("svg").remove();
    $("table").remove();
    $("#single-vote-wrapper").hide();
    $("#details-wrapper").show();
    $(".preloader-wrapper").show();
    if($(this).is("#overview")){
      returnToOverview();
    } else {
      var word = $(this).html().toLowerCase();
      jumpToBreadcrumb(word);
    }
  });

  $("body").on("click", "tr.vote-row", function(event){
    $("#details-wrapper").hide();
    $(".preloader-wrapper").show();
    var voteId = $(this).find("input.vote-id").val();
    showVoteDetails(voteId);
  });
});
