/*
  Google Script to grab social sharing data for a list of article URLS from the SharePoint API and display it in a Google Sheet
  Troy Daniels
  15/04/16
*/

function main(){
  getURLs(); 
}


function getURLs() {
  //Google Sheet ID
  var id = "";
  var sheetName = "Sheet1";
  var rangeName = "Articles";
  
  //Open doc by doc id
  var sheet =  SpreadsheetApp.openById(id).getSheetByName(sheetName);

  //Note cols
  var articles = sheet.getRange("A1:A"); 
  var fbShares = sheet.getRange("B1:B");
  var gpShares = sheet.getRange("C1:C");
  var twShares = sheet.getRange("D1:D");
  var suShares = sheet.getRange("E1:E");
  var piShares = sheet.getRange("F1:F");
  var liShares = sheet.getRange("G1:G");

  //TODO: remove this magic number
  var tmpLim = 6;
  
  for(var n = 2; n <= tmpLim; n++){
      var articleURL = articles.getCell(n,1).getValue();
      var shares = getShares(articleURL);

      fbShares.getCell(n, 1).setValue(shares.Facebook.share_count);
      gpShares.getCell(n, 1).setValue(shares.GooglePlusOne);
      twShares.getCell(n, 1).setValue(shares.Twitter);
      suShares.getCell(n, 1).setValue(shares.StumbleUpon);
      piShares.getCell(n, 1).setValue(shares.Pinterest);
      liShares.getCell(n, 1).setValue(shares.LinkedIn);
  }    
}

function getShares(theURL)
{
  //Awesome people we're pulling data from
  var domain = "http://free.sharedcount.com?";
  //Troy's API key
  var apikey = "";
 
  //TODO: make the following look nicer
  var completeRequest = domain.concat("url=").concat(theURL).concat("&apikey=").concat(apikey).concat("&cache=true");

  var response = UrlFetchApp.fetch(completeRequest);
  var json = response.getContentText();

  return JSON.parse(json);
}
