import urlModel from "../model/urlModel.js";

const charSet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let loopCount:number = 0;


const generateShortCode = async (length: number = 7): Promise<string> =>{
    let result = '';
    for(let i=0; i<length; i++){
        const randomIndex = Math.floor(Math.random() * charSet.length);
        result += charSet[randomIndex];
    }

    const existing = await urlModel.findOne({shortCode: result});

    if(existing){
        if(loopCount > 5) throw new Error('Failed to generate unique short code. Try again later');
        
        ++loopCount;
        return generateShortCode(length);
    }
    return result;
}

export default generateShortCode;