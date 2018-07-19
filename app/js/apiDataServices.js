let headerJson = { method: "get", "Access-Control-Allow-Origin": "*", mode: "cors", "Content-Type": "application/json" };
var jQuery = require('jquery');
import { movieDetailPath, apiKey, baseUrl, collectionType } from './keysAndApiPath';
import { resolve } from 'url';
import { rejects } from 'assert';
function getMovieRecords(pagN0, callback) {
    fetchDatFromApi(`https://api.themoviedb.org/3/discover/movie${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pagN0}`, callback);
}
// common method
function fetchDatFromApi(url, callback, collectionName) {
    fetch(url, headerJson).then(function (response) {
        // Examine the text in the response
        response.json().then(function (data) {
            console.log(data);
            if (collectionName) {
                callback(data, collectionName);
            } else {
                callback(data);
            }
        });
    });
}
// get full Movie detail
function getFullMovieDetails(MovieRefId, showMovieDetails, collectionName) {
    const url = movieDetailPath + MovieRefId + apiKey;
    fetchDatFromApi(url, showMovieDetails, collectionName);
}
function getCollectionTypes() {
    fetchDatFromApi('https://api.themoviedb.org/3/genre/movie/list?api_key=e423c3150a1dbc6ec70f9322a432eb28&language=en-US', getGenreMovieList);
}
function getSearchedMovie(movieName, pageNumber, callback) {
    fetchDatFromApi(`https://api.themoviedb.org/3/search/movie?api_key=7520477c96fad381a44633a2b7596a01&language=en-US&query=${movieName}&page=${pageNumber}&include_adult=false`, callback);
}
// saving data to collection
function saveDataTOJsonSever(collectionName, passData, callback) {
    jQuery.ajax({
        url: baseUrl + collectionName,
        method: "POST",
        data: passData,
        dataType: "json"
    }).done(function (resData) {
        callback(resData, collectionName);
    }).fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });
}
function getUserCollection(callback) {
    var promises = []
    jQuery.each(collectionType, function (index, value) {
        promises.push(new Promise(function (resolve, reject) {// Fill the array with promises which initiate some async work
            jQuery.ajax({
                url: baseUrl + value,
                method: "get",
                dataType: "json"
            }).done(function (ResData) {
                resolve({ "id": value, "data": ResData });
            }).fail(function (jqXHR, textStatus) {
                reject("Request failed: " + textStatus);
            });
        }));
    });
    Promise.all(promises).then(function (allResData) {
        callback(allResData);
    })
        .catch(function (err) {
            console.log(err);
        });
}
export { getMovieRecords, getFullMovieDetails, saveDataTOJsonSever, getUserCollection, getSearchedMovie };