import { LightningElement, api, track } from 'lwc';
import getRelatedRecords from '@salesforce/apex/ChildRecordsController.getRelatedRecords';

export default class UseCaseThree extends LightningElement {

    @api recordId;
    @track data = [];
    @api limitSize = 5;
    error = '';

    @api childObjectApiName = 'Opportunity';
    @api fieldsList = 'Id, Name, StageName, CloseDate';
    @api lookupFieldApiName = 'AccountId';

    connectedCallback() {
        this.loadChildRecords();
    }

    async loadChildRecords() {
        try {
            const result = await getRelatedRecords({
                recordId: this.recordId,
                childObjectApiName: this.childObjectApiName,
                fieldsList: this.fieldsList,
                lookupFieldApiName: this.lookupFieldApiName,
                limitSize: this.limitSize
            });
            this.data = result;
        }
        catch (e) {
            this.data = [];
            this.error = e.body.message;
        }
    }

    get columns(){
        const fields = this.fieldsList.split(',').map(f => f.trim()).filter(Boolean);
        return fields.map( field => ({label: field, fieldName: field}));
    }

}