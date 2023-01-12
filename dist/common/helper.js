"use strict";
/// <reference path="../types/getType.ts" />
var getObjectType = function (target) {
    var result = Object().toString.call(target).match(/[A-Z][a-z]+/).toString().toLocaleLowerCase();
    if (result === 'number') {
        return isNaN(target) ? 'NaN' : result;
    }
    return result;
};
