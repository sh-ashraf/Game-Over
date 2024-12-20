
const searchParams = location.search; // ?id=555
const params = new URLSearchParams(searchParams);
const gameID = params.get('id');

const mode = document.getElementById('mode');
if(localStorage.getItem('mode')) {
    document.querySelector('html').setAttribute('data-theme', `${localStorage.getItem('mode')}`);
}else {
    document.querySelector('html').setAttribute('data-theme', 'dark');
}
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


(async function() {
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameID}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
            'x-rapidapi-key': '8980bec251mshe1ffd2f17ced7d9p116befjsnfa7697e6d297'
        }
    })
    if(response.ok) {
        const data = await response.json();
        displayCardDetails(data);
    }

})();

function displayCardDetails(data) {
    let container = '';
    container = `
   <div class="col-md-4">
        <figure>
            <img src="${data.thumbnail}" class="w-100" alt="details image" />
        </figure>
   </div>
   <div class="col-md-8 text-white">
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li> 
                    <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
                </ol>
            </nav>
            <h1 class="text-white">${data.title}</h1>
            <h3 class="text-white">About ${data.title}</h3>
                <p>Category: <span class="badge text-bg-info"> ${data.genre}</span></p>
                <p>Platform: <span class="badge text-bg-info">  ${data.platform}</span></p>
                <p>Status: : <span class="badge text-bg-info"> ${data.status}</span></p>
            <p>${data.description}</p>
        </div>
    </div>
    `;
    document.getElementById('detailsData').innerHTML = container;
    const backgroundPhoto = data.thumbnail.replace('thumbnail', 'background');
    document.body.style.backgroundImage = `url(${backgroundPhoto})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
}
