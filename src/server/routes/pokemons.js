const express = require("express");
const pokemonsRouter = express.Router();
const fetch = require('node-fetch');

const spreadsheet_url = "https://spreadsheets.google.com/feeds/list/1ipfgNH3Az5fv0GqPjsMsuuQWnltqDIs3DseDcEZxa-g/1/public/full?alt=json";

pokemonsRouter.get("/", function(req, res) {
    fetch(spreadsheet_url)
	.then(r => r.json())
	.then(json => json.feed.entry)
      	.then(jsonPokemons => {
	    let pokemons = jsonPokemons.map(jsonPokemon => {
            	return {
            	    "id": jsonPokemon['gsx$id']['$t'],
           	    "nom": jsonPokemon['gsx$nom']['$t'],
		    "type": jsonPokemon['gsx$type']['$t'].split(",")
          	}
	    });
	    pokemons = pokemons.sort((a, b) => a.id - b.id);
	    res.send(pokemons);
	})
	.catch(err => {
	    res.send(err);
	});
});

pokemonsRouter.get("/:name", function(req, res) {
    fetch(spreadsheet_url + `&sq=nom=${req.params.name}`)
	.then(r => r.json())
	.then(json => json.feed.entry)
      	.then(jsonPokemons => {
	    let pokemons = jsonPokemons.map(jsonPokemon => {
            	return {
            	    "id": jsonPokemon['gsx$id']['$t'],
           	    "nom": jsonPokemon['gsx$nom']['$t'],
		    "type": jsonPokemon['gsx$type']['$t'].split(",")
          	}
	    });
	    res.send(pokemons[0]);
	})
	.catch(err => {
	    res.send(err);
	});
});

module.exports = pokemonsRouter;