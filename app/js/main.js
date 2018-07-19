var jQuery = require('jquery');
import 'popper.js';
import 'bootstrap';
require("../scss/main.scss");
// local file import
import { eventListener, movieOnload } from './eventListener';

jQuery(document).ready(function () {
  console.log('app initialized');
  eventListener();
  movieOnload();


})





