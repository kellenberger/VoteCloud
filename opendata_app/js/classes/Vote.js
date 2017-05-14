// vote constructor
function Vote(object){
  this.id = parseInt(object.STAT_VORLAGE_ID);
  var date = object.ABSTIMMUNGSTAG.split(".");
  this.date = new Date(date[2]+"-"+date[1]+"-"+date[0]);
  this.shortDescription = object.VORLAGE_KURZBEZ;
  this.description = object.VORLAGE_LANGBEZ;
  this.type = object.VORLAGENART;
  this.voteDescription = object.ABSTIMMUNGSART_BEZ;
  this.yesPercentage = parseFloat(object.JA_ANTEIL_PROZENT);
  this.voteParticipation = parseFloat(object.STIMMBETEILIGUNG);
  var url, linkDescription;
  if(object.URL_VOLKSABSTIMMUNG){
    url = object.URL_VOLKSABSTIMMUNG;
    linkDescription = "Volksabstimmung";
  } else if(object.URL_ZEITUNG){
    url = object.URL_ZEITUNG;
    linkDescription = "Zeitung";
  } else if(object.URL_AMTSBLATT){
    url = object.URL_AMTSBLATT;
    linkDescription = "Amtsblatt";
  } else {
    url = "";
    linkDescription = "";
  }
  this.url = url;
  this.urlDescription = linkDescription;
}
