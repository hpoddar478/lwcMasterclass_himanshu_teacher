import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import STATUS_CHANNEL from '@salesforce/messageChannel/StatusMessageChannel__c';

export default class StatusSubscriber extends LightningElement {

    @wire(MessageContext)
    messageContext;

    receivedMessage = '';

    connectedCallback(){
        console.log('Connected callback');
        this.subscribeToStatusChanges();
    }

    subscribeToStatusChanges(){
        console.log('Subscribed');
        subscribe(this.messageContext,STATUS_CHANNEL, 
            (payload) => this.handleStatus(payload) 
        );
    }

    handleStatus(payload){
        if(payload.status =='Online'){
            this.receivedMessage = 'New Video on LMS published. More videos to come!';
        }
    }

}