import { observable, action } from "mobx";
import { Connection, IStateResponse } from './Connnection';
import { IonicAgent } from './models/IonicAgent';

export interface IStoreProps {
	store?: Store;
}
export class Store {
    conntection = new Connection();

    patient = new IonicAgent({
        username: 'virgil_patient',
        password: 'password123',
        fetchIonicAssertion: () => this.conntection.registerUser({
            email: 'test_patient@virgilsecurity.com',
            groupName: 'patients',
            firstName: 'Test',
            lastName: 'Patient'
        })
    });

    doctor = new IonicAgent({
        username: 'virgil_doctor',
        password: 'password123',
        fetchIonicAssertion: () => this.conntection.registerUser({
            email: 'test_physician@virgilsecurity.com',
            groupName: 'physicians',
            firstName: 'Test',
            lastName: 'Physician'
        })
    });

    insurer = new IonicAgent({
        username: 'virgil_insurer',
        password: 'password123',
        fetchIonicAssertion: () => this.conntection.registerUser({
            email: 'test_insurer@virgilsecurity.com',
            groupName: 'insurers',
            firstName: 'Test',
            lastName: 'Insurer'
        })
    });

    @observable state: {
        "medical_history"?: string,
        "office_visit_notes"?: string,
        "prescription"?: string,
        "insurer_reply"?: string
    } = {
        "medical_history": undefined,
        "office_visit_notes": undefined,
        "prescription": undefined,
        "insurer_reply": undefined
    }

    @action
    loadData() {
        this.conntection.fetchState().then(data => {
            this.state = data;
        });
    }

    sendMedicalHistory = (value: string) => {
        return this.conntection.updateState({ ...this.state, medical_history: value })
            .then(updatedState => {
                this.state = updatedState;
            });
    }

    sendVisitNotes = (value: string) => {
        return this.conntection.updateState({ ...this.state, office_visit_notes: value })
            .then(updatedState => {
                this.state = updatedState;
            });
    }

    sendPrescription = (value: string) => {
        return this.conntection.updateState({ ...this.state, prescription: value })
            .then(updatedState => {
                this.state = updatedState;
            });
    }

    sendInsurerReply = (value: string) => {
        return this.conntection.updateState({ ...this.state, insurer_reply: value })
            .then(updatedState => {
                this.state = updatedState;
            });
    }
}
