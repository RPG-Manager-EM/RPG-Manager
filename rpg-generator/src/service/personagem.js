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

    async getByUsuarioAndCampanhaNull(usuario) {
        const data = await axios.get(map + `/campanha-null/${usuario}`);
        return data.data;
    }

    async getByCampanha(id) {
        return (await axios.get(map + `/campanha/${id}`)).data;
    }

    async getByCampanhaAndUsuario(id, usuario) {
        return (await axios.get(map + `/campanha/usuario/${id}/${usuario}`)).data;
    }

    async getByUsuario(usuario) {
        const data = await axios.get(map + `/usuario/${usuario}`);
        return data.data;
    }
}

export default new PersonagemService();