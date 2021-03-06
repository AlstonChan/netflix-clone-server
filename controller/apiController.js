import axios from "axios";

import { movieGenres, tvGenres, trendingType } from "../utils/movieData.js";
const instances = axios.create({
  baseURL: "https://api.themoviedb.org/3/discover",
});

export const fetchMovie = async (req, res) => {
  const { requiredKey, requestedData } = req.body;
  try {
    if (requiredKey === process.env.FETCH_KEY && req.method === "POST") {
      if (requestedData === "hom") {
        const movies = [];
        let pageIndex = 1;
        for (let x = 0; x < movieGenres.length; x++) {
          if (pageIndex > 3) pageIndex = pageIndex - 1;
          const url = `/movie?api_key=${process.env.MOVIE_DB_API_KEY}&with_genres=${movieGenres[x].id}&page=${pageIndex}`;
          pageIndex++;
          const res = await instances.get(url);
          const data = res.data;
          movies.push({ genre: movieGenres[x].name, data });
        }
        res.status(200).json({ movies });
        res.end();
      } else if (requestedData === "tvs") {
        const movies = [];
        let pageIndex = 1;
        for (let x = 0; x < tvGenres.length; x++) {
          if (pageIndex > 3) pageIndex = pageIndex - 1;
          if (tvGenres[x].id == 37) pageIndex = 1;
          const url = `/tv?api_key=${process.env.MOVIE_DB_API_KEY}&with_genres=${tvGenres[x].id}&page=${pageIndex}`;
          pageIndex++;
          const res = await instances.get(url);
          const data = res.data;
          movies.push({ genre: tvGenres[x].name, data });
        }
        res.status(200).json({ movies });
        res.end();
      } else if (requestedData === "new") {
        const movies = [];
        let pageIndex = 1;
        for (let x = 0; x < trendingType.length; x++) {
          if (trendingType[x] == "all") {
            pageIndex = 5;
          } else {
            pageIndex = 1;
          }
          const url = `https://api.themoviedb.org/3/trending/${trendingType[x]}/week?api_key=${process.env.MOVIE_DB_API_KEY}&page=${pageIndex}`;
          const res = await instances.get(url);
          const data = res.data;
          movies.push({
            genre:
              trendingType[x].charAt(0).toUpperCase() +
              trendingType[x].slice(1),
            data,
          });
        }

        res.status(200).json({ movies });
        res.end();
      }
    } else {
      res.status(403);
      res.end(`Error 403`);
    }
  } catch {
    res.status(500);
    res.end(`Error 500`);
  }
};
