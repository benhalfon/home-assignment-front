
export function IsEmailValid(inputText){
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return inputText.match(mailFormat);
}

export function IsBirthDateValid(birthDate){
    var now = new Date();
    now.setHours(0,0,0,0);
    return birthDate < now;
}