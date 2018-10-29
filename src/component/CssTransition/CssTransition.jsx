import * as React from 'react'
import './CssTransition.scss';
import cx from 'classnames'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
/**
 * 表示一个ui组件。
 * 功能：
 */
export default class CssTransition extends React.Component {
    static propTypes = {
        style: PropTypes.object,
    }
    static defaultProps = {
    }
    constructor(props) {
        super(props);
    }
    setStyle = (style) => {
        return { ...style }
    }
    render() {
        const {
            className,
            style,
            ...props
        } = this.props;

        return (
            <ReactCSSTransitionGroup
                transitionName="ui-transition"
             
                transitionEnterTimeout={5000}
                sitionLeaveTimeout={3000}
            >
                {
                    React.Children.map(this.props.children, (child, key) => {return <div key={key}>{child}</div>}
                    )}
            </ReactCSSTransitionGroup >
        );
    }
}
