import React from 'react'
import DocumentTitle from "react-document-title";
import './home.scss';
import Button from "component/Button";
import WhiteSpace from "component/whiteSpace";
import Toast from "component/Toast"
import CssTransition from "component/CssTransition"


/**
 * 表示一个home。
 * @internal
 */
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            items:['one','two','three']
        }
    }
    addItem=()=>{
        var newItems = this.state.items.concat('four');
        this.setState({
            items:newItems
        });
    }
    removeItem=(i)=>{
        var newItems = this.state.items;
        newItems.splice(i,1);
        this.setState({
            items:newItems
        });
    }
    render() {
        var List = this.state.items.map((value,index)=>{
            return <div key={value} onClick = {this.removeItem.bind(this,index)}> { value}</div>
        });

        return (
            <DocumentTitle title="" >
                <div className="x-home">
                    <div>
                        <button onClick={this.addItem}>add Item</button>
                       <CssTransition >
                            
                        </CssTransition>
                    </div>


                </div>
            </DocumentTitle>
        );
    }
}


