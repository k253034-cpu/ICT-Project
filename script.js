// ============================
// RANDOM MOVIE DATA (YOUR IMAGES)
// ============================
const RANDOM_MOVIES = [
  { title: "Venom 3", file: "venom3.jpg" },
  { title: "Venom 2", file: "venom2.jpg" },
  { title: "Venom", file: "venom.jpg" },
  { title: "The Dark Knight", file: "thedarkknight.jpg" },
  { title: "The Crown", file: "thecrown.jpg" },
  { title: "Stranger Things", file: "strangerth.jpg" },
  { title: "Spider-Man", file: "spiderway.jpg" },
  { title: "Sijjin", file: "sijjin.jpg" },
  { title: "Shutter Island", file: "shutter.jpg" },
  { title: "Sherlock Holmes", file: "sherlock.jpg" },
  { title: "Scream", file: "scream.jpg" },
  { title: "Interstellar", file: "scifi1.jpg" },
  { title: "Rush", file: "rush.jpg" },
  { title: "The Matrix", file: "matrix.jpg" },
  { title: "Joker", file: "joker.jpg" },
  { title: "The Conjuring", file: "horror1.jpg" },
  { title: "Game of Thrones", file: "got.jpg" },
  { title: "Squid Game", file: "game.jpg" },
  { title: "IT", file: "it.jpg" },
  { title: "The Dictator", file: "dictator.jpg" },
  { title: "Dune", file: "Dune.jpg" },
  { title: "Carry On Jatta", file: "carry.jpg" },
  { title: "Avengers", file: "Avengers.jpg" }
];

// ============================
// RANDOM MOVIE BUTTON (IMAGE OUTPUT)
// ============================
document.getElementById("randomBtn")?.addEventListener("click", () => {
  const resultBox = document.getElementById("randomMovieResult");

  const random = RANDOM_MOVIES[Math.floor(Math.random() * RANDOM_MOVIES.length)];

  resultBox.innerHTML = `
    <div style="text-align:center;">
      <img src="${random.file}" 
           alt="${random.title}" 
           style="width:220px; border-radius:12px; margin-bottom:8px;">
      <p style="font-size:20px; color:white;">${random.title}</p>
    </div>
  `;
});

// ============================
// HELPER FUNCTIONS
// ============================

function findSpotCard(title) {
  const cards = document.querySelectorAll(".spot-card");
  title = title.trim().toLowerCase();

  for (const c of cards) {
    const cardTitle =
      (c.dataset.title || c.querySelector("h3").innerText).toLowerCase();
    if (cardTitle === title) return c;
  }
  return null;
}

function createSpotCard(movie) {
  const card = document.createElement("div");
  card.className = "spot-card movie";
  card.dataset.title = movie.title;
  card.innerHTML = `
      <div class="poster-wrap">
        <img src="${movie.file}" alt="${movie.title}">
      </div>
      <h3>${movie.title}</h3>
    `;
  return card;
}

function clearActiveSpot() {
  document.querySelectorAll(".spot-card").forEach(c =>
    c.classList.remove("active")
  );
  document.getElementById("spotlightRow")?.classList.remove("focused");
}

// ============================
// SPOTLIGHT CARD CLICK
// ============================

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".spot-card").forEach(card => {
    card.addEventListener("click", () => {
      const row = document.getElementById("spotlightRow");
      const isActive = card.classList.contains("active");

      clearActiveSpot();

      if (!isActive) {
        card.classList.add("active");
        row.classList.add("focused");
      } else {
        row.classList.remove("focused");
      }
    });
  });
});

// ============================
// LEFT / RIGHT ARROWS
// ============================

document.getElementById("leftArrow")?.addEventListener("click", () => {
  const row = document.getElementById("spotlightRow");
  row.scrollBy({ left: -350, behavior: "smooth" });
  row.classList.remove("focused");
  clearActiveSpot();
});

document.getElementById("rightArrow")?.addEventListener("click", () => {
  const row = document.getElementById("spotlightRow");
  row.scrollBy({ left: 350, behavior: "smooth" });
  row.classList.remove("focused");
  clearActiveSpot();
});

// ============================
// SEARCH BAR
// ============================

const searchBar = document.getElementById("searchBar");
const clearSearch = document.getElementById("clearSearch");

if (searchBar) {
  searchBar.addEventListener("keyup", () => {
    const searchText = searchBar.value.toLowerCase();
    clearSearch.style.display = searchText ? "block" : "none";

    document.querySelectorAll(".movie h3").forEach(movie => {
      const title = movie.textContent.toLowerCase();
      const card = movie.closest(".movie");
      card.style.display = title.includes(searchText) ? "block" : "none";
    });
  });
}

if (clearSearch) {
  clearSearch.addEventListener("click", () => {
    searchBar.value = "";
    clearSearch.style.display = "none";
    document
      .querySelectorAll(".movie")
      .forEach(card => (card.style.display = "block"));
  });
}

// ============================
// GENRE FILTER
// ============================

function filterMovies() {
  const sel = document.getElementById("genreFilter");
  if (!sel) return;

  const selected = sel.value;
  const movies = document.querySelectorAll(".movie-card");

  movies.forEach(movie => {
    movie.style.display =
      selected === "all" || movie.dataset.genre === selected
        ? "block"
        : "none";
  });
}
window.filterMovies = filterMovies;

// ============================
// GENRE SEARCH
// ============================

function searchMovies() {
  const s = document.getElementById("searchBar");
  if (!s) return;

  const q = s.value.toLowerCase();

  document.querySelectorAll(".movie-card").forEach(card => {
    const title =
      (card.dataset.title || card.querySelector("h3").innerText).toLowerCase();
    card.style.display = title.includes(q) ? "block" : "none";
  });
}
window.searchMovies = searchMovies;
// ============================
// RANDOM MOVIE POPUP
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const randomBtn = document.getElementById("randomBtn");
  const modal = document.getElementById("movieModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const closeModal = document.getElementById("closeModal");

  if (!modal || !modalImg || !modalTitle || !closeModal) {
    console.error("⚠ Modal HTML missing!");
    return;
  }

  // OPEN MODAL
  randomBtn?.addEventListener("click", () => {
    const random = RANDOM_MOVIES[Math.floor(Math.random() * RANDOM_MOVIES.length)];
    modalImg.src = random.file;
    modalTitle.textContent = random.title;

    modal.style.display = "flex";
  });

  // CLOSE BY X BUTTON
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // CLOSE BY CLICKING OUTSIDE IMAGE
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // CLOSE BY ESC KEY
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
    }
  });
});