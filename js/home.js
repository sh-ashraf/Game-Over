const loading = document.querySelector('.loading');
const mode = document.getElementById('mode');

getGames('mmorpg');


if(localStorage.getItem('mode')) {
    document.querySelector('html').setAttribute('data-theme', `${localStorage.getItem('mode')}`);
}else {
    document.querySelector('html').setAttribute('data-theme', 'dark');
}

window.addEventListener("scroll", () => {
    const navbar = document.querySelector("nav");
    const offset = navbar.offsetTop;

    if (window.scrollY >= offset) {
        navbar.classList.add("fixed-nav");
    } else {
        navbar.classList.remove("fixed-nav");
    }
});
const navbar = document.querySelector("nav");
const navbarInitialOffset = navbar.offsetTop;

window.addEventListener("scroll", () => {
    if (window.scrollY >= navbarInitialOffset) {
        navbar.classList.add("fixed-nav");
    } else {
        navbar.classList.remove("fixed-nav");
    }
});

mode.addEventListener('click', function() {
  if(mode.classList.contains('fa-sun')) {
    document.querySelector('html').setAttribute('data-theme', 'light');
    localStorage.setItem('mode', 'light');
    mode.classList.replace('fa-sun', 'fa-moon');
  } else {
    document.querySelector('html').setAttribute('data-theme', 'dark');
    localStorage.clear();
    localStorage.setItem('mode', 'dark');
    mode.classList.replace('fa-moon', 'fa-sun');
  }
});

document.querySelectorAll('.menu a').forEach((link) => {
    link.addEventListener('click', function ()  {
        document.querySelector('.menu .active').classList.remove('active');
        this.classList.add('active');
        const category = this.getAttribute('data-category'); //or -> link.dataset.category
        getGames(category);
    })
});
document.querySelector('.logout-btn').addEventListener('click', () => {
    localStorage.removeItem('userToken')
    location.href = './index.html'
})
async function getGames(category) {
    showLoading();
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com' ,
	        'x-rapidapi-key': '8980bec251mshe1ffd2f17ced7d9p116befjsnfa7697e6d297'
        }
    });
    const data = await response.json();
    displayGames(data);
    hideLoading();
}
function displayGames(data) {
    let gameBox = '';
    for(let i=0; i<data.length;i++) {
        const videPath = data[i].thumbnail.replace('thumbnail.jpg', 'videoplayback.webm');
        gameBox += `
            <div class="col">
            <div onmouseenter="startVideo(event)" onmouseleave="stopVideo(event)" class="card h-100 bg-transparent" role="button" onclick="showDetails(${data[i].id})">
                <div class="card-body">
                    <figure class="position-relative">
                        <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />
                        <video muted="true"  preload="none" loop class="w-100 d-none h-100 position-absolute top-0 start-0 z-3"><source src="${videPath}"></video>
                    </figure>

                    <figcaption>
                        <div class="hstack justify-content-between">
                            <h3 class="h6 small">${data[i].title}</h3>
                            <span class="badge text-bg-primary p-2">Free</span>
                        </div>
                        <p class="card-text small text-center opacity-50">
                            ${data[i].short_description.split(" ", 8).join(' ')}
                        </p>
                    </figcaption>
                </div>

                <footer class="card-footer small hstack justify-content-between">

                    <span class="badge badge-color text-white">${data[i].genre}</span>
                    <span class="badge badge-color text-white">${data[i].platform}</span>

                </footer>
            </div>
        </div>
        `;
        document.getElementById('gameData').innerHTML = gameBox;
    }
}
function startVideo(event) {
    const videoPlay = event.target.querySelector('video');
    videoPlay.classList.remove('d-none');
    videoPlay.muted = true; 
    videoPlay.play();

}
function stopVideo(event) {
    const videoStop = event.target.querySelector('video');
    videoStop.classList.add('d-none');
    videoStop.muted = true; 
    videoStop.pause();
}
function showLoading() {
    loading.classList.remove('d-none');
}
function hideLoading() {
    loading.classList.add('d-none');
}
function showDetails(id) {
    location.href = `./details.html?id=${id}`;
}
