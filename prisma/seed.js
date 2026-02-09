import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.movie.createMany({
        data: [
            {
                title: 'A Origem',
                description: 'Dom Cobb rouba segredos através dos sonhos',
                duration: 148,
                genre: 'Ficção Científica',
                rating: 8.8,
                available: true,
            },
            {
                title: 'The Matrix',
                description: 'Um programador descobre a verdadeira natureza da realidade',
                duration: 136,
                genre: 'Ação',
                rating: 8.7,
                available: true,
            },
            {
                title: 'Interestelar',
                description: 'Exploradores viajam através de um buraco de minhoca no espaço',
                duration: 169,
                genre: 'Ficção Científica',
                rating: 8.7,
                available: true,
            },
            {
                title: 'Parasita',
                description: 'Uma família pobre se infiltra na vida de uma família rica',
                duration: 132,
                genre: 'Suspense',
                rating: 8.6,
                available: true,
            },
            {
                title: 'O Poderoso Chefão',
                description: 'A história da transição de poder em uma família mafiosa',
                duration: 175,
                genre: 'Drama',
                rating: 9.2, // Não pode ser deletado (Rating >= 9)
                available: true,
            },
            {
                title: 'Blade Runner 2049',
                description: 'Um novo blade runner descobre um segredo enterrado',
                duration: 164,
                genre: 'Ficção Científica',
                rating: 8.0,
                available: true,
            },
            {
                title: 'A Viagem de Chihiro',
                description: 'Uma menina entra em um mundo de deuses e espíritos',
                duration: 125,
                genre: 'Animação',
                rating: 8.6,
                available: true,
            },
            {
                title: 'Batman: O Cavaleiro das Trevas',
                description: 'Batman enfrenta a ameaça caótica do Coringa',
                duration: 152,
                genre: 'Ação',
                rating: 9.0, // Não pode ser deletado (Rating >= 9)
                available: true,
            },
            {
                title: 'Pulp Fiction',
                description: 'Histórias entrelaçadas de crime em Los Angeles',
                duration: 154,
                genre: 'Suspense',
                rating: 8.9,
                available: true,
            },
            {
                title: 'A Chegada',
                description: 'Uma linguista tenta se comunicar com alienígenas',
                duration: 116,
                genre: 'Ficção Científica',
                rating: 7.9,
                available: true,
            },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
