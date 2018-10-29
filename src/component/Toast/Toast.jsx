import * as React from 'react'
import './Toast.scss';
import cx from 'classnames'
import PropTypes from 'prop-types'
import Notice from "./notice"
import {
    unionClass,
    useKeyOnly,
    SUI
} from "../../lib";
/**
 * 表示一个ui组件。
 * 功能：toast提示
 */

export default class Toast extends React.Component {
    static propTypes = {
        style:PropTypes.object,
    }
    static defaultProps = {
    }


    constructor(props) {
        super(props);
    }
    static show(){
        const div=document.createElement("div");

        document.body.appendChild(div);
    }
    static hide(){

    }
    static info(
        content,
    ){

    }
    render() {
        const {
            className,
            style,
            ...props
        } = this.props;
        const wrapCLass = cx(unionClass, className,'ui-toast');
        
        return (
                <div  className={wrapCLass} {...props}>
                    <Notice type="info" content="wrwtewtewte" />
                </div>
        );
    }

}
