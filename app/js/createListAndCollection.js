var jQuery = require('jquery');
import { posterPath, collectionType } from './keysAndApiPath';

function createTopMoviesList(containerId, movieData) {
    let showTopMoviesHtml = "";
    if (movieData.results) {
        movieData.results.map(movieRecod => {
            showTopMoviesHtml += `<div class="col-2 p-1 movieContainer" id= ${movieRecod.id}>
            <img src="${posterPath + movieRecod.poster_path}" alt="${movieRecod.original_title}" class="img-thumbnail rounded movieImage">
           
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
function createMovieDetail(containerId, showList, movieDetailData) {
    var collectionList = "";
    if (!showList) {
        jQuery.each(collectionType, function (index, value) {
            collectionList += '<li class="nav-item px-3 rounded m-1 bg-dark addMovieCollectionItem" collectionname="' + value + '"><a class="nav-link active" href="#">' + value + '</a></li>';
        });
    }
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
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeModal">
                 <span aria-hidden="true">&times;</span>
                 </button>
              </div>
              <div class="modal-body d-flex">
              <div class="col-3 poster-wraper">
                 <img src="${posterPath + movieDetailData.poster_path}" alt="${movieDetailData.title}" class="img-thumbnail rounded">
              </div>
              <div class="col-9">
                 <ul class="nav text-center small">
                    <li class="chart mr-2">
                       <div class="d-inline-block text-dark font-weight-bold">
                          <cite id="movieRating">${movieDetailData.vote_average}</cite>
                          <span class="fas fa-star"></span>
                          <span class="d-block">User Score</span>
                       </div>
                    </li>
                    <!--<li class="nav-item mr-2" title="Add to list" data-role="tooltip">
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
                    </li>-->
                    <li class="nav-item mr-2 ${showList ? "" : "d-none"}" title="Rate it!" data-role="tooltip">
                       <a id="rate_it" class="nav-link" href="#">Add To Collection</a>
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
                       <p class="text-white small">${movieDetailData.overview}"</p>
                    </div>
                    
                 </div>
                 </div>
              </div>
              <div id="addToCollectionSection" class="bg-white p-2 ${!showList ? "" : "d-none"}">
                    <h4 class="text-dark bg-danger p-2 text-center">Click on collection name to add this movie</h4>
                     <ul class="nav" id="collectionList" movieid="${movieDetailData.id}>
                        ${collectionList}
                    </ul>
                 </div>
           </div>
        </div>`);
    jQuery("#" + movieDetailData.id + "-popup").modal('show');
}
function CreateUserCollection(containerId, response) {
    let userCollectionHtml = ""
    jQuery.each(response, function (ind, resData) {
        let containerId = resData.id;
        if (resData.data && resData.data.length) {
            userCollectionHtml += `<div id="${containerId}-Container" class="col-2 p-1 carousel slide carousel-fade" data-ride="carousel">
                <div class="carousel-inner">`
            jQuery.each(resData.data, function (index, value) {
                userCollectionHtml += `<div class="carousel-item ${index ? "" : "active"}" id="${value.id}">
                <img src="${posterPath + value.poster_path}" alt="${value.original_title}" class="img-thumbnail rounded">
                </div>`
            })
            userCollectionHtml += `</div>
            <a class="carousel-control-prev" href="#${containerId}-Container" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#${containerId}-Container" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>`
        }
    });
    jQuery("#" + containerId).html(userCollectionHtml);
}
function addMovieToCollectionHtml(collectionName, value) {
    jQuery("#" + collectionName).find("carousel-inner").prepend(
        `<div class="carousel-item id="${value.id}">
        <img src="${posterPath + value.poster_path}" alt="${value.original_title}" class="img-thumbnail rounded">
    </div>`);
}
export { createTopMoviesList, createMovieDetail, CreateUserCollection, addMovieToCollectionHtml };