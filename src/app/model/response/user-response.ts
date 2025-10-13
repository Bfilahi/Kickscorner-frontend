import { Authority } from "../authority";

export interface UserResponse{
    id: number,
    fullName: string,
    email: string,
    authorities: Authority[]
}