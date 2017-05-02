var votes = [];

$(document).ready(function(){
  $.getJSON("results_kanton.json", function(data){
    $.each(data, function(key, val){
      var vote = new Vote(val);
      votes.push(vote);
    });
  }).fail( function(d, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: "+error)
  });
  setTimeout(function(){
    console.log(votes.length);
    console.log(votes[10]);
    votes.forEach(function(vote){
      vote.print();
    });
}, 1000);

  //console.log(JSON.parse(json.responseJSON));
  /*console.log(results);
  console.log(results[0]);
  $.each(results, function(key, val){
    console.log(key);
    console.log(val);
    $("body").append(val.VORLAGE_LANGBEZ);
  });*/
});
