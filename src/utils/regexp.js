
/* eslint-disable */
/**
 * @description 常用正则校验
 * @param {idCard} 身份证
 * @param {cname} 中文名
 * @param {email}  
 * @param {mobile} 手机号码
 * @param {tel} 座机
 * @param {phone} 手机或座机
 */


const idcard = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
const cname = /^^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;
const email = /[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?/;
const mobile = /^1\d{10}$/;
const tel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
const phone = /^d{11}$/;

export default {
    cname,
    email,
    mobile,
    tel,
    phone,
    idcard,
};