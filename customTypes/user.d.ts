declare module 'user-module' {
  export interface User {
    name: string;
    lastName: string;
    id: number;
    idType: GenericType;
    mobile: number;
    altMobile?: number;
    email: string;
    birthDate: string;
    genre: GenericType;
    maritalStatus: GenericType;
    state: GenericType;
    city: GenericType;
    address: GenericType;
    tel: number;
    socialStratum: GenericType;
    houseType: GenericType;
    dependents: number;
  }

  export interface GenericType {
    id: number;
    description: string;
  }
}
