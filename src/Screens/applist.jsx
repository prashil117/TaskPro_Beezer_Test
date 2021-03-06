import { Component } from 'react';
import data from './../data.json';
import { Table, Button } from 'react-bootstrap'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { AddData, fetchData, fetchAccounts, AddRatings } from './../Redux/actions/useraction'
import { bindActionCreators } from 'redux'
import { Rate } from 'antd';

class AppList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newData: [],
            dataload: this.props.msg === "" ? 'fetching' : 'fetched'
        }
    }

    UpdateRatings() {
        this.props.UpdateRatings(data)
    }
    componentDidMount() {
        this.props.fetchAccounts();
    }
    handleChange = (key, e) => {
        this.props.AddRatings({ id: key, rate: e })
    }
    render() {
        let AppData = []
        let ele = null;
        let star = null;
        this.props.AccountList.map((data) => {
            const { id, title, name, ratings } = data;
            star = (<Rate allowHalf onChange={(e) => this.handleChange(id, e)} value={ratings} />)
            ele = (<tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{title}</td>
                <td>{star}</td>
            </tr>)
            return AppData.push(ele);
        })
        return (
            <div>
                <div>
                    <h1>Data {this.props.msg === "" ? 'fetching' : 'fetched'} from Firebase Real Time Database</h1>
                </div>
                <Link className="btn btn-info" to="userList">Go to userlist</Link>
                {AppData && AppData.length !== 0 ?
                    <div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>App ID</th>
                                    <th>App Name</th>
                                    <th>Title</th>
                                    <th>Ratings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AppData}
                            </tbody>
                        </Table>
                    </div> : <div> <h4>{this.props.msg}</h4>{this.props.msg === "" ? <Spin tip="Loading..."></Spin> : ""}
                    </div>}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        AccountList: state.user.AccountList,
        msg: state.user.msg
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            AddData,
            fetchData,
            fetchAccounts,
            AddRatings
        },
        dispatch
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(AppList)