import { colorLog, color } from "./color";
import { XMLHttpRequest } from "xmlhttprequest";
import { resolve } from "dns";

export default abstract class TestSuit {
    protected static _url: string;
    protected static _method: string;
    protected static passArray: boolean[] = [];
    protected static _name: string;
    protected static _addCall(
        callObject: object,
        expectedResponse: object,
        description: string
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            let res: object;
            xhr.onreadystatechange = async () => {
                if (xhr.readyState === xhr.DONE) {
                    colorLog(color.FgWhite, '-------------------------------------------------');
                    colorLog(color.FgCyan, description);
                    colorLog(color.FgCyan, '                call object:' + JSON.stringify(callObject));
                    try {
                        const res = JSON.parse(xhr.responseText);
                        if (res) {
                            let testPassed = this._objectExpect(
                                expectedResponse, 
                                {status: xhr.status, body: res}
                            );
                            resolve(testPassed);
                        } else {
                            colorLog(color.BgRed, 'Response is falsy');
                            resolve(false);
                        }
                    } catch {
                        colorLog(color.BgRed, 'Response not a json object');
                        resolve(false);
                    }
                }
            }
            xhr.open(this._method, "http://localhost:3000" + this._url, true, 'user', 'password');
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(callObject));
        });
    }
    private static _objectExpect(input: object, expected: object): boolean {
        let comparedObj = this._compareObj(input, expected);
        colorLog(
            comparedObj.bool ? color.BgGreen : color.BgRed,
            comparedObj.bool ? 'Pass' : 'Fail'
        );
        if (comparedObj.bool === false) {
            colorLog(color.BgRed, `Expected: ${JSON.stringify(expected)} = ${JSON.stringify(input)}`);
            comparedObj.same.forEach(key => {
                colorLog(color.FgGreen, key);
            });
            comparedObj.diff.forEach(key => {
                colorLog(color.FgRed, key);
            });
        }
        return comparedObj.bool;
    }
    private static _compareObj(x: object, y: object): {bool: boolean, same: string[], diff: string[]} {
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
    protected static _logResults() {
        colorLog(color.FgWhite, '-------------------------------------------------');
        colorLog(color.BgCyan, `Results for the ${this._name} test suit`);
        this.passArray.forEach(result => {
            colorLog(
                result ? color.FgGreen : color.FgRed,
                result ? 'Pass' : 'Fail'
            );
        });
    }
    public static run: () => void;
}