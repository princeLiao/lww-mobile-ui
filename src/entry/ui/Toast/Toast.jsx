import * as React from 'react'
import DocumentTitle from "react-document-title";
import './Toast.scss';

/**
 * 表示一个Toast。
 * @internal
 */
export default class Toast extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <DocumentTitle title="" >
                <div className="x-toast"></div>
            </DocumentTitle>
        );
    }
}
