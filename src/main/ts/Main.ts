let ADDRESS = "https://docs.google.com/spreadsheets/d/1izkZ1bvWPX3x2MjczdrBenmHRrC2gshfANJW9HGQJFg/edit#gid=0";

function doGet(request) {
    let page = request.parameter.page;
    let id = request.parameter.id;

    let parameters = new QueryParameters();
    parameters.page = page;
    parameters.id = id;

    let userName = Session.getActiveUser().getEmail().split("@");
    let table = new Table(ADDRESS);
    table.page = page;
    table.id = id;
    table.openSheet(userName[0]);

    let response: any;

    switch (page) {
        case "create":
            response = HtmlService.createTemplateFromFile("edit_record");
            response.parameters = parameters;
            return response.evaluate().setTitle("新規登録 | Mark Down Editor");
        case "update":
            response = HtmlService.createTemplateFromFile("edit_record");
            response.parameters = table;
            return response.evaluate().setTitle("更新 | Mark Down Editor");
        case "delete":
            response = HtmlService.createTemplateFromFile("delete_record");
            response.parameters = parameters;
            return response.evaluate().setTitle("削除 | Mark Down Editor");
        case "sample":
            response = HtmlService.createTemplateFromFile("index");
            table.openSheet("sample");
            response.parameters = table;
            return response.evaluate().setTitle("チートシート | Mark Down Editor");
        default:
            response = HtmlService.createTemplateFromFile("index");
            response.parameters = table;
            return response.evaluate().setTitle("Mark Down Editor");
    }
}

function insertRecord(objForm) {
    let userName = Session.getActiveUser().getEmail().split("@");
    let table = new Table(ADDRESS);
    table.openSheet(userName[0]);
    table.insertRecord(objForm);
}

function updateRecord(objForm) {
    let userName = Session.getActiveUser().getEmail().split("@");
    let table = new Table(ADDRESS);
    table.openSheet(userName[0]);
    table.updateRecord(objForm);
}

function deleteRecord(objForm) {
    let userName = Session.getActiveUser().getEmail().split("@");
    let table = new Table(ADDRESS);
    table.openSheet(userName[0]);
    table.deleteRecord(objForm);
}
