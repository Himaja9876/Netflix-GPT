
export const ClickValidate = (email, password, fullname) => {
    const emailValidate = /^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
    const passwordValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const fullNameValidate = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(fullname)

    if(!fullNameValidate) return "Full Name is not Valid";
    if(!emailValidate) return "Email is not Valid";
    if(!passwordValidate) return "Password is not Valid";
    
    return null;
}