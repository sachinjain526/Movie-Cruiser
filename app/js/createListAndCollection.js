var jQuery = require('jquery');
import { posterPath } from './keysAndApiPath';

function createTopMoviesList(containerId, movieData) {
    let showTopMoviesHtml = "";
    if (movieData.results) {
        movieData.results.map(movieRecod => {
            showTopMoviesHtml += `<div class="col-2 movieContainer" id= ${movieRecod.id}>
            <img src="${posterPath + movieRecod.poster_path}" alt="${movieRecod.original_title}" class="img-thumbnail rounded">
            <div class="buttom-panel text-center mt-1">
            <button type="button" class="collectionButton btn btn-success" movieId="${movieRecod.id}">Add To Collection</button>
            </div>
            <div class="p-1 m-1 bg-primary text-white">
                <span class="small">Released : ${movieRecod.release_date.split("-")[0]}</span>
                <span class="small">Rating: ${movieRecod.vote_average}</span>
            </div>
            </div>`
        });
    }
    jQuery("#" + containerId).append(showTopMoviesHtml);
}
function createMovieDetail(containerId, movieDetailData) {
    jQuery("body").append(
        `<div class="modal fade movieDetailContainer" id="${movieDetailData.id}-popup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
           <div class="modal-content bg-danger">
              <div class="modal-header">
              <span>
              <a href="/movie/363088-ant-man-and-the-wasp">
                 <h2 class="d-inline-block">${movieDetailData.title}</h2>
              </a>
              <span class="release_date font-weight-bold">${movieDetailData.release_date.split("-")[0]}</span>
           </span>
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
                 </button>
              </div>
              <div class="modal-body d-flex">
              <div class="col-5 poster-wraper">
                 <img src="${posterPath + movieDetailData.poster_path}" alt="${movieDetailData.title}" class="img-thumbnail rounded">
              </div>
              <div class="col-7 mt-5">
                 <ul class="nav text-center">
                    <li class="chart mr-2">
                       <div class="d-inline-block text-dark font-weight-bold">
                          <cite id="movieRating">${movieDetailData.vote_average}</cite>
                          <span class="fas fa-star"></span>
                          <span class="d-block">User Score</span>
                       </div>
                    </li>
                    <li class="nav-item mr-2" title="Add to list" data-role="tooltip">
                       <a class="nav-link" href="#">
                       <span class="fas fa-align-justify"></span>
                       </a>
                    </li>
                    <li class="nav-item mr-2" title="Mark as Favourite" data-role="tooltip">
                       <a id="favourite" class="nav-link" href="#">
                       <span class="fas fa-heart"></span>
                       </a>
                    </li>
                    <li class="nav-item mr-2" title="Add to your collection" data-role="tooltip"  movieId="${movieDetailData.id}">
                       <a id="watchlist" class="nav-link" href="#">
                       <span class="fas fa-bookmark"></span>
                       </a>
                    </li>
                    <li class="nav-item mr-2" title="Rate it!" data-role="tooltip">
                       <a id="rate_it" class="nav-link" href="#">
                       <span class="fas fa-star"></span>
                       </a>
                    </li>
                    <li class="video nav-item ">
                       <a class="nav-link play_trailer" href="#" data-id="8_rTIAOohas">
                       <span>
                       <i class="fas fa-play"></i>
                       Play Trailer</span>
                       </a>
                    </li>
                 </ul>
                 <div class="mt-2">
                    <h3  class="text-success font-weight-bold">Overview</h3>
                    <div class="overview lead" id="movieOverview">
                       <p class="text-white">${movieDetailData.overview}"</p>
                    </div>
                 </div>
                 </div>
              </div>
           </div>
        </div>`);
    jQuery("#" + movieDetailData.id + "-popup").modal('show');
}
function CreateUserCollection(ResData) {

}
export { createTopMoviesList, createMovieDetail };