$(document).ready(function(){
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

  $("#details-wrapper").on("click", "text", function(event){
    addBreadcrumb($(this).html());
  });

  $("body").on("click", ".breadcrumb", function(event){
    if($(this).is(':last-child')){
      return false;
    }
    $("svg").remove();
    $("table").remove();
    $("#single-vote-wrapper").hide();
    $("#vote-count").show();
    $("#details-wrapper").show();
    $(".preloader-wrapper").show();
    if($(this).is("#overview")){
      returnToOverview();
    } else {
      var word = $(this).html().toLowerCase();
      jumpToBreadcrumb(word);
    }
    $("#help-button").attr("href", "#wordcloud-help-modal");
  });

  $("body").on("click", "tr.vote-row", function(event){
    $("#details-wrapper").hide();
    $(".preloader-wrapper").show();
    $(".breadcrumb-wrapper").append("<a href=\"#!\" class=\"breadcrumb\">Details</a>");
    var voteId = $(this).find("input.vote-id").val();
    showVoteDetails(voteId);
    $("#help-button").attr("href", "#scatterplot-help-modal");
  });

  $("body").on("click", "g.legend", function(event){
    if($(this).css("opacity")!=0.5){
      $(this).css("opacity", 0.5);
      $("circle."+this.id).hide();
    } else {
      $(this).css("opacity", 1);
      $("circle."+this.id).show();
    }
  });

  $("body").on("keypress", ".autocomplete-input", function(event){
    if(event.keyCode == 13){
      searchWord($(this).val());
      $("ul.autocomplete-content").html("");
    }
  });

  $("body").on("change", "input#legend-display", function(event){
    $("g.legend").toggle(this.checked);
  });
});
