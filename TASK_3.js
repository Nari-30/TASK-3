let index = 0;
const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');

function showSlide(i) {
  items.forEach((item, j) => {
    item.classList.remove('active');
    dots[j].classList.remove('active');
  });
  items[i].classList.add('active');
  dots[i].classList.add('active');
}

function nextSlide() {
  index = (index + 1) % items.length;
  showSlide(index);
}
function prevSlide() {
  index = (index - 1 + items.length) % items.length;
  showSlide(index);
}

setInterval(nextSlide, 4000);
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);
dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(index = i)));


const API_KEY = "31bbef36f33b61bc85536f4a0f687084"; 
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const searchInput = document.getElementById("search");
const moviesContainer = document.getElementById("movies");

async function fetchMovies(query) {
  try {
    const res = await fetch(API_URL + query);
    const data = await res.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = "";
  if (!movies || movies.length === 0) {
    moviesContainer.innerHTML = "<p>No movies found.</p>";
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
    `;
    moviesContainer.appendChild(card);
  });
}

searchInput.addEventListener("keyup", (e) => {
  if (e.target.value.length > 2) {
    fetchMovies(e.target.value);
  }
});
