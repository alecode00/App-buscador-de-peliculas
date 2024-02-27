//Para el fetch
let urlBase = "https://api.themoviedb.org/3/search/movie?query=";
let apiKey = "af30373334d3084a9d72ee1ace863011";
let urlImg = "https://image.tmdb.org/t/p/w500";

let botonBusqueda = document.getElementById("searchButton");
botonBusqueda.addEventListener("click", fetchPelicula);

let errorMsg = document.createElement("p");
errorMsg.textContent = "No se encontró ninguna película con ese nombre";
errorMsg.style.color = "red";
errorMsg.classList.add('centrado');

function fetchPelicula() {
  let entradaFilm = document.getElementById("searchInput");
  let pelicula = entradaFilm.value;
  fetch(`${urlBase}${pelicula}&api_key=${apiKey}`)
    .then((response) => response.json())
    .then((response) => {
      mostrarPeliculas(response.results);
    });
}

function mostrarPeliculas(movies) {
  let divResults = document.getElementById("results");
  divResults.innerHTML = "";
  if (movies.length === 0) {
    divResults.appendChild(errorMsg);
  } else {
    movies.forEach((movie) => {
      let divMovie = document.createElement("div");
      let movieNombre = document.createElement("h2");
      let movieDescrip = document.createElement("p");
      let movieImg = document.createElement("img");
      let movieDate = document.createElement("p");

      divMovie.classList.add("movie");
      movieNombre.textContent = movie.title;
      movieDescrip.textContent = movie.overview;
      movieDate.textContent = `Fue creada en: ${movie.release_date}`;
      movieImg.src = `${urlImg}${movie.poster_path}`;

      divMovie.appendChild(movieImg);
      divMovie.appendChild(movieNombre);
      divMovie.appendChild(movieDescrip);
      divMovie.appendChild(movieDate);

      divResults.appendChild(divMovie);
    });
  }
}
