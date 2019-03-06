"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
function getNumCommets(owner, repo) {
    return __awaiter(this, void 0, void 0, function () {
        var issue_comment, dict_1, issueNumberArray_2, _i, issueNumberArray_1, isse_no, uniqueId, _a, uniqueId_1, id, commentsPerReq, numberOfpullRequests, averageNumberOfComments, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://api.github.com/repos/" + owner +
                            "/" + repo + "/issues/comments")];
                case 1:
                    issue_comment = _b.sent();
                    dict_1 = {};
                    issueNumberArray_2 = [];
                    issue_comment.data.forEach(function (req) {
                        // console.log(req.issue_url);
                        var issue_number_array = req.issue_url.split('/');
                        var issue_number = issue_number_array[issue_number_array.length - 1];
                        issueNumberArray_2.push(issue_number);
                        //
                        // }
                        // else {
                        //     issueNumberArray.push(issue_number)
                        // }
                        if (dict_1.hasOwnProperty(issue_number)) {
                            dict_1[issue_number] += 1;
                        }
                        else {
                            dict_1[issue_number] = 1;
                        }
                    });
                    for (_i = 0, issueNumberArray_1 = issueNumberArray_2; _i < issueNumberArray_1.length; _i++) {
                        isse_no = issueNumberArray_1[_i];
                        // getNumberCommentsPerPullRequest(owner, repo, isse_no)
                    }
                    issueNumberArray_2.sort();
                    uniqueId = issueNumberArray_2.filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    });
                    // console.log(uniqueId)
                    //  getNumberCommentsPerPullRequest(owner,repo,1);
                    for (_a = 0, uniqueId_1 = uniqueId; _a < uniqueId_1.length; _a++) {
                        id = uniqueId_1[_a];
                        commentsPerReq = getNumberCommentsPerPullRequest(owner, repo, id);
                        if (dict_1.hasOwnProperty(id)) {
                            dict_1[id] += Number(commentsPerReq);
                        }
                    }
                    console.log(dict_1);
                    numberOfpullRequests = Object.keys(dict_1).length;
                    averageNumberOfComments = (Number(numberOfpullRequests) / issue_comment.data.length).toFixed(2);
                    //console.log(issue_comment.data.length)
                    // console.log(averageNumberOfComments)
                    console.log(Number(averageNumberOfComments));
                    return [2 /*return*/, Number(averageNumberOfComments)];
                case 2:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, -1];
            }
        });
    });
}
exports.getNumCommets = getNumCommets;
function getNumberCommentsPerPullRequest(owner, repo, number) {
    return __awaiter(this, void 0, void 0, function () {
        var pullReq_comment, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://api.github.com/repos/" + owner +
                            "/" + repo + "/pulls/" + number + "#/comments")];
                case 1:
                    pullReq_comment = _a.sent();
                    return [2 /*return*/, pullReq_comment.data["comments"]];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [2 /*return*/, -1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getNumberCommentsPerPullRequest = getNumberCommentsPerPullRequest;
getNumCommets("ser574-green-team", "taigit");
