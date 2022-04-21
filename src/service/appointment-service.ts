import {rootEntity} from "@service/root-service";

const appointmentEntity = rootEntity.getReference("appointments");

interface AppointmentAvailabilityEntity extends Array<AvailabilityWindow> {
    _links: Record<string, never>
}

export interface AvailabilityWindow {
    startTime: string;
    endTime: string;
}

export async function getAvailableWindows(): Promise<Array<AvailabilityWindow>> {
    const endRange = (new Date(new Date().getTime()+1000*60*60*24)).toISOString();
    return rootEntity.getReference<AppointmentAvailabilityEntity>("appointment-availability",{startRange:new Date().toISOString(),endRange}).getData();
}
