const Cliente = require('../models/Cliente');

class ClienteController {
    async list(req, res) {
        try {
            const clientes = await Cliente.findAll();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao buscar clientes.' });
        }
    }

    async create(req, res) {
        try {
            const novoCliente = await Cliente.create(req.body);
            res.status(201).json({ message: 'Cadastrado!', cliente: novoCliente });
        } catch (error) {
            res.status(400).json({ erro: 'Erro ao cadastrar. Verifique os dados.' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Cliente.update(req.body, { where: { id } });
            
            if (updated) {
                const cliente = await Cliente.findByPk(id);
                return res.json({ message: 'Atualizado!', cliente });
            }
            res.status(404).json({ erro: 'Cliente não encontrado.' });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao atualizar.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletado = await Cliente.destroy({ where: { id } });
            
            if (deletado) return res.json({ message: 'Removido com sucesso.' });
            res.status(404).json({ erro: 'Cliente não encontrado.' });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao excluir.' });
        }
    }
}

module.exports = new ClienteController();