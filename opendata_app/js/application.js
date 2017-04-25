$(document).ready(function(){
  console.log("in");
  var json = $.getJSON("results_kanton.json", function(data){
    console.log("success");
  }).fail( function(d, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: "+error)
  });
  console.log(JSON.parse(json.responseJSON));
  /*console.log(results);
  console.log(results[0]);
  $.each(results, function(key, val){
    console.log(key);
    console.log(val);
    $("body").append(val.VORLAGE_LANGBEZ);
  });*/
});
