const isLongerThanEight = (password) => password.length >= 8;
const hasNumber = (password) => /\d+/.test(password);
const hasUpperCase = (password) => /[A-Z]+/.test(password);

const validatePassword = (password) => {
    return isLongerThanEight(password) && 
    hasNumber(password) && 
    hasUpperCase(password);
}

export default validatePassword;
