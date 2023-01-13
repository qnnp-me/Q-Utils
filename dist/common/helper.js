/*
 * !
 * Copyright (c) 2023. qnnp <qnnp@qnnp.me>
 *
 */

"use strict";
/*
 * Copyright (c) 2023. qnnp <qnnp@qnnp.me>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectType = void 0;
/// <reference path="../types/getType.ts" />
var getObjectType = function (target) {
    var result = Object().toString.call(target).match(/[A-Z][a-z]+/).toString().toLocaleLowerCase();
    if (result === 'number') {
        return isNaN(target) ? 'NaN' : result;
    }
    return result;
};
exports.getObjectType = getObjectType;
