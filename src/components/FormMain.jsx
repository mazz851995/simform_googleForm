import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router'
import FormFields from './FormFields';
import { toast } from "react-toastify"

const FormMain = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const allForms = useSelector(state => state.formReducer)
    const getFormDetail = allForms.find(f => f.slug == slug);
    const [formValues, setFormValues] = useState({})
    const history = useHistory()


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "ADD_USER_FORM_RESPONSE", payload: { data: formValues, formId: slug } })
        toast.success("Form submitted successfully..!!");
        history.push("/");
    }
    const fieldChanged = (e) => {
        const { name, type, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    };
    return (
        <div className="container">
            {
                !getFormDetail ? <p className="text-center">No Questions Found</p> :
                    <div>
                        <h1 className="text-center">{`Form name : ${getFormDetail.formName}`}</h1>
                        <hr />
                        <div className="performSurvey">
                            <form onSubmit={(e) => handleSubmit(e)} >
                                {

                                    getFormDetail.allFormData.map((el, id) => {
                                        return <div key={id}>
                                            <h4>Q.{id + 1}) {el.title}</h4> <div className="alignCenter"><FormFields fieldChanged={fieldChanged} el={el} /></div> <br />
                                        </div>
                                    })
                                }
                                <button type="submit" className="btn btn-success" >Submit</button>
                            </form>
                        </div>

                    </div>
            }
        </div>
    )
}

export default FormMain
