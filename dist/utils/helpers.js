"use strict";
/*
 * Copyright (c) 2023. qnnp <qnnp@qnnp.me>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getType = void 0;
var getType = function (target) {
    var result = Object().toString.call(target).match(/[A-Z][a-z]+/).toString().toLocaleLowerCase();
    if (result === 'number') {
        return isNaN(target) ? 'NaN' : result;
    }
    return result;
};
exports.getType = getType;
