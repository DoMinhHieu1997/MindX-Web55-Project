export const COMMON = {
    DOMAIN : "https://cooking-holics-backend.herokuapp.com/",
    // DOMAIN : "http://localhost:5000/",
} 

export const transferDate = (str) => {
    const date = new Date(str);
    return date.getDate() + "/" + (date.getMonth()*1+1) + "/" + date.getFullYear() +" "+ date.getHours()+":"+date.getMinutes();
}

export const spliceString = (str,num) => {
    const isLonger = str.length > num;

    if (isLonger) {
        let result = str.slice(0,num);

        for (let i = num; i<= str.length; i++ ) {
            if (str[i] === " ") {
                return result + "...";
            } else {
                result += str[i];
            }
        }
    } else {
        return str;
    }
}