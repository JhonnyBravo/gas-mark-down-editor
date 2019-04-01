function Table(url) {
  this.workbook=SpreadsheetApp.openByUrl(url);
  this.sheet=this.workbook.getActiveSheet();
}
Table.prototype=new QueryParameters();
Table.prototype.openSheet=function(sheetName){
  this.sheet=this.workbook.getSheetByName(sheetName);
  
  if(this.sheet==null){
    this.sheet=this.workbook.insertSheet(sheetName);
    this.sheet.getRange("A1").setValue("id");
    this.sheet.getRange("B1").setValue("title");
    this.sheet.getRange("C1").setValue("content");
  }
};
Table.prototype.findAll=function(){
  var row=this.sheet.getRange("A2").getRow();
  var col=this.sheet.getRange("A2").getColumn();
  
  if(this.sheet.getRange(row, col).getValue()==""){
    var endRow="A2";
  }else{
    while(this.sheet.getRange(row, col).getValue()!=""){
      row++;
    }
    
    var endRow=this.sheet.getRange(row-1, col).getA1Notation();
  }
  
  var endCol="C2";
  var table=this.sheet.getRange(endRow+":"+endCol).getValues();
  return table;
};
Table.prototype.findById=function(id){
  var row=this.sheet.getRange("A2").getRow();
  var col=this.sheet.getRange("A2").getColumn();
  
  while(this.sheet.getRange(row, col).getValue()!=""){
    if(this.sheet.getRange(row, col).getValue()==id){
      break;
    }else{
      row++;
    }
  }
  
  var endRow=this.sheet.getRange(row, col).getA1Notation();
  var endCol=this.sheet.getRange(row, col+2).getA1Notation();
  var table=this.sheet.getRange(endRow+":"+endCol).getValues();
  
  return table;
};
Table.prototype.insertRecord=function(objForm){
  var id;
  var title=objForm.title;
  var contents=objForm.contents;
  
  var row=this.sheet.getRange("A2").getRow();
  var col=this.sheet.getRange("A2").getColumn();
  
  while(this.sheet.getRange(row, col).getValue()!=""){
    row++;
  }
  
  if(this.sheet.getRange(row, col).getA1Notation()=="A2"){
    var id=1;
  }else{
    var id=this.sheet.getRange(row-1, col).getValue()+1;
  }
  
  this.sheet.getRange(row, col).setValue(id);
  this.sheet.getRange(row, col+1).setValue(title);
  this.sheet.getRange(row, col+2).setValue(contents);
};
Table.prototype.updateRecord=function(objForm){
  var id=objForm.id;
  var title=objForm.title;
  var contents=objForm.contents;
  
  var row=this.sheet.getRange("A2").getRow();
  var col=this.sheet.getRange("A2").getColumn();
  
  while(this.sheet.getRange(row, col).getValue()!=""){
    if(this.sheet.getRange(row, col).getValue()==id){
      this.sheet.getRange(row, col).setValue(id);
      this.sheet.getRange(row, col+1).setValue(title);
      this.sheet.getRange(row, col+2).setValue(contents);
      break;
    }else{
      row++;
    }
  }
};
Table.prototype.deleteRecord=function(objForm){
  var id=objForm.id;
  
  var row=this.sheet.getRange("A2").getRow();
  var col=this.sheet.getRange("A2").getColumn();
  
  while(this.sheet.getRange(row, col).getValue()!=""){
    if(this.sheet.getRange(row, col).getValue()==id){
      this.sheet.deleteRow(row);
      break;
    }else{
      row++;
    }
  }
}