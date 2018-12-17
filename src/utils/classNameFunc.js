/**
 * 当属性为true时  属性名作为className
 * @param {*} val A props value
 * @param {string} key A props key
 *
 * @example
 * <Label tag />
 * <div class="ui tag label"></div>
 */
export const useKeyOnly = (val, key) => val && key; 
