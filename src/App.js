import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg"



const API_URL = "http://www.omdbapi.com?apikey=3ac638c8";


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }


    useEffect(() => {
        searchMovies('Avatar')
    }, []);


    return (
        <div className="app">
            <h1>Movie Zone</h1>
            <div className="search">
                <input placeholder="Seach for movies" value={searchTerm} onKeyPress={() => searchMovies(searchTerm)} onChange={(e) => setSearchTerm(e.target.value)} />
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)}></img>
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    )
}

export default App;