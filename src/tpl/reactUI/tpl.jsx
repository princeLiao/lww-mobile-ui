import * as React from 'react'
import './__name__.scss';
import cx from 'classnames'
import PropTypes from 'prop-types'
import {
    unionClass,
    useKeyOnly,
    SUI
} from "../../lib";
/**
 * 表示一个__displayName__组件。
 * 功能：
 */
export default class __namePascal__ extends React.Component {
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
