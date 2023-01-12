"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectType = void 0;
var getObjectType = function (target) {
    var result = Object().toString.call(target).match(/[A-Z][a-z]+/).toString().toLocaleLowerCase();
    if (result === 'number') {
        return isNaN(target) ? 'NaN' : result;
    }
    return result;
};
exports.getObjectType = getObjectType;
