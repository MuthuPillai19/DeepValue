import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import * as XLSX from "xlsx";
import '../../../node_modules/jquery-ui/ui/widgets/slider';
import { ParamSelectorService, DataSet, NewPoint } from './paramselector.service';
import { forEach } from '@angular/router/src/utils/collection';

export interface FileReaderEventTarget extends EventTarget {
    result: any;
}

export interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

export interface ParamsData {
    fromDateTime : number;
    toDateTime : number;
    companyName : string;
}

@Component({
    selector: 'app-paramselector',
    templateUrl: './paramselector.component.html',
    styleUrls: ['./paramselector.component.css']
})

export class ParamselectorComponent implements OnInit {
    private globalJsonData: Array<JSON>;
    private globalColumn: Array<string> = [];
    private companyNameOptions: Array<string> = [];
    private dataSet : DataSet;
    constructor(private paramSelectorService: ParamSelectorService) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        console.log("Comes here.");
        $(function () {
            //$("#paramselector_slider").slider();
        });
    }

    importDataFromFile():string {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
        /*Checks whether the file is a valid excel file*/
        if (regex.test($("#excelFile").val().toLowerCase())) {
            var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/
            if ($("#excelFile").val().toLowerCase().indexOf(".xlsx") > 0) {
                xlsxflag = true;
            }
            /*Checks whether the browser supports HTML5*/
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = (e: FileReaderEvent) => {
                    var data = e.target.result;
                    /*Converts the excel data in to object*/
                    data = new Uint8Array(data);
                    var arr = new Array();
                    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                    var bstr = arr.join("");
                    var workbook = XLSX.read(bstr, { type: 'binary', cellDates: true, cellStyles: true });

                    /*Gets all the sheetnames of excel in to a variable*/
                    var sheet_name_list = workbook.SheetNames;

                    var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/
                    sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/
                        /*Convert the cell value to Json*/
                        if (xlsxflag) {
                            var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                        }
                        else {
                            var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                        }
                        if (exceljson.length > 0 && cnt == 0) {
                            this.bindTable(exceljson);
                            cnt++;
                        }
                        $('#infoDiv').text("Finished loading file...");
                    }.bind(this));
                    $('#paramSelector_Calculate').prop('disabled', false);
                }
                if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/
                    reader.readAsArrayBuffer($("#excelFile")[0].files[0]);
                }
                else {
                    reader.readAsBinaryString($("#excelFile")[0].files[0]);
                }
            }
            else {
                alert("Sorry! Your browser does not support HTML5!");
            }
        }
        else {
            alert("Please upload a valid Excel file!");
        }
        $('#infoDiv').text("Importing data from file...");
        return "Completed loading file.";
    }

    bindTable(jsondata) {/*Function used to convert the JSON array to Html Table*/
        var columns = this.bindTableHeader(jsondata); /*Gets all the column headings of Excel*/
        if (jsondata) {
            for (var i = 0; i < jsondata.length; i++) {
                //var row$ = $('<tr/>');
                for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                    var cellValue: string = (jsondata[i][columns[colIndex]]).toString();
                    if (cellValue == null)
                        cellValue = "";
                    //row$.append($('<td/>').html(cellValue));
                    if (columns[colIndex] == "sym") {
                        if (this.companyNameOptions.indexOf(cellValue) < 0 && cellValue != "") {
                            this.companyNameOptions.push(cellValue);
                            console.log("Col index is : " + colIndex + " : " + cellValue);
                        }
                    }
                }
            }
            this.globalJsonData = jsondata;
            this.globalColumn = columns;
        }
        console.log("Bind table is called.");
    }

    bindTableHeader(jsondata):Array<string> {/*Function used to get all column names from JSON and bind the html table header*/
        var columnSet:Array<string> = [];
        //var headerTr$ = $('<tr/>');
        if (jsondata) {                
            for (var i = 0; i < jsondata.length; i++) {
                var rowHash = jsondata[i];
                for (var key in rowHash) {
                    if (rowHash.hasOwnProperty(key)) {
                        if ($.inArray(key, columnSet) == -1) {/*Adding each unique column names to a variable array*/
                            columnSet.push(key);
                            //headerTr$.append($('<th/>').html(key));
                        }
                    }
                }
            }
            return columnSet;
        }

    }

    calculateCompanyValue() {
        var paramData:ParamsData = this.fetchAllParams();
        if(this.globalJsonData){
            var elementTime:number;
            var totalSize:number=0;
            var totalPrice:number=0;
            for (var i = 0; i < this.globalJsonData.length; i++) { 
                for (var colIndex = 0; colIndex < this.globalColumn.length; colIndex++) {  
                    var cellValue = this.globalJsonData[i][this.globalColumn[colIndex]]; 
                   
                    if(this.globalColumn[colIndex] == "sym" && paramData.companyName == cellValue){
                       elementTime = Date.parse(this.getTodaysDate() + " " + this.globalJsonData[i]["time"]);
                       //console.log("elementTime : " + elementTime);
                       if(elementTime >= paramData.fromDateTime &&  elementTime <= paramData.toDateTime )  {                   
                            totalSize += parseFloat(this.globalJsonData[i]["size"]);
                            totalPrice += parseFloat(this.globalJsonData[i]["price"]);
                       }
                    }                               
                }    
            }
        }
        console.log("Total value is : " + totalSize);
        console.log("Total price is : " + totalPrice);
        this.dataSet = new DataSet(paramData.companyName, "1", [ new NewPoint("0",totalSize.toString()),
                                                                new NewPoint(totalPrice.toString(), totalSize.toString())
        ]);
        this.paramSelectorService.emitJSONChange(this.dataSet);
    }

    fetchAllParams():ParamsData{
        var todaysDate:string = '' + this.getTodaysDate();
        var paramData:ParamsData = {
            fromDateTime : Date.parse(todaysDate + " " + $('#timeFrom').val()),
            toDateTime : Date.parse(todaysDate + " " + $('#timeTo').val()),
            companyName : $('#companyName option:selected').val()
        };
        
        console.log(paramData.fromDateTime + " ::::: " + paramData.toDateTime);
        console.log("Company name is : " + paramData.companyName);
        return paramData;
    }

    getTodaysDate():string {
        var todaysDate = new Date(),
            year = todaysDate.getFullYear(),
            month = (todaysDate.getMonth() + 1),
            day = todaysDate.getDate();

        return [month, day , year].join('/');
    }

}
