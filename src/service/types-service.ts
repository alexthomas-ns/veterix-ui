import {rootEntity} from "@service/root-service";
import type {Link} from "@utility/api-client";

interface TypesEntity {
    _links: {
        pet: Link
    }
}

export interface Type {
    name: string;
    type: string;
    description?: string;
}



const typesEntity = rootEntity.getReference<TypesEntity>("types");

export function getTypes(key:keyof TypesEntity['_links']):Promise<Readonly<Array<Type>>>{
   return typesEntity.getLinkedData<Array<Type>>(key);
}
