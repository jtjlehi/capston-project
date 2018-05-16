import { colorLog, color } from "./color";
import { XMLHttpRequest } from "xmlhttprequest";

export default class TestSuit {
    protected _url: string;
    protected _method: string;
    constructor() {
        this._url = '/';
        this._method = 'GET';
    }
    public addCall(callObject: object, expectedResponse: object, description: string): void {
        const xhr = new XMLHttpRequest();
        let res: object;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === xhr.DONE) {
                colorLog(color.FgBlue, description);
                try {
                    const res = JSON.parse(xhr.responseText);
                    if (res) {
                        this._objectExpect(res, expectedResponse);
                    } else {
                        colorLog(color.BgRed, 'Response is falsy');
                    }
                } catch {
                    colorLog(color.BgRed, 'Response not a json object');
                    res = xhr.responseText;
                }
            }
        }
        xhr.open("POST", "http://localhost:3000/create_game");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(callObject));
    }
    private _objectExpect(input: object, expected: object) {
        let comparedObj = this._compareObj(input, expected);
        console.log(comparedObj);
        colorLog(
            comparedObj.bool ? color.BgGreen : color.BgRed,
            `Expected: ${JSON.stringify(input)} = ${JSON.stringify(expected)}`
        );
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