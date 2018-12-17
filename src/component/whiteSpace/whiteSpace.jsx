import * as React from 'react'
import './whiteSpace.scss';
import cx from 'classnames'
import PropTypes from 'prop-types'
import {
    unionClass,
    useKeyOnly,
    SUI,
} from "utils";
/**
 * 表示一个ui组件。
 * 功能：设置上下留白间距
 */
export default class WhiteSpace extends React.Component {
    static propTypes = {
        size: PropTypes.oneOf(SUI.SIZES),
        /**自定义高度*/
        height:PropTypes.number, 
        /** 用户自定义类名*/
        className: PropTypes.string,
        style:PropTypes.object,
    }
    static defaultProps = {
        size: 'medium'
    }
    constructor(props) {
        super(props);
    }
    setStyle=(height,style)=>{
        return {height:height+'px',...style}
    }
    render() {
        const {className,height,style,size,...props}=this.props;
        const wrapCLass = cx(unionClass, className, 'ui-white-space',`ui-white-space-${size}`);
        return (
            <div style={this.setStyle(height,style)}  className={wrapCLass} {...props}></div>
        );
    }
}
