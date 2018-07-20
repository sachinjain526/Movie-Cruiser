var jQuery = require('jquery');
import { getFullMovieDetails, getMovieRecords, getUserCollection, saveDataTOJsonSever, getSearchedMovie } from './apiDataServices'
import { createMovieDetail, createTopMoviesList, CreateUserCollection, addMovieToCollectionHtml } from './createListAndCollection'
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
        getFullMovieDetails(movieId, showMovieDetailWithEnabledCollPane);

    });
    jQuery(document).on("click", ".movieImage", function () {
        const movieId = jQuery(this).parent().attr("id");
        getFullMovieDetails(movieId, showMovieDetailsPopup);

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
    jQuery(document).on("click", "#closeModal", function () {
        const modalId = jQuery(this).parents(".modal").attr("id");
        jQuery('#' + modalId).on('hidden.bs.modal', function (e) {
            jQuery(this).remove();
        });
    });
    jQuery(document).on("click", "#collButton", function () {
        const movieId = jQuery("#CollSelection").attr("movieId");
        const collectionName = jQuery("#CollSelection").val();
        getFullMovieDetails(movieId, addCollection, collectionName);
        jQuery("#closeModal").trigger("click");
    });
    jQuery(document).on("click", "#addToCollectionBtn", function () {
        jQuery("#addToCollectionSection").removeClass("d-none");
        jQuery(this).addClass("d-none");

    });

}
// call back and basic functions
function showTopMovies(data) {
    createTopMoviesList("topMoviesContainer", data);
}
function showSearchedMovies(data) {
    createTopMoviesList("searchMoviesContainer", data);
}
function showMovieDetailWithEnabledCollPane(data) {
    createMovieDetail(data, true, false);//movieDetailData, openPopup:true/returnData:false, EnableCollectionPane
}
function addCollection(data, collectionName) {
    var saveData = {
        id: data.id,
        original_language: data.original_language,
        overview: data.overview,
        poster_path: data.poster_path,
        release_date: data.release_date,
        title: data.title,
        vote_average: data.vote_average
    };
    saveDataTOJsonSever(collectionName, saveData, updateCollectionList)
}
function updateCollectionList(data, collectionName) {
    if (jQuery("#" + collectionName + "-Container").length) {
        addMovieToCollectionHtml(collectionName, data);
    }
    else {
        const resData = { "id": collectionName, "data": [data] }
        CreateUserCollection("userCollectionContainer", [resData], true);
    }

}
function constructMovieCollection(data) {
    CreateUserCollection("userCollectionContainer", data);
}
function showMovieDetailsPopup(data) {
    createMovieDetail(data, true, true);
}
export { eventListener, movieOnload };