/*
 * !
 * Copyright (c) 2023. qnnp <qnnp@qnnp.me>
 *
 */

/// <reference path="../types/getType.ts" />
export const getObjectType = (target: any): getTypeResult => {
  let result: getTypeResult = Object().toString.call(target).match(/[A-Z][a-z]+/).toString().toLocaleLowerCase()
  if (result === 'number') {
    return isNaN(target) ? 'NaN' : result
  }
  return result
}
