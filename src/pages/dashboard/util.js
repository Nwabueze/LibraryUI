import axios from 'axios'

export const userData = async() => {
    const d = await axios.get('/data');
    console.log(d.data)
    return d.data;
}

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
