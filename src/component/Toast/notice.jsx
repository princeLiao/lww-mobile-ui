import * as React from 'react'
import './Toast.scss';
import cx from 'classnames'
import PropTypes from 'prop-types'
import Icon from "component/Icon"

/**
 * 表示一个ui组件。
 * 功能：toast提示
 */

export default class Notice extends React.Component {
    static propTypes = {
        style: PropTypes.object,
        type: PropTypes.oneOf([
            'info', 'success', 'fail', 'loading', 'offline'
        ]),
        content: PropTypes.any,
        //是否显示透明遮罩 
        mask: PropTypes.bool
    }
    static defaultProps = {
        mask: false,
        type: '',
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
        const wrapCLass = cx(className, 'ui-toast', mask ? "mask-show" : "");
        const icons = {
            info: '',
            success: 'success',
            fail: 'fail',
            loading: 'loading',
            offline: 'dislike'
        };
        return (
            <div className={wrapCLass} {...props}>
                <div className={cx("toast-content", icons[type] ? "icon" : "")}>
                    {icons[type] ?
                        <Icon className={cx('toast-icon', icons[type])} type={icons[type]} /> : null}
                    {
                        content && <div className="toast-text">
                            {
                                content
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }

}
