const getIP = async (): Promise<string> =>{
    const ipData = await fetch("https://api.ipify.org?format=json");
    const ip = await ipData.json();
    return ip.ip;
}

export default getIP;