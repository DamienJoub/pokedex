import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./app.scss";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Pokemons from "./composants/Pokemons";
import PokemonInfo from "./composants/PokemonInfo";

class App extends Component {

    render() {
        return (
            <Router>
		<Switch>
		    <Route exact path="/" component={Pokemons} />
		    <Route path="/pokemon/:id" component={PokemonInfo} />
		</Switch>
	    </Router>
        );
    } 
}

ReactDOM.render(<App />, document.getElementById("app"))