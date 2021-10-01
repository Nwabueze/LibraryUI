
/** return values 0: empty input, 
 * 1: too few characters in email, 
 * false: incorrect email format 
 * true: email looks good
 **/
export const handleEmail = (email) => {
    if(!email){
        // invalid: empty input
        return 0;
    }
    if(email.length < 6){
        // invalid:  too few characters in email,
        return 1;
    }
    if(email.match(/(\w+)@(\w+)\.(\w+)/) == null){
        return false;
    }

    // All checks passed
    return true;
}


export const isValidHumanName = (name) => {
    if(!name){
        // empty input was recieved
        return 0;
    }

    if(name.length < 3){
        // name contains too few characters
        return 1;
    }

    if(name.charAt(0).match(/\W+/) != null || name.replace(/\d+/, '').length < 3){
        // name needs to be a readable word only
        return false;
    }

    return true;
}

export const passwordWatch = (passw) => {
    if(!passw){
        return 0;
    }
    
    if(passw.length < 6){
        return 1;
    }

    // The passw is valid but not strong (will not be rejected)
    if(passw.match(/\d+/) != null && passw.match(/\w+/) != null && passw.replace(/\w+\d+/,'').length){
        return true;
    }

    return "true";
}