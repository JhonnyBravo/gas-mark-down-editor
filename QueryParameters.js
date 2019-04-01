function QueryParameters() {
  this.baseUrl=ScriptApp.getService().getUrl();
  this.page;
  this.id;
}
QueryParameters.prototype.getBaseUrl=function(){
  return this.baseUrl;
};
QueryParameters.prototype.getPage=function(){
  return this.page;
};
QueryParameters.prototype.setPage=function(page){
  this.page=page;
};
QueryParameters.prototype.getId=function(){
  return this.id;
};
QueryParameters.prototype.setId=function(id){
  this.id=id;
};
