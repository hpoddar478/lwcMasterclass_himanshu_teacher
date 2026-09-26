import { LightningElement } from 'lwc';

export default class UseCaseTwo extends LightningElement {

    name = '';
    email = '';
    phone = '';
    age = '';

    errors = [];
    [
        { fieldName: '', erroMessage: '' }
    ]

    handleChange(event) {
        const field = event.target.dataset.field;
        this[field] = event.target.value;
    }

    validate() {

        const errs = [];
        if (!this.name) {
            errs.push({ fieldName: 'name', errorMessage: 'Name is required' });
        }
        if (!this.email) {
            errs.push({ fieldName: 'email', errorMessage: 'Email is required' });
        }
        if (this.name) {
            const fullName = this.name.trim().length;
            if (fullName < 3) {
                errs.push({ fieldName: 'name', errorMessage: 'Name must be at least 3 characters long' });
            }
        }
        if (this.age && (this.age > 100 || this.age <= 15)) {
            errs.push({ fieldName: 'age', errorMessage: 'Age must be between 15 and 100' });
        }

        return errs;

    }

    handleSubmit() {

        this.errors = this.validate();
        if (this.errors.length) {
            console.log('Form unsubmitted! ' + JSON.stringify(this.errors));
        }
        else {
            console.log('Form submitted successfully!');
            this.resetFields();
        }
    }

    resetFields() {
        this.name = '';
        this.email = '';
        this.phone = '';
        this.age = '';
    }

}