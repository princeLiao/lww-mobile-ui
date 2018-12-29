import React from 'react'
import Notice from "./notice"
import PropTypes from 'prop-types'
import './Toast.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
class Notification extends React.Component {
    transitionTime = 300
    timer = null
    constructor(props) {
        super(props);
        this.state = {
            notices: [],
            type: '',
        }
    }
    show = ({ type, content, duration = 1.5, onClose }) => {
        this.setState({
            notices: [content],
            type
        });
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({
                notices: [],
                type: '',
            }, () => {
                typeof onClose === "function" && onClose();
            });
        }, duration * 1000);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        const { notices, type } = this.state;
        return (
            <TransitionGroup className="toast-notification">
                {
                    notices.map((notice, key) => (
                        <CSSTransition
                            key={key}
                            classNames="ui-transition-zoom"
                            timeout={300}
                        >
                            <Notice type={type} content={notice}>

                            </Notice>
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>


        )
    }
}
const createNotification = () => {
    const div = document.createElement('div')
    document.body.appendChild(div);
    const ref = React.createRef();
    ReactDOM.render(<Notification ref={ref} />, div);
    return {
        show(notice) {
            if (ref.current) {
                return ref.current.show(notice);
            } else {
                createNotification().show(notice);
            }
        },
        destroy() {
            if (ref.current) {
                ReactDOM.unmountComponentAtNode(div)
                document.body.removeChild(div)
            } else {
                return false;
            }

        }
    }
}
export default createNotification();