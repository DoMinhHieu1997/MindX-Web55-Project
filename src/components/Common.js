export const COMMON = {
    // DOMAIN : "https://cooking-holics-backend.herokuapp.com/",
    DOMAIN : "http://localhost:5000/",
} 

export const transferDate = (str) => {
    const date = new Date(str);
    return date.getDate() + "/" + (date.getMonth()*1+1) + "/" + date.getFullYear() +" "+ date.getHours()+":"+date.getMinutes();
}