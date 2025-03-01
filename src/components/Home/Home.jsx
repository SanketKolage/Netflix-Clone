import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = process.env.REACT_APP_OMDB_API_KEY;
const url = "http://www.omdbapi.com/";
const placeholderImg = "https://via.placeholder.com/300x450?text=No+Image";

const Card = ({ img }) => <img className="card" src={img || placeholderImg} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={item.Poster !== "N/A" ? item.Poster : placeholderImg} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async (searchTerm, setter) => {
      try {
        const { data } = await axios.get(`${url}?apikey=${apiKey}&s=${searchTerm}&type=movie`);
        if (data.Search) setter(data.Search);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies("Avengers", setPopularMovies);
    fetchMovies("Action", setActionMovies);
    fetchMovies("Comedy", setComedyMovies);
    fetchMovies("Horror", setHorrorMovies);
    fetchMovies("Drama", setDramaMovies);
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${popularMovies[0].Poster})`
            : "rgb(16, 16, 16)",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].Title}</h1>}
        {popularMovies[0] && <p>Year: {popularMovies[0].Year}</p>}

        <div>
          <button>
            <BiPlay /> Play
          </button>
          <button>
            My List <AiOutlinePlus />
          </button>
        </div>
      </div>

      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Action"} arr={actionMovies} />
      <Row title={"Comedy"} arr={comedyMovies} />
      <Row title={"Horror"} arr={horrorMovies} />
      <Row title={"Drama"} arr={dramaMovies} />
    </section>
  );
};

export default Home;
