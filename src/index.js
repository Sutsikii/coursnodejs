import express from "express";
import { simpleRandom } from "./utils/random.js";
import { pokemons } from "./utils/pokemon.js";
import cors from "cors"
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(cors());

app.get('/pokemons/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const pokemon = pokemons.find(pokemon => pokemon.id === id);
        const pokemonInfo = {
            nom: pokemon.name,
            type: pokemon.types
        };
        res.json(pokemonInfo);
});

app.get('/pokemonstype/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const pokemon = pokemons.find(pokemon => pokemon.id === id);

        if (!pokemon) {
            throw new Error('Le Pokémon avec l\'ID spécifié n\'existe pas.');
        }

        const pokemonInfo = {
            nom: pokemon.name,
            type: pokemon.types
        };

        res.json(pokemonInfo);
    } catch (error) {
        res.status(404).send('Erreur : ' + error.message);
    }
});



app.get('/random', async (req, res) => {
    try{
        // throw new Error('Ceci est une erreur volontaire pour tester');
        const randomNumber = await simpleRandom();
        res.json(randomNumber)
    } catch (error) {
        res.status(500).send('Erreur serveur')
    }
})

app.get('/', (req, res) => res.send("Hello world"));

app.listen(process.env.PORT, () => {
    console.log(`serveur allumé sur le port ${process.env.PORT}`);
});



// avoir le pokemon via id 
// avoir le nom et le type 
// avoir une erreur 404 pour les id qui n'existent pas
// .env

