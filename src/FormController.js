import {findDOMNode} from "react-dom";

export const formControllerFactory = (appObj, assignmentId, submitTo, formChangeCallback) => {
    let controller = {}
    const task = appObj
    const _assignmentId = assignmentId
    const _submitTo = submitTo


    controller.onFormChange = (form) => {
        formChangeCallback(form)
    }

    controller.onSubmit = (form, state) => {
        if (task.hasOwnProperty('pages')) {
            if (this.state.page === task.pages.length - 1) {
                this.setState({response: {...this.state.response, ...form.formData}, formData: {}})
                setTimeout(() => this._form.submit())
            } else {
                if (this.state.response) {
                    this.setState({response: {...this.state.response, ...form.formData}, page: this.state.page+1, formData: {}})
                } else {
                    this.setState({response: form.formData, page: this.state.page+1, formData: {}})
                }
            }
        } else {
            //formChangeCallback(form)
            setTimeout(() => submitCrowdForm(state),50)
        }
    }

    const submitCrowdForm = (state) => {
        //document.querySelector('crowd-map').value = { response: JSON.stringify(state.formData) }
        document.querySelector('crowd-form').submit()
    }

    // controller.getSchemaForQuestion = (question) => {
    //     // TODO: May need to rethink how this is targeted
    //     return task.questions
    // }

    // controller.uiSchema = () => {
    //     return task.questions_schema
    // }

    controller.assignmentId = () => _assignmentId
    controller.submitTo = () => _submitTo

    controller.attachForm = (node) => {
        this._form = findDOMNode(node);
    }

    return controller;
};
