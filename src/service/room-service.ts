import {rootEntity} from "@service/root-service";
import {fromEntity, Link} from "@utility/api-client";

const roomEntity = rootEntity.getReference<RoomsEntity>("examination-rooms");

export interface Room {
    id: string,
    roomNumber: string,
    createdDateTime: string,
    updatedDateTime: string
    _links: { self: Link }
}

interface RoomsEntity {
    _links: Record<string,never>,
    examinationRoomList: Array<Room>
}

export function getRooms(): Promise<Array<Room>> {
    return roomEntity.getData().then(s => s.examinationRoomList);
}

export async function updateRoom(room: Room) {
    const roomNumber = room.roomNumber;
    await fromEntity(room).putReference("self", {roomNumber})
}

export async function createRoom(room: Room) {
    const roomNumber = room.roomNumber;
    await rootEntity.postReference("examination-rooms", {roomNumber})
}

