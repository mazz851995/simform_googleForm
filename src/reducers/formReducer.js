const initialState = []

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_FORMS":
            const datas = JSON.parse(localStorage.getItem("forms"))
            if (datas) {
                return state = JSON.parse(localStorage.getItem("forms"))
            } else {
                return state;
            }
        case "ADD_FORM":
            state = [...state, action.payload]
            localStorage.setItem("forms", JSON.stringify(state));
            return state

        case "ADD_USER_FORM_RESPONSE":
            const existData = [...state];
            const { formId, data } = action.payload
            let formById = state.find(e => e.slug === formId)
            let formIndex = state.findIndex(e => e.slug === formId)
            if (!formById.responses) {
                formById.responses = [];
            }
            formById.responses.push(data);
            existData.splice(formIndex, 1, formById);
            state = existData;
            localStorage.setItem("forms", JSON.stringify(state));
            return state

        default:
            return state;
    }
}

export default formReducer