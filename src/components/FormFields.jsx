import React from 'react'
const FormFields = ({ el, fieldChanged }) => {
    {

        if (el.type == 1) {
            return <input name={el.id} onChange={fieldChanged} placeholder="Answer here" type="text" className="form-control" />

        } else if (el.type == 2) {
            let checkboxes = el.textarea.split("\n");
            const rencheck = checkboxes.map((e, id) => {
                return <div key={id} className="form-check">
                    <input name={el.id} onChange={fieldChanged} value={e} className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="flexCheckChecked">{e}</label>
                </div>

            });
            return rencheck;
        }
        else {
            return <div className="form-check"><input name={el.id} onChange={fieldChanged} name="radio" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" /><label className="form-check-label" htmlFor="flexRadioDefault1">Single Check</label></div>
        }
    }
}

export default FormFields
