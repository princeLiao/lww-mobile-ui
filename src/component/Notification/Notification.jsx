import * as React from 'react'
import './Notification.scss';
import cx from 'classnames'
import PropTypes from 'prop-types'
import {
    unionClass,
    useKeyOnly,
    SUI
} from "../../lib";
/**
 * 表示一个ui组件。
 * 功能：弹出层弹窗或toast
 */
export default class Notification extends React.Component {
    static propTypes = {
        style:PropTypes.object,
    }
    static defaultProps = {
    }
    constructor(props) {
        super(props);
    }
    setStyle=(style)=>{
        return {...style}
    }
    render() {
        const {
            className,
            style,
            ...props
        } = this.props;
        const wrapCLass = cx(unionClass, className);
        
        return (
                <div style={this.setStyle(tyle)} className={wrapCLass} {...props}>
                </div>
        );
    }
}
