import { Store } from "../Store";
import { EditableColumnModel } from "./EditableColumnModel";
import { ReadonlyColumnModel } from "./ReadonlyColumnModel";

export class DoctorModel {
    medicalHistory = new ReadonlyColumnModel({
        sdk: this.store.doctor,
        valueReaction: () => this.store.state.medical_history
    });
    officeNotes = new EditableColumnModel({
        sdk: this.store.doctor,
        encryptFor:  "patient_physician",
        onSubmit: this.store.sendVisitNotes,
        valueReaction: () => this.store.state.office_visit_notes,
        activateReaction: () => this.medicalHistory.state === "Ready"
    });

    prescription = new EditableColumnModel({
        sdk: this.store.doctor,
        encryptFor: "patient_physician_insurer",
        onSubmit: this.store.sendPrescription,
        valueReaction: () => this.store.state.prescription,
        activateReaction: () => this.medicalHistory.state === "Ready"
    });

    insurerReply = new ReadonlyColumnModel({
        sdk: this.store.doctor,
        valueReaction: () => this.store.state.insurer_reply
    });

    constructor(readonly store: Store) {}
}