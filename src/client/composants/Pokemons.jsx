import React, {Component} from "react";
import {Link} from "react-router-dom";

class Pokemons extends Component {
    constructor(props) {
    	super(props);
	this.state = {
	    pokemons: []
	}
    }

    componentDidMount() {
	fetch("/api/pokemons", {
	    method: "GET",
	    headers: {"Accept": "application/json"}
	})
        .then(r => r.json())
      	.then(pokemons => {
	    this.setState({pokemons});
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