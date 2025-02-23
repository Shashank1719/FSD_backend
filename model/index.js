import buildMakeUser from "./user";
import buildMakeCard from "./card";
import buildMakeTransaction from "./transaction";
export const makeUser=buildMakeUser();
export const buildCard=buildMakeCard();
export const buildTransaction=buildMakeTransaction();
export default function models(){
    return Object.freeze({
        makeUser,
        buildCard,
        buildTransaction
    })
}