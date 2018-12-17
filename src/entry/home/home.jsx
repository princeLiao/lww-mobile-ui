import React from 'react'
import DocumentTitle from "react-document-title";
import './home.scss';
import Button from "component/Button";
import WhiteSpace from "component/whiteSpace";
import Toast from "component/Toast"
import TextBox from "component/TextBox"
import {Reg} from "utils"
/**
 * 表示一个home。
 * @internal
 */
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ['one', 'two', 'three']
        }
    }
    refForm = {}
    addItem = () => {
        var newItems = this.state.items.concat('four');
        this.setState({
            items: newItems
        });
    }
    removeItem = (i) => {
        var newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({
            items: newItems
        });
    }
    render() {
        var List = this.state.items.map((value, index) => {
            return <div key={value} onClick={this.removeItem.bind(this, index)}> {value}</div>
        });

        return (
            <DocumentTitle title="" >
                <div className="x-home">
                    <div>
                        <button onClick={this.addItem}>add Item</button>
                    </div>
                    <div style={{
                        padding: '0 30px'
                    }}>
                        <TextBox refForm={this.refCouple} name="name" regexp={Reg.cname} label="姓名" placeholder="请输入" maxLength={4} />
                        <TextBox refForm={this.refCouple} name="mobile" regexp={Reg.mobile} patternType="mobile" label="手机号" placeholder="请输入" />
                        <TextBox refForm={this.refCouple} name="idNumber" label="身份证" placeholder="请输入" type="tel" regexp={Reg.idcard} />
                        <TextBox refForm={this.refCouple} name="orgName" label="单位名称" placeholder="请输入" />
                        <TextBox refForm={this.refCouple} name="duty" label="职务" placeholder="请输入" />
                        <TextBox refForm={this.refCouple} name="orgIncome" label="年收入（选填）" patternType="int" placeholder="请输入" extra="万" />
                        <TextBox refForm={this.refCouple} name="orgTel" regexp={Reg.phone} label="单位电话（选填）" patternType="mobile" placeholder="请输入" />
                        <TextBox refForm={this.refCouple} name="serviceYears" label="工作年限（选填）" patternType="int" placeholder="请输入" extra="年" />
                        <TextBox refForm={this.refCouple} name="orgType" label="配偶编制（选填）" placeholder="请输入" />
                        <TextBox refForm={this.refCouple} name="addressDetail" label="详细地址" placeholder="请输入" />
                    </div>

                </div>
            </DocumentTitle>
        );
    }
}


