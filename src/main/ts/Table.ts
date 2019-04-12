class Table extends QueryParameters {
    private _url: string;
    private _workbook: GoogleAppsScript.Spreadsheet.Spreadsheet;
    private _sheet: GoogleAppsScript.Spreadsheet.Sheet;

    constructor(url: string) {
        super();
        this._url = url;
        this._workbook = SpreadsheetApp.openByUrl(this._url);
    }

    public openSheet(sheetName: string): void {
        this._sheet = this._workbook.getSheetByName(sheetName);

        if (this._sheet == null) {
            // 指定したシートが存在しない場合は新規作成する。
            this._sheet = this._workbook.insertSheet(sheetName);
            this._sheet.getRange("A1").setValue("id");
            this._sheet.getRange("B1").setValue("title");
            this._sheet.getRange("C1").setValue("content");
        }
    }

    public findAll(): {} {
        let row = this._sheet.getRange("A2").getRow();
        const col = this._sheet.getRange("A2").getColumn();
        let endRow: string;

        // 値が入力されていない行を検索する。
        if (this._sheet.getRange(row, col).getValue() == "") {
            endRow = "A2";
        } else {
            while (this._sheet.getRange(row, col).getValue() != "") {
                row++;
            }

            endRow = this._sheet.getRange(row - 1, col).getA1Notation();
        }

        const endCol = "C2";
        const table = this._sheet.getRange(endRow + ":" + endCol).getValues();
        return table;
    }

    public findById(id: number): {} {
        let row = this._sheet.getRange("A2").getRow();
        const col = this._sheet.getRange("A2").getColumn();

        while (this._sheet.getRange(row, col).getValue() != "") {
            if (parseInt(this._sheet.getRange(row, col).getValue().toString()) == id) {
                break;
            } else {
                row++;
            }
        }

        const endRow = this._sheet.getRange(row, col).getA1Notation();
        const endCol = this._sheet.getRange(row, col + 2).getA1Notation();
        const table = this._sheet.getRange(endRow + ":" + endCol).getValues();
        return table;
    }

    public insertRecord(title: string, contents: string): void {
        let row = this._sheet.getRange("A2").getRow();
        const col = this._sheet.getRange("A2").getColumn();

        while (this._sheet.getRange(row, col).getValue() != "") {
            row++;
        }

        let id: number;

        if (this._sheet.getRange(row, col).getA1Notation() == "A2") {
            id = 1;
        } else {
            id = parseInt(this._sheet.getRange(row - 1, col).getValue().toString()) + 1;
        }

        this._sheet.getRange(row, col).setValue(id);
        this._sheet.getRange(row, col + 1).setValue(title);
        this._sheet.getRange(row, col + 2).setValue(contents);
    }

    public updateRecord(id: number, title: string, contents: string) {
        let row = this._sheet.getRange("A2").getRow();
        const col = this._sheet.getRange("A2").getColumn();

        while (this._sheet.getRange(row, col).getValue() != "") {
            if (this._sheet.getRange(row, col).getValue() == id) {
                this._sheet.getRange(row, col).setValue(id);
                this._sheet.getRange(row, col + 1).setValue(title);
                this._sheet.getRange(row, col + 2).setValue(contents);
                break;
            } else {
                row++;
            }
        }
    }

    public deleteRecord(id: number) {
        let row = this._sheet.getRange("A2").getRow();
        const col = this._sheet.getRange("A2").getColumn();

        while (this._sheet.getRange(row, col).getValue() != "") {
            if (this._sheet.getRange(row, col).getValue() == id) {
                this._sheet.deleteRow(row);
                break;
            } else {
                row++;
            }
        }
    }
}
