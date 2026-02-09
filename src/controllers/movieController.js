import { Decimal } from '@prisma/client/runtime/client';
import * as model from '../models/movieModel.js';

const generosPermitidos = [
    'Ação',
    'Drama',
    'Comédia',
    'Terror',
    'Romance',
    'Animação',
    'Ficção Científica',
    'Suspense',
];
export const getAll = async (req, res) => {
    try {
        const movie = await model.findAll(req.query);

        if (!movie || movie.length === 0) {
            return res.status(200).json({
                message: 'Nenhum registro encontrado.',
            });
        }
        res.json(movie);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registros' });
    }
};

export const create = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do exemplo!',
            });
        }

        const { title, description, duration, genre, rating, available } = req.body;

        if (!title || (title.length < 3))
            return res.status(400).json({ error: 'O titulo (titulo) é obrigatório!' });
        if (!description || (description.length < 10))
            return res.status(400).json({ error: 'A descrição (descrição) é obrigatório!' });
        if (!duration || !Number.isInteger(duration) || duration <= 0)
            return res.status(400).json({ error: 'A duração (duração) é obrigatório!' });
        if (!genre || !generosPermitidos.includes(genre))
            return res.status(400).json({ error: 'O gênero (gênero) é obrigatório!' });
        
        if (!available) return res.status(400).json({ error: 'A nota (nota) é obrigatório!' });

        if (rating === undefined || rating === null || rating < 0 || rating > 10) {
            return res.status(400).json({
                error: 'A nota (rating) é obrigatória e deve estar entre 0 e 10!',
            });
        }

        const data = await model.create({
            title,
            description,
            duration: parseInt(duration),
            genre,
            rating: parseFloat(rating),
            available: available !== undefined ? available : true,
        });

        res.status(201).json({
            message: 'Registro cadastrado com sucesso!',
            data,
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        res.status(500).json({ error: 'Erro interno no servidor ao salvar o registro.' });
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const data = await model.findById(id);
        if (!data) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }
        res.json({ data });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registro' });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do exemplo!',
            });
        }

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await model.findById(id);
        if (!exists) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        const data = await model.update(id, req.body);
        res.json({
            message: `O registro "${data.title}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: 'Erro ao atualizar registro' });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await model.findById(id);
        if (!exists) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await model.remove(id);
        res.json({
            message: `O registro "${exists.title}" foi deletado com sucesso!`,
            deletado: exists,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).json({ error: 'Erro ao deletar registro' });
    }
};
