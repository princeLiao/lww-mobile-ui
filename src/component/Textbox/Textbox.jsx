import * as React from 'react'
import './Textbox.scss';
import cx from 'classnames'
import PropTypes from 'prop-types'
/**
 * 表示一个ui组件。
 * 功能：
 */
class TextBox extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        refForm: PropTypes.object,
        required: PropTypes.bool,
        extra: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
        ]),
        type: PropTypes.string,
        patternType: PropTypes.oneOf(["int", "money", "name", "mobile", "idCard"]),
        disabled: PropTypes.bool,
        defaultValue: PropTypes.any,
        needlabel: PropTypes.bool,  //是否需要存label值 一般用于picker 向服务端传label而不是value
        regexp: PropTypes.object,//校验规则
        maxLength: PropTypes.number,
        minLength: PropTypes.number,

    }
    static defaultProps = {
        disabled: false,
        required: true,
        type: 'text',
        needlabel: false,
    }
    preValue = ""
    render() {
        const { name, label, refForm, placeholder, extra, type, picker, defaultValue, disabled, required, patternType, needlabel, regexp, minLength, maxLength } = this.props;
        const cType = ["int", "money", "mobile", "idCard"].indexOf(patternType) != -1;
        return (
            <div className="ui-textbox" onClick={this.handleClick}>
                <label className="label" htmlFor="">{label}</label>
                <input type={cType ? "tel" : type} required={required} disabled={disabled} defaultValue={defaultValue} onChange={this.hanleChange} name={name} maxLength={maxLength} minLength={maxLength}
                    ref={ref => {
                        ref.reactProps = this.props;
                        this.inputRef = ref;
                        if (name) {
                            return refForm ? refForm[name] = ref : null
                        } else {
                            return null
                        }
                    }} placeholder={placeholder ? placeholder + label : ""} />
                {
                    extra ? <span className="extra">
                        {
                            extra == "arrow" ? <i className="arrow"></i> : extra
                        }
                    </span> : null
                }
            </div>
        );
    }
    handleClick = () => {
        this.props.onClick && this.props.onClick();
    }
    hanleChange = (e) => {
        if (!this.props.patternType) {
            return false;
        }
        const val = e.target.value;
        if (!val) {
            this.preValue = "";
            return false;
        }
        switch (this.props.patternType) {
            case "int":
                e.target.value = val.replace(/\D/g, "");
                break;
            case "money":
                //默认最多输入两位小数
                if (!/^\d+(\.\d{0,2})?$/.test(val)) {
                    e.target.value = this.preValue;
                }
                break;
            case "name":
                if (! /^([\\u4e00-\\u9fa5]{1,10})$/.test(val)) {
                    e.target.value = this.preValue;
                }
                break;
            case "mobile":
                var newVal = val;
                newVal = newVal.replace(/\D/g, "");
                newVal.length > 11 ? newVal = newVal.slice(0, 11) : null;
                if (newVal.length > 3 && newVal.length <= 7) {
                    newVal = newVal.replace(/^(\d{3})/, "$1 ")
                } else if (newVal.length > 7) {
                    newVal = newVal.replace(/^(\d{3})(\d{4})/, "$1 $2 ")
                }
                var start = this.inputRef.selectionStart; //光标位置
                e.target.value = newVal;
                if (Math.abs(start - newVal.length) == 1) {
                    this.inputRef.setSelectionRange(newVal.length, newVal.length);
                } else if (start == 4 || start == 8) {
                    this.preValue.length > newVal.length ? start-- : start++;
                    this.inputRef.setSelectionRange(start, start);
                }
                else {
                    this.inputRef.setSelectionRange(start, start);//设置光标位置 不设的话光标在input赋值后默认在最后一位
                }
                this.preValue = newVal; //存储input值
                break;
            default:
                break;
        }
        this.preValue = e.target.value;

    }
}

export default TextBox;
