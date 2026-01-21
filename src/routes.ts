import type {Request, Response} from 'express';
import type { Item } from './types.js';

import { Router } from 'express';
const route = Router();

let iventario : Item[] = []
//Rota para criar um item novo
route.post("/itens", (req:Request, res: Response)=>{
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
route.get("/itens", (req:Request, res:Response)=>{
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
route.delete("/itens/:id", (req:Request, res:Response)=>{
    //tranformando em numero pois tudo quem vem da URL é string
    const id = Number(req.params.id);

    const index = iventario.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Item não encontrado para exclusão." });
    }

    iventario.splice(index,1);

    return res.status(200).json({ mensagem: `Item ${id} removido com sucesso.` });
})

route.put("/itens/:id",(req: Request, res:Response)=>{
    const id = Number(req.params.id);
    const {categoria,nome, preco, estoque} = req.body;

    const index = iventario.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).json({ mensagem: "Item não encontrado para atualização." });
    }

    const itemAtualizado: Item = {
        id,
        categoria,
        estoque,
        nome,
        preco
    }

    iventario[index] = itemAtualizado;
    
    return res.json({ 
        mensagem: "Item atualizado com sucesso!", 
        item: itemAtualizado 
    });
    
})

export default route;