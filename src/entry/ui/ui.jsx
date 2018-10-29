import * as React from 'react'
import DocumentTitle from "react-document-title";
import './ui.scss';

/**
 * 表示一个Toast。
 * @internal
 */
export default class Ui extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <DocumentTitle title="" >
                <div className="x-ui"></div>
            </DocumentTitle>
        );
    }
}
