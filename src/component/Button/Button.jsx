import * as React from 'react'
import './Button.scss';
import cx from 'classnames'
import PropTypes from 'prop-types'
import {
    unionClass,
    useKeyOnly,
    SUI
} from "../../lib";
/**
 * 表示一个ui。
 * @internal
 */
export default class Button extends React.Component {
    static propTypes = {

        active: PropTypes.bool,
        /** A button can animate to show hidden content */
        animated: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.oneOf(['fade', 'vertical'])
        ]),
        /** 基础的按钮没有背景色 简洁为主*/
        basic: PropTypes.bool,

        /** 用户自定义类名*/
        className: PropTypes.string,

        /** button 颜色*/
        color: PropTypes.string,

        content: PropTypes.any,

        disabled: PropTypes.bool,

        onClick: PropTypes.func,

        role: PropTypes.string,

        // size: PropTypes.oneOf(SUI.SIZES),
    }
    static defaultProps = {
        role: 'button'
    }
    constructor(props) {
        super(props);
    }
    render() {
        const {
            active,
            animated,
            className,
            children,
            disabled,
            color,
            content,
            role,
            ...props
        } = this.props;
        const wrapCLass = cx(unionClass, className,useKeyOnly(disabled,'disabled'),'ui-button');
        return (
            <button disabled={disabled} role={role} className={wrapCLass} {...props} onClick={this.handleClick}>
                {content}
                {children}
            </button>
        );
    }
    handleClick = (e) => {
        const { disabled } = this.props
        if (disabled) {
            e.preventDefault()
            return
        }
        this.props.onClick();
    }
}
