import * as React from 'react'
import './Form.scss';
import cx from 'classnames'
import PropTypes from 'prop-types'
import Toast from "component/Toast"
import { Reg } from "utils"
/**
 * 表示一个ui组件。
 * 功能：
 */
export default class Form extends React.Component {
    static propTypes = {
        style: PropTypes.object,
        noValidate: PropTypes.bool,
        

    }
    static defaultProps = {
        noValidate: true,
    }
    constructor(props) {
        super(props);
    }
    render() {
        const {
            className,
            noValidate,
            ...props
        } = this.props;
        const wrapCLass = cx(className, "ui-form");

        return (
            <form  onSubmit={this.handleSubmit} ref={ref => this.formRef = ref} noValidate={noValidate} className={wrapCLass}>
                {
                    this.props.children
                }
            </form>
        );
    }
    validFun = (nodeList) => {
        return new Promise((resolve, reject) => {
            const refFormData = {};
            const flag = Object.keys(nodeList).every(itemKey => {
                const itemNode = nodeList[itemKey];
                const key = itemNode.name;
                if (itemNode.required && !itemNode.value) {
                    Toast.info(itemNode.placeholder);
                    return false;
                }
                else if (!itemNode.required && !itemNode.value) {
                    return true;
                }
                else if (!key) {
                    return true;
                }
                else {
                    refFormData[key] = itemNode.reactProps.needlabel ? itemNode.label : itemNode.value;
                    itemNode.reactProps.patternType == "mobile" ? refFormData[key] = refFormData[key].replace(/\s/g, "") : null;
                    if (itemNode.reactProps.regexp && !itemNode.reactProps.regexp.test(refFormData[key])) {
                        Toast.info("请输入正确格式的" + itemNode.reactProps.label);
                        return false;
                    }
                    return true;
                }
            })
            if (flag) {
                return resolve(refFormData);
            }
            return reject();
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const inputNodes = this.formRef.querySelectorAll("input[name]");
        const formData = await this.validFun(inputNodes);
        this.props.onSubmit && this.props.onSubmit(formData);
    }
}
