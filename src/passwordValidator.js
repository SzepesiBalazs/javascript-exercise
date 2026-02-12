// export function validatePassword(password) {
//     return password.length >= 8
// }


const isLongerThanEight = (password) => password.length >= 8;
const hasNumber = (password) => /\d+/.test(password);

const validatePassword = (password) => {
    return isLongerThanEight(password) && hasNumber(password);
}



export default validatePassword;


