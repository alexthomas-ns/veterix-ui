import type {Link} from "@utility/api-client";
import {get, LinkedResponse} from "@utility/api-client";

interface RootEntity {
    links: {
        account: Link,
        accounts: Link,
        types: Link,
        'examination-room': Link,
        'examination-rooms': Link
    }
}

export const rootEntity: LinkedResponse<RootEntity> = get("v1");
