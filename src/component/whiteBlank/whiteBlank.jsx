import * as React from 'react'
import './whiteBlank.scss';

/**
 * 表示一个ui。
 * @internal
 */
export default class WhiteBlank extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
                <div className="x-whiteblank"></div>
        );
    }
}
