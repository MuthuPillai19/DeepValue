import { Injectable, Output, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()

export class ParamSelectorService {
    dataSet: DataSet;

    @Output() changeJSON: EventEmitter<DataSet> = new EventEmitter();

    emitJSONChange(jsonDataArg: DataSet): void {
        this.dataSet = jsonDataArg;
        this.changeJSON.emit(this.dataSet);
        console.log("Change emitted: " + this.dataSet);
    }
}

export interface IPoint {
    x : string;
    y : string;
}

export interface IDataSet {
    seriesname : string;
    showregressionline : string;
    data : Array<IPoint>;
}

export class NewPoint implements IPoint{
    x:string;
    y:string;
    constructor(x:string, y:string) {
        this.x = x;
        this.y = y;
    }
}

export class DataSet implements IDataSet {
    seriesname : string;
    showregressionline : string;
    data : Array<IPoint>;

    constructor(seriesname:string, showregressionline:string, data:Array<IPoint>) {
        this.seriesname = seriesname;
        this.showregressionline = showregressionline;
        this.data = data;
    }
}
