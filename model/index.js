import buildMakeUser from "./user";
export const makeUser=buildMakeUser();

export default function models(){
    return Object.freeze({
        makeUser
    })
}