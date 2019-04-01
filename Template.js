function includeHtml(fileName) {
  var response=HtmlService.createHtmlOutputFromFile(fileName);
  return response.getContent();
}

function includeTemplate(fileName, parameters){
  var response=HtmlService.createTemplateFromFile(fileName);
  
  if(parameters !== undefined){
    response.parameters=parameters;
  }
  
  return response.evaluate().getContent();
}
