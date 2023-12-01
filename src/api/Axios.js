import axios from "axios";
const ForMySelf = "http://localhost:8080";

const AxiosProj = {
    borderCreate : async(title, content, url) => {
        const upload = {
            title : title,
            content : content,
            url : url
        };
        return await axios.post(`${ForMySelf}/borders/create`, upload)
    },

    getBorderList : async() => {
        return await axios.get(ForMySelf + `/borders`);
    },
}

export default AxiosProj;