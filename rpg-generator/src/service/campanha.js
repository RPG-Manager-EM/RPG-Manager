import axios from "./api";

const map = "/campanha";

class CampanhaService {

    async getPage(params) {
        return (await axios.get(map + `/page`, { params: params })).data;
    }

    async getByAutor(id) {
        return (await axios.get(map + "/usuario/" + id)).data;
    }

    async getByAutorAndNome(id, nome) {
        return (await axios.get(map + `/usuario/nome/${id}/${nome}`)).data;
    }

    async getAllArquivadas(id) {
        return (await axios.get(map + "/usuario/" + id + "/arquivadas")).data;
    }

    async getByNomeAndSenha(nome, senha) {
        return (await axios.get(map + "/nome/" + nome + "/" + senha)).data;
    }

    async post(dados) {
        const formData = new FormData();
        formData.append("campanha", JSON.stringify(dados.campanha));
        formData.append("logo", dados.logo);
        formData.append("mapa", dados.mapa);
        return (await axios.post(map, formData, { headers: { "Content-Type": "multipart/form-data" } })).data;
    }

    async put(campanha) {
        const formData = new FormData();

        formData.append("campanha", JSON.stringify({
            nome: campanha.nome,
            proxima_sessao: campanha.proxima_sessao,
            descricao: campanha.descricao,
            arquivada: campanha.arquivada,
            usuario: campanha.usuario,
            sessao: campanha.sessao,
            senha: campanha.senha
        }));
        formData.append("logo", campanha.imagem.id);
        formData.append("mapa", campanha.mapa.id);

        return (await axios.put(map + "/" + campanha.id, formData, { headers: { "Content-Type": "multipart/form-data" } })).data;
    }

    async updatePersonagem(personagem, id) {
        return (await axios.put(map + "/personagem/" + id + "/" + personagem)).data;
    }
}

export default new CampanhaService();