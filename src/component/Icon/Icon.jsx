import * as React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import iconSvg from './iconSvg'
/**
 * 表示一个ui组件。
 * 功能：
 */
export default class Icon extends React.Component {
    static propTypes = {
        type: PropTypes.string,
    }
    static defaultProps = {
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const icons = iconSvg();
        console.log(icons);
    }
    render() {
        const {
            className,
            type,
            ...props
        } = this.props;
        const wrapCLass = cx(className, 'am-icon', `am-icon-${type}`, );

        return (
            <svg className={wrapCLass} {...props}>
                <use xlinkHref={`#${type}`} />
            </svg>
        );
    }
}
