var jQuery = require('jquery');
import { posterPath, collectionType } from './keysAndApiPath';

function createTopMoviesList(containerId, movieData) {
    let showTopMoviesHtml = "";
    if (movieData.results) {
        movieData.results.map(movieRecod => {
            showTopMoviesHtml += `
            <div class=" col-md-2 p-1 movieContainer" id= ${movieRecod.id} movieListId="${movieRecod.id}">
                <img src="${posterPath + movieRecod.poster_path}" alt="${movieRecod.original_title}" class="img-thumbnail rounded movieImage">
                <div class="buttom-panel text-center mt-1">
                    <button type="button" class="collectionButton btn btn-success" movieId="${movieRecod.id}">Add To Collection</button>
                </div>
            </div>`
        });
    }
    jQuery("#" + containerId).append(showTopMoviesHtml);
}
function openModelPopup(data) {
    jQuery("body").append(
        `<div class="modal fade modalDetailContainer" id="${data.id}-popup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content bg-danger">
                    <div class="modal-header">
                        <span>
                        ${data.modalHeader}
                        </span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body ">
                        ${data.modalBody}
                    </div>
                </div>
            </div>
        </div>`);
    jQuery("#" + data.id + "-popup").modal('show');
}
function createMovieDetail(movieDetailData, openPopup, EnableCollectionPane) {
    var collectionList = "";
    jQuery.each(collectionType, function (index, value) {
        collectionList += '<option value="' + value + '">' + value + '</option>';
    });
    let modalHeader = `<a href="/movie/363088-ant-man-and-the-wasp">
                    <h2 class="d-inline-block">${movieDetailData.title}</h2>
                </a>
                <span class="release_date font-weight-bold">${movieDetailData.release_date.split("-")[0]}</span>`
    let modalBody = ` <div class="d-flex">
    <div class="col-4 poster-wraper">
        <img src="${posterPath + movieDetailData.poster_path}" alt="${movieDetailData.title}" class="img-thumbnail rounded">
    </div>
  <div class="col-8">
     <ul class="nav text-center small">
        <li class="chart">
           <div class="d-inline-block text-dark font-weight-bold">
              <cite id="movieRating">${movieDetailData.vote_average}</cite>
              <span class="fas fa-star"></span>
              <span class="d-block">User Score</span>
           </div>
        </li>
        <li class="nav-item ${EnableCollectionPane ? "" : "d-none"}" title="Add To Collection" data-role="tooltip">
           <a id="addToCollectionBtn" class="nav-link" href="#">Add To Collection</a>
        </li>
        <li class="nav-item ${movieDetailData.faviroiteFlag ? "" : "d-none"}" title="Add To Collection" data-role="tooltip">
           <a id="removeTOCollectionBtn" class="nav-link" href="#" collectionName="${movieDetailData.collectionName}">Remove From Collection</a>
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

           <div id="addToCollectionSection" class="text-center p-2 ${!EnableCollectionPane ? "" : "d-none"}">
                <h5 class="text-dark p-2 ">Select collection name to add this movie</h5>
                <div class="input-group mb-3">
                    <select class="custom-select" id="CollSelection" movieId="${movieDetailData.id}">
                         ${collectionList}
                     </select>
                    <div class="input-group-append">
                        <button class="btn btn-secondary"  id="collButton">Add To Collection</button>
                    </div>
                </div>
            </div>
        </div>
     </div>`
    if (openPopup) {
        openModelPopup({ "id": movieDetailData.id, modalHeader, modalBody })
    }
}
function CreateUserCollection(containerId, response, appendFlag) {
    let userCollectionHtml = ""
    jQuery.each(response, function (ind, resData) {
        let containerId = resData.id;
        if (resData.data && resData.data.length) {
            userCollectionHtml += `<div class="col-md-2 p-1">
            <div id="${containerId}-Container" class="text-center carousel slide carousel-fade" data-ride="carousel">
                <div class="carousel-inner">`
            jQuery.each(resData.data, function (index, value) {
                userCollectionHtml += `<div class="carousel-item ${index ? "" : "active"}" id="${value.id}-${containerId}" movieListId="${value.id}">
                <img src="${posterPath + value.poster_path}" alt="${value.original_title}" class="img-thumbnail rounded collectionMovieImage" collectionName="${containerId}">
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
        </div>
        <button class="btn btn-danger px-5 userColloctionBtn" type="button" id="user${containerId}Btn"> ${containerId}</button>
        </div>
        `
        }
    });
    if (appendFlag) {
        jQuery("#" + containerId).append(userCollectionHtml);
    } else {
        jQuery("#" + containerId).html(userCollectionHtml);
    }

}
function addMovieToCollectionHtml(collectionName, value) {
    jQuery("#" + collectionName + "-Container").find(".carousel-inner").prepend(
        ` <div class="carousel-item" id="${value.id}-${containerId}" movieListId="${value.id}">
                <img src="${posterPath + value.poster_path}" alt="${value.original_title}" class="img-thumbnail rounded collectionMovieImage" collectionName="${containerId}">
                </div>`
    );
}
function removeMovieFromUserColl(data) {
    jQuery("#" + data.movieId + "-" + data.collectionName).remove();
    if (!jQuery("#" + data.collectionName + "-Container").find(".carousel-item").length) {
        jQuery("#" + data.collectionName + "-Container").parent().remove();
    }
}
export { createTopMoviesList, createMovieDetail, CreateUserCollection, addMovieToCollectionHtml, removeMovieFromUserColl };