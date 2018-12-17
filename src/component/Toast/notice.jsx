import * as React from 'react'
import './Toast.scss';
import cx from 'classnames'
import PropTypes from 'prop-types'
import {
    unionClass,
    useKeyOnly,
    SUI
} from "utils";
/**
 * 表示一个ui组件。
 * 功能：toast提示
 */

export default class Notice extends React.Component {
    static propTypes = {
        style: PropTypes.object,
        type: PropTypes.oneOf([
            'info', 'success', 'error', 'loading', 'network'
        ]),
        content: PropTypes.any,
        //是否显示透明遮罩 
        mask: PropTypes.bool
    }
    static defaultProps = {
        mask: true,
        type:'info',
    }
    constructor(props) {
        super(props);
    }
    render() {
        const {
            className,
            style,
            content,
            type,
            mask,
            ...props
        } = this.props;
        const wrapCLass = cx(unionClass, className, 'ui-toast', mask ? "toast-mask" : "toask-nomask");
        const icons = {
            info: 'icon-info',
            success: 'icon-success',
            error: 'icon-error',
            loading: 'icon-loading',
            network: 'icon-network'
        };
        return (
            <div className={wrapCLass} {...props}>
                <div className="toast-content">
                    {
                        type == "info" ? null : <i className={cx("toast-icon", icons[type])}></i>
                    }
                    <div className={`toast-text ${type}`}>
                        {
                            content
                        }
                    </div>
                </div>
            </div>
        );
    }

}
