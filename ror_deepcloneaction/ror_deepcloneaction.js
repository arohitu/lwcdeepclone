import { LightningElement, api } from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { NavigationMixin } from 'lightning/navigation';
import startDeepClone from '@salesforce/apex/ROR_CloneController.startDeepClone';

export default class Ror_deepcloneaction extends NavigationMixin(LightningElement) {

    @api invoke() {
        this.startToast('Deep Clone!','Starting cloning process...');
        //Call the cloning imperative apex js method
        this.startCloning();
    }
    
    startCloning(){
        startDeepClone({recordId: this.recordId})
        .then(result => {
            this.startToast('Deep Clone!','Cloning Process Completed');
            this.navigateToRecord(result);
         })
         .catch(error => {
            this.startToast('Deep Clone!','An Error occured during cloning'+error);
         });
    }

    startToast(title,msg){
        let event = new ShowToastEvent({
            title: title,
            message: msg,
        });
        this.dispatchEvent(event);
    }

    navigateToRecord(clonedRecId){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: clonedRecId,
                actionName: 'view',
            },
        });
    }

}