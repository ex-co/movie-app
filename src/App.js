import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './Movie';
import Movie from './Movie';

class App extends Component {

  state = {
    
  }

  componentDidMount() {
    this._getMovies();
  }

   _getMovies = async () => {
    const movies = await this._callApi()
  }

  _callApi = () => {
    fetch("https://yts.lt/api/v2/list_movies.json?sort_by=rating")
    .then(data => data.json())
    .then(json => {
      this.setState({
      movies: json.data.movies
    })})
    .catch(err => console.log(err))
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie, index) => {
      return <Movie 
      title={movie.title} 
      poster={movie.medium_cover_image} 
      key={index}
      genres={movie.genres}
      synopsis={movie.synopsis} />
    })
    return movies;
  }

  render() {
    return (
      <div className="App">
        {this.state.movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
