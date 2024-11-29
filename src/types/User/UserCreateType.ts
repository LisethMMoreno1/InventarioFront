export type UserPost = {
    id: number;
    typeOfIdentificationId: number;
    identificationNumber: string;
    firstName: string;
    middleName?: string;
    firstLastName: string;
    secondLastName?: string;
    phoneNumber?: string;
    email: string;
    genre: number;
    role: number;
    password: string;
    isActive?: boolean
}
