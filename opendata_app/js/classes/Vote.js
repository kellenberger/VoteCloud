// vote constructor
function Vote(object){
  this.id = parseInt(object.STAT_VORLAGE_ID);
  var date = object.ABSTIMMUNGSTAG.split(".");
  this.date = new Date(date[2]+"-"+date[1]+"-"+date[0]);
  this.shortDescription = object.VORLAGE_KURZBEZ;
  this.description = object.VORLAGE_LANGBEZ;
  this.type = object.VORLAGENART;
  this.voteDescription = object.ABSTIMMUNGSART_BEZ;
  this.yesPercentage = object.JA_ANTEIL_PROZENT;
  this.voteParticipation = object.STIMMBETEILIGUNG;
}

Vote.prototype.print = function(){
  console.log(this.date+" "+this.shortDescription);
}
