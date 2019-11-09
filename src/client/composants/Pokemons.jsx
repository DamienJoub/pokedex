import React, {Component} from "react";
import {Link} from "react-router-dom";

class Pokemons extends Component {
    constructor(props) {
    	super(props);
	this.state = {
	    spreadsheet_url: "https://spreadsheets.google.com/feeds/list/1r8aQnd1ZPrGkccv_6yHTfAG7uUBf1Kh4ONeo6BQpMn8/1/public/full?alt=json",
	    pokemons: []
	}
    }

    componentDidMount() {
	return fetch(this.state.spreadsheet_url)
        .then(r => r.json())
      	.then(json => json.feed.entry)
      	.then(jsonPokemons => {
            const pokemons = jsonPokemons.map(jsonPokemon => {
            	return {
            	    "id": jsonPokemon['gsx$id']['$t'],
           	    "nom": jsonPokemon['gsx$nom']['$t'],
		    "type": jsonPokemon['gsx$type']['$t'].split(",")
          	}
        });
        this.setState({pokemons: pokemons.sort((a, b) => a.id - b.id)});
      });
    }

    render() {
        return (
            <div className="pokemons">
		{
		    this.state.pokemons && this.state.pokemons.map((p, index) => {
			return (
			    <Link to={{pathname: `/pokemon/${p.nom}`}} className="pokemon-container" key={index}>
				<div className="pokemon">
				    <div className="pokemon-image">
					<img src={"http://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + p.id + ".png"} />
				    </div>
			    	    <div className="pokemon-info">
					<p>#{p.id}</p>
					<p style={{fontWeight: "bold"}}>{p.nom}</p>
					<p> 
					    {
						p.type.map((t, index) => {
						    return (
					    	    	<img key={index} src={"/images/types/s_" + t.toLowerCase().trim() + ".png"} />
						    );
						})
					    }
					</p>
				    </div>
				</div>
			    </Link>
			)
		    })
		}
	    </div>
        );
    } 
}

export default Pokemons;