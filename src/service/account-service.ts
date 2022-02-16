import {rootEntity} from "@service/root-service";
import type {Link} from "@utility/api-client";
import {fromEntity} from "@utility/api-client";

interface AccountEntity {
    _links: {self:Link}
    accountList: Array<Account>

}

export interface Account {
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
    pets?: Array<Pet>
    paymentInformation?: Array<PaymentInformation>
    _links: { self: Link }
}

interface Pet {
    id: string,
    name: string,
    species: string,
    breed: string,
    createdTimestamp: string
}

interface PaymentInformation {

}

const accountEntity = rootEntity.getReference<AccountEntity>("accounts");

export function getAccounts(): Promise<Readonly<Array<Account>>> {
    return accountEntity.getData(true).then(s => s.accountList);
}

export async function updateAccount(account: Account): Promise<Account> {
    const {name, email, phoneNumber, address} = account;
    return fromEntity(account).putReference("self", {name, email, phoneNumber, address})
}
export async function saveAccount(account: Account): Promise<Account> {
    const {name, email, phoneNumber, address} = account;
    return rootEntity.postReference("accounts", {name, email, phoneNumber, address})
}

export async function deleteAccount(account: Account):Promise<never>{
   return fromEntity(account).deleteReference("self");
}
