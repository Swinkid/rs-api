'use strict';

var request = require('./../../util/request'),
    Promise = require('promise');

function Events(username, config) {

    /**
     * Gets a players recent events
     *
     */
    this.lookup = function() {
        return new Promise(function(resolve, reject) {
            request.rss(config.urls.adventures + encodeURIComponent(username)).then(function(data) {
                data.username = username;
                resolve(data);
            }).catch(reject);
        });
    };
}

module.exports = Events;