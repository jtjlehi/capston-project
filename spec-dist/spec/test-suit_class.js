"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("./color");
const xmlhttprequest_1 = require("xmlhttprequest");
class TestSuit {
    constructor() {
        this._url = '/';
        this._method = 'GET';
    }
    addCall(callObject, expectedResponse, description) {
        const xhr = new xmlhttprequest_1.XMLHttpRequest();
        let res;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === xhr.DONE) {
                color_1.colorLog(color_1.color.BgBlue, description);
                color_1.colorLog(color_1.color.FgCyan, 'call object: ' + JSON.stringify(callObject));
                try {
                    const res = JSON.parse(xhr.responseText);
                    if (res) {
                        this._objectExpect(expectedResponse, { status: xhr.status, body: res });
                    }
                    else {
                        color_1.colorLog(color_1.color.BgRed, 'Response is falsy');
                    }
                }
                catch (_a) {
                    color_1.colorLog(color_1.color.BgRed, 'Response not a json object');
                    res = xhr.responseText;
                }
            }
        };
        xhr.open("POST", "http://localhost:3000/create_game");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(callObject));
    }
    _objectExpect(input, expected) {
        let comparedObj = this._compareObj(input, expected);
        color_1.colorLog(comparedObj.bool ? color_1.color.BgGreen : color_1.color.BgRed, `Expected: ${JSON.stringify(expected)} = ${JSON.stringify(input)}`);
        comparedObj.same.forEach(key => {
            color_1.colorLog(color_1.color.FgGreen, key);
        });
        comparedObj.diff.forEach(key => {
            color_1.colorLog(color_1.color.FgRed, key);
        });
    }
    _compareObj(x, y) {
        let sameObj = {
            bool: true,
            same: [],
            diff: []
        };
        for (let key in x) {
            let xValue = x[key];
            let yValue = y[key];
            if (xValue instanceof Object && yValue instanceof Object) {
                let nestedSameObj = this._compareObj(xValue, yValue);
                let same = nestedSameObj.same.map(nestedKey => key + '.' + nestedKey);
                let diff = nestedSameObj.diff.map(nestedKey => key + '.' + nestedKey);
                sameObj.same = sameObj.same.concat(same);
                sameObj.diff = sameObj.diff.concat(diff);
                sameObj.bool = sameObj.bool === false ? false : nestedSameObj.bool;
            }
            else if (xValue === yValue) {
                sameObj.same.push(key);
            }
            else {
                sameObj.diff.push(key);
                sameObj.bool = false;
            }
        }
        ;
        return sameObj;
    }
}
exports.default = TestSuit;
//# sourceMappingURL=test-suit_class.js.map