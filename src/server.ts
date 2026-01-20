import express from 'express';
import type {Request, Response} from 'express';
import type { Item } from './types.js';

const app = express();
app.use(express.json());

let iventario : Item[] = []

//Rota para criar um item novo
app.post("/itens", (req:Request, res: Response)=>{
    const { nome, categoria, preco, estoque} = req.body;

    const novoID = iventario.length > 0 
    ? 
    Math.max(...iventario.map(i => i.id))+1
    :
    1;

    const novoItem : Item  = {
        id: novoID,
        nome,
        categoria,
        preco,
        estoque
    }

    iventario.push(novoItem)
    return res.status(201).json(novoItem)
})

//Rota para listar itens por categoria
app.get("/itens", (req:Request, res:Response)=>{
    const {categoria}= req.query
    try {
        if(categoria){
            const itensFiltrados = iventario.filter(i => String(i.categoria).toLocaleLowerCase() === categoria);

            if(itensFiltrados.length === 0){
                return res.status(404).json({mensagem:"Nenhum item encontrado!"})
            }
            return res.status(200).json(itensFiltrados)
        }
        
        return res.status(200).json(iventario)
        
    } catch (error) {
        console.error("Erro ao exibir dados:", error)
        return res.status(500).json({mensagem:"Erro interno no serivor"})
    }
})

//Rota para deletar um item
app.delete("/itens/:id", (req:Request, res:Response)=>{
    //tranformando em numero pois tudo quem vem da URL é string
    const id = Number(req.params.id);

    const index = iventario.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Item não encontrado para exclusão." });
    }

    iventario.splice(index,1);

    return res.status(200).json({ mensagem: `Item ${id} removido com sucesso.` });
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});