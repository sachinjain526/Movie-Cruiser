var jQuery = require('jquery');
import { getFullMovieDetails, getMovieRecords, getUserCollection, saveDataTOJsonSever, getSearchedMovie } from './apiDataServices'
import { createMovieDetail, createTopMoviesList } from './createListAndCollection'
import { baseUrl } from './keysAndApiPath'
// onload Event trigger
let movieName = "";
function movieOnload() {
    getMovieRecords(1, showTopMovies);
    getUserCollection(constructMovieCollection);
}

function eventListener() {
    jQuery("#homePage").on("click", "#loadMovie", function () {
        let pagenumber = parseInt(jQuery(this).attr("pagenumber"));
        pagenumber = pagenumber + 1;
        getMovieRecords(pagenumber, showTopMovies);
        jQuery(this).attr("pagenumber", pagenumber);
    });
    jQuery(document).on("click", ".collectionButton", function () {
        const movieId = jQuery(this).attr("movieId");
        getFullMovieDetails(movieId, addCollection);

    });
    jQuery(document).on("click", ".movieContainer", function () {
        const movieId = jQuery(this).attr("id");
        getFullMovieDetails(movieId, showMovieDetails);

    });
    jQuery("nav").on("click", "#movieSearchButton", function () {
        jQuery("#searchMoviesContainer").html("");
        movieName = jQuery("#movieSearchInput").val();
        getSearchedMovie(movieName, 1, showSearchedMovies);
        jQuery("#searchedMovies").removeClass("d-none");

    });
    jQuery("#homePage").on("click", "#loadSearchedMovie", function () {
        let pagenumber = parseInt(jQuery(this).attr("pagenumber"));
        pagenumber = pagenumber + 1;
        getSearchedMovie(movieName, pagenumber, showSearchedMovies);
        jQuery(this).attr("pagenumber", pagenumber);
    });

}
// call back and basic functions
function showTopMovies(data) {
    createTopMoviesList("topMoviesContainer", data);
}
function showSearchedMovies(data) {
    createTopMoviesList("searchMoviesContainer", data);
}
function saveDataToCollection(collectionname) {
    saveDataTOJsonSever(baseUrl + collectionname, data, updateColloctionDom)
}

function addCollection(data) {
    var saveData = {
        id: data.id,
        original_language: data.original_language,
        overview: data.overview,
        poster_path: data.poster_path,
        release_date: data.release_date,
        title: data.title,
        vote_average: data.vote_average
    };
    saveDataTOJsonSever(baseUrl + "Animation", saveData, updateCollectionList)
}
function updateColloctionDom() {

}

function updateCollectionList(msg) {
    console.log(msg);
}
function constructMovieCollection(data) {
    console.log(data);
}
function showMovieDetails(data) {
    createMovieDetail("movieDetail", data);
}
export { eventListener, movieOnload };