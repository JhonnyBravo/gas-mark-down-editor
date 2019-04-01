var URL="https://docs.google.com/spreadsheets/d/1izkZ1bvWPX3x2MjczdrBenmHRrC2gshfANJW9HGQJFg/edit#gid=0";

function doGet(request) {
  var page=request.parameter.page;
  var id=request.parameter.id;
  
  var parameters=new QueryParameters();
  parameters.setPage(page);
  parameters.setId(id);
  
  var userName=Session.getActiveUser().getEmail().split("@");
  var table=new Table(URL);
  table.setPage(page);
  table.setId(id);
  table.openSheet(userName[0]);
  
  switch(page){
    case "create":
      var response=HtmlService.createTemplateFromFile("edit_record");
      response.parameters=parameters;
      return response.evaluate().setTitle("新規登録 | Mark Down Editor");
    case "update":
      var response=HtmlService.createTemplateFromFile("edit_record");
      response.parameters=table;
      return response.evaluate().setTitle("更新 | Mark Down Editor");
    case "delete":
      var response=HtmlService.createTemplateFromFile("delete_record");
      response.parameters=parameters;
      return response.evaluate().setTitle("削除 | Mark Down Editor");
    case "sample":
      var response=HtmlService.createTemplateFromFile("index");
      table.openSheet("sample");
      response.parameters=table;
      return response.evaluate().setTitle("チートシート | Mark Down Editor");
    default:
      var response=HtmlService.createTemplateFromFile("index");
      response.parameters=table;
      return response.evaluate().setTitle("Mark Down Editor");
  }
}

function insertRecord(objForm){
  var userName=Session.getActiveUser().getEmail().split("@");
  var table=new Table(URL);
  table.openSheet(userName[0]);
  table.insertRecord(objForm);
}

function updateRecord(objForm){
  var userName=Session.getActiveUser().getEmail().split("@");
  var table=new Table(URL);
  table.openSheet(userName[0]);
  table.updateRecord(objForm);
}

function deleteRecord(objForm){
  var userName=Session.getActiveUser().getEmail().split("@");
  var table=new Table(URL);
  table.openSheet(userName[0]);
  table.deleteRecord(objForm);
}
