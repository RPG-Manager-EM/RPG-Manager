import axios from "./api";

const map = "/personagem";

class PersonagemService {
    async post(personagem, arquivos) {
        console.log("a", arquivos)
        const formData = new FormData();
        formData.append("personagem", JSON.stringify(personagem));

        for (let arquivo of arquivos) {
            formData.append("arquivos", arquivo);
        }
        
        const data = await axios.post(map, formData, { headers: { "Content-Type": "multipart/form-data" } });
        return data.data;
    }
}

export default new PersonagemService();