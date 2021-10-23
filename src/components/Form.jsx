import React, { useState } from 'react'
import Modal from 'react-modal';
import { toast } from "react-toastify"
import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';

const Form = () => {
    let subtitle;
    const [formName, setFormName] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false);

    const initialState = { title: "", type: "", textarea: "" }
    const [modalForm, setModalForm] = useState(initialState)

    const [allFormData, setAllFormData] = useState([])

    const dispatch = useDispatch();

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            minWidth: "50%",
            maxWidth: "70%"
        },
    };
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!modalForm.title) {
            toast.warning("Please add a question..!!");
            return false;
        }
        if (!modalForm.type) {
            toast.warning("Please select question type..!!");
            return false;
        }
        if (modalForm.type == 2 && !modalForm.textarea) {
            toast.warning("Options cannot be blank..!!");
            return false
        }
        modalForm.id = Date.now().toString();
        setAllFormData([...allFormData, modalForm])
        setModalForm(initialState);
    }

    const saveForm = () => {
        if (window.confirm("Are you sure you want to submit the form?")) {
            const slug = Date.now().toString();
            const data = { formName, slug, hits: 0, createdAt: new Date().toISOString().split('T')[0], allFormData }

            dispatch({ type: "ADD_FORM", payload: data })
            toast.success("Form added successfully..!!");
            setFormName("")
            setAllFormData([])

        } else {
            return false
        }

    }
    const removeQuestion = (i) => {
        const filteredData = allFormData.filter(el => el.id != i)
        setAllFormData(filteredData)
    }

    return (
        <div className="container">
            <div className="row g-3 createForm">
                <div className="col-auto">
                    <label htmlFor="formName" className="visually-hidden">Form Name</label>
                    <input onChange={(e) => setFormName(e.target.value)} value={formName} name="formName" type="text" className="form-control" placeholder="Enter Form Name" />
                </div>
                <div className="col-auto">
                    <button disabled={!formName} type="submit" onClick={openModal} className="btn btn-primary mb-3">Add Question</button>
                </div>
            </div>
            <hr />
            {allFormData.length > 0 ?
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                    <button className="btn btn-info saveFormBtn" onClick={() => saveForm()} >Save Form</button>
                </div>
                : ""}
            <section className="questionListing">
                <ul className="list-group">
                    {
                        allFormData.length < 1 ? "No Questions available" :
                            allFormData.map((el, i) => {
                                let element = "";
                                if (el.type == 1) {
                                    element = '<input placeholder="text-field" type="text" className="form-control" />'
                                } else if (el.type == 2) {
                                    let checkboxes = el.textarea.split("\n").join(", ");
                                    element = '<div className = "form-check" ><input className="form-check-input" type="checkbox"/><label className="form-check-label" for="flexCheckChecked">' + checkboxes + '</label></div>'
                                } else {
                                    element = '<div className="form-check"><input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" /><label className="form-check-label" for="flexRadioDefault1">Single Check</label></div>';
                                }
                                return <li key={el.id} className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-7">Q.{i + 1}) {el.title}</div>
                                        <div className="col-sm-4">
                                            {parse(element)}
                                        </div>
                                        <div className="col-sm-1"><span title="Remove" className="removeQuestion" onClick={() => removeQuestion(el.id)} >X</span></div>
                                    </div>
                                </li>
                            })

                    }
                </ul>
            </section>

            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <h2 className="text-center" >Add Fields</h2>
                <button className="btn btn-danger modal-close" onClick={closeModal}>Close</button>
                <hr />
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => setModalForm({ ...modalForm, title: e.target.value })} value={modalForm.title} className="form-control" name="title" placeholder="Question/Title" />
                    <br />
                    <select onChange={(e) => setModalForm({ ...modalForm, type: e.target.value })} value={modalForm.type} name="type" className="form-control" >
                        <option>--Select Question Type--</option>
                        <option value="1">Text</option>
                        <option value="2">Multichoice Checkbox</option>
                        <option value="3">Single Select Radio</option>
                    </select>
                    <br />
                    {
                        modalForm.type == 2 ?
                            <textarea onChange={(e) => setModalForm({ ...modalForm, textarea: e.target.value })} value={modalForm.textarea} name="textarea" id="" cols="30" rows="5" className="form-control" placeholder="Enter each choice in separate lines." ></textarea>
                            : ""
                    }
                    <br />
                    <button className="btn btn-success">Add</button>
                </form>
            </Modal>
        </div>
    )
}

export default Form
