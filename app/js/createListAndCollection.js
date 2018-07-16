var jQuery = require('jQuery');
import { posterPath } from './keysAndApiPath';

function createTopMoviesList(containerId, movieData) {
    let showTopMoviesHtml = "";
    movieData.results.map(movieRecod => {
        showTopMoviesHtml += `<div class="col-2 movieContainer" id= ${movieRecod.id}>
      <img src="${posterPath + movieRecod.poster_path}" alt="${movieRecod.original_title}" class="img-thumbnail rounded">
      <div class="buttom-panel text-center mt-1">
      <button type="button" class="collectionButton btn btn-success" movieId="${movieRecod.id}">Add To Collection</button>
       </div>
      <div class="p-1 m-1 bg-primary text-white">
        <span class="small">Released : ${movieRecod.release_date.split("-")[0]}</span>
        <span class="small">Rating: ${movieRecod.rating}</span>
      </div>
      </div>`
    });
    jQuery("#" + containerId).append(showTopMoviesHtml);
}
function createMovieDetail(containerId, movieDetailData) {
    jQuery("#" + containerId).html(

        ` <div class="movieDetailContainer row" id=${movieDetailData.id}>
               <div class="poster-wraper col-3 m-3">
<img src="${posterPath + movieDetailData.poster_path}" alt="${movieDetailData.title}" class="img-thumbnail rounded">
</div>
<div class="col-8 mt-5 mx-2">
<div class="header_poster_wrapper">
    <span>
        <a href="/movie/363088-ant-man-and-the-wasp">
            <h2 class="d-inline-block">${movieDetailData.title}</h2>
        </a>
        <span class="release_date font-weight-bold">${movieDetailData.release_date.split("-")[0]}</span>
    </span>
</div>
<ul class="nav text-center">
    <li class="chart mr-2">
        <div class="d-inline-block">
            <cite id="movieRating">${movieDetailData.vote_average}</cite>
            <span class="fas fa-star"></span>
            <span class="d-block">User Score</span>
        </div>
    </li>
    <li class="nav-item mx-2" title="Add to list" data-role="tooltip">
        <a class="nav-link" href="#">
            <span class="fas fa-align-justify"></span>
        </a>
    </li>
    <li class="nav-item mx-2" title="Mark as Favourite" data-role="tooltip">
        <a id="favourite" class="nav-link" href="#">
            <span class="fas fa-heart"></span>
        </a>
    </li>
    <li class="nav-item mx-2" title="Add to your collection" data-role="tooltip"  movieId="${movieDetailData.id}">
        <a id="watchlist" class="nav-link" href="#">
            <span class="fas fa-bookmark"></span>
        </a>
    </li>
    <li class="nav-item mx-2" title="Rate it!" data-role="tooltip">
        <a id="rate_it" class="nav-link" href="#">
            <span class="fas fa-star"></span>
        </a>
    </li>
    <li class="video nav-item mx-2">
        <a class="nav-link play_trailer" href="#" data-id="8_rTIAOohas">
            <span>
                <i class="fas fa-play"></i>
                Play Trailer</span>
        </a>
    </li>
</ul>
<div class="mt-2">
    <h3 dir="auto">Overview</h3>
    <div class="overview lead" id="movieOverview">
        <p> movieId="${movieDetailData.overview}"</p>
    </div>
</div>
</div> </div>`);
}
export { createTopMoviesList, createMovieDetail };