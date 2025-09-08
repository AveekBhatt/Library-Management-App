export const ValidateEmail = (email) =>{
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}
export const ValidatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};
export const getinitials = (name) =>{
    if(!name) return "";

    const words = name.split(" ");
    let initials="";
    for(let i=0; i<Math.min(words.length,2); i++){
        initials +=words[i][0];
    }

    return initials.toUpperCase();

}