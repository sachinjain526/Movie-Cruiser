var jQuery = require('jQuery');
import 'popper.js';
import 'bootstrap';
require("../scss/main.scss");
// local file import
import { getMovieRecords } from './apiDataServices';
import { createTopMoviesList } from './createListAndCollection';
import { eventListener } from './eventListener';
import { baseUrl } from './keysAndApiPath';

function showTopMovies(data) {
  createTopMoviesList("topMoviesContainer", data);
}

function showMovieDetail(movieDetails) {

}
function saveDataToCollection(collectionname) {
  saveDataTOJsonSever(baseUrl + collectionname, data, updateColloctionDom)
}
function updateColloctionDom() {

}
function localEventListener() {
  eventListener();
  jQuery("#homePage").on("click", "#loadMovie", function () {
    var pagenumber = parseInt(jQuery(this).attr("pagenumber"));
    pagenumber = pagenumber + 1;
    getMovieRecords(pagenumber, showTopMovies);
    jQuery(this).attr("pagenumber", pagenumber);
  });
}
jQuery(document).ready(function () {
  console.log('app initialized');
  getMovieRecords(1, showTopMovies);
  localEventListener();

})





