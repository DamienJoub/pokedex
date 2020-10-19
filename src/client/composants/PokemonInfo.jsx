import React, {Component} from "react";
import "../app.scss";

class PokemonInfo extends Component {
    constructor(props) {
    	super(props);
	this.state = {
	    pokemon: null
	}
    }

    componentDidMount() {
	return fetch(`/api/pokemons/${this.props.match.params.id}`)
        .then(r => r.json())
      	.then(pokemon => {
            this.setState({pokemon});
      });
    }

    render() {
	const {pokemon} = this.state;
        return (
	    <>
		{
		    this.state.pokemon &&
			<div className="pokemon-container">
		    	    <div className="pokemon">
				<div className="pokemon-image">
			    	    <img src={"http://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + pokemon.id + ".png"} />
				</div>
				<div className="pokemon-info">
			    	<p>#{pokemon.id}</p>
			    	<p style={{fontWeight: "bold"}}>{pokemon.nom}</p>
			    	<p> 
				    {
				    	pokemon.type.map((t, index) => {
					    return (
					    	<img key={index} src={"/images/types/s_" + t.toLowerCase().trim() + ".png"} />
					    );
				    	})
				    }
			    	</p>
			    </div>
		    	</div>
		    </div>
		}
	    </>
        );
    } 
}

export default PokemonInfo;