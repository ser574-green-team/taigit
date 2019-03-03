"use strict";
exports.__esModule = true;
var request = require("request");
/**
 * The following program will checkout github pull requests of a particular
 * user from a particular repo.
 */
//https://api.github.com/users/ansamant
var getPullReqs = /** @class */ (function () {
    function getPullReqs() {
    }
    getPullReqs.prototype.getpull = function (userName, repoName) {
        request.get('https://api.github.com/repos/' + userName + repoName + '/pulls?state=all', function (response) {
            console.log(response);
        });
    };
    return getPullReqs;
}());
