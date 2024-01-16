import { IsNotEmpty } from "class-validator";

export class PatchPost{
    @IsNotEmpty()
    title:string;
    body:string;
}