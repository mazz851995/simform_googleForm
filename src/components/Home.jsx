import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'


const Home = () => {
    const allForms = useSelector(state => state.formReducer)


    const history = useHistory()
    const handleCreateForm = () => {
        history.push("/create-form");
    }

    useEffect(() => {

    }, [history])
    return (
        <div className="container">
            <div className="formBTN">
                <button onClick={() => handleCreateForm()} className="btn btn-success">Create New Form</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Form Name</th>
                        <th scope="col">Form URL</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Total Responses</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allForms.length < 1 ?
                            <tr>
                                <th colSpan="5">{"No Forms available"}</th>
                            </tr>
                            :
                            allForms.map((ele, i) => {
                                return <tr key={ele.slug}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{ele.formName}</td>
                                    <td>
                                        <Link to={`form/${ele.slug}`}>{`${ele.slug}`}</Link>
                                    </td>
                                    <td>{ele.createdAt}</td>
                                    <td>{ele.responses ? ele.responses.length : 0}</td>
                                </tr>
                            })
                    }
                    <tr>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

export default Home
