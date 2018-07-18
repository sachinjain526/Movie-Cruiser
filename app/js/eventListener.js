var jQuery = require('jquery');
import { getFullMovieDetails, saveDataTOJsonSever } from './apiDataServices'
import { createMovieDetail } from './createListAndCollection'
import { baseUrl } from './keysAndApiPath'
function eventListener() {
    jQuery(document).on("click", ".collectionButton", function () {
        var movieId = jQuery(this).attr("movieId");
        getFullMovieDetails(movieId, addCollection);

    });
    jQuery(document).on("click", ".movieContainer", function () {
        var movieId = jQuery(this).attr("id");
        getFullMovieDetails(movieId, showMovieDetails);

    });

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
function updateCollectionList(msg) {
    console.log(msg);
}
function showMovieDetails(data) {
    createMovieDetail("movieDetail", data);
}
export { eventListener };