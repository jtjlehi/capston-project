import { colorLog, color } from "./color";

export default class TestSuit {
    protected _url: string;
    protected _method: string;
    constructor() {
        this._url = '/';
        this._method = 'GET';
    }
    public addCall(callObject: object, expectedResponse: object): void {
        const xhr = new XMLHttpRequest();
        let res: object;
        xhr.onreadystatechange = () => {
            if (xhr.status === xhr.DONE) {
                res = xhr.response;
                this._objectExpect(res, expectedResponse);
            }
        }
        xhr.open(this._method, this._url);
    }
    private _objectExpect(input: object, expected: object) {
        let comparedObj = this._compareObj(input, expected);
        colorLog(comparedObj.bool ? color.BgGreen : color.BgRed, `Expected: ${input} = ${expected}`);
        comparedObj.same.forEach(key => {
            colorLog(color.BgGreen, key);
        });
        comparedObj.diff.forEach(key => {
            colorLog(color.BgRed, key);
        })
    }
    private _compareObj(x: object, y: object): {bool: boolean, same: string[], diff: string[]} {
        let sameObj: {bool: boolean, same: string[], diff: string[]} = {
            bool: true,
            same: [],
            diff: []
        }
        for (let key in x) {
            let xValue: any = x[key];
            let yValue: any = y[key];
            if (xValue instanceof Object && yValue instanceof Object) {
                let nestedSameObj = this._compareObj(xValue, yValue);
                let same = nestedSameObj.same.map(nestedKey => key + '.' + nestedKey);
                let diff = nestedSameObj.diff.map(nestedKey => key + '.' + nestedKey);
                sameObj.same = sameObj.same.concat(same);
                sameObj.diff = sameObj.diff.concat(diff);
                sameObj.bool = sameObj.bool === false ? false : nestedSameObj.bool;
            } else if (xValue === yValue) {
                sameObj.same.push(key);
            } else {
                sameObj.diff.push(key);
                sameObj.bool = false;
            }
        };
        return sameObj;
    }
}