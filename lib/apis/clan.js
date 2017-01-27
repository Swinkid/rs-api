'use strict';

var request = require('../util/request'),
    Promise = require('promise');

/**
 * Module containing Clan functions
 * @module Clan
 */
function Clan(config) {

    //Read the clans data from a csv to an array object
    var readClan = function(data) {
        var members = [],
            space = new RegExp(String.fromCharCode(65533), 'g');

        for (var i = 1; i < data.length; i++) {
            var member = data[i];
            members.push({
                player: member[0].replace(space, ' '),
                rank: member[1],
                exp: Number(member[2]),
                kills: Number(member[3])
            });
        }

        return members;
    };

    /**
     * Get a clans member list with exp gained and total kills (available for `rs`)
     * @param  name The clans name
     * @returns {Object} Member list
     * @example
     * api.rs.hiscores.clan('Efficiency Experts').then(function(clan) {
     *   console.log(clan);
     * }).catch(console.error);
     */
    this.members = function(name) {
        return new Promise(function(resolve, reject) {
            if (typeof config.urls.members === 'undefined') {
                reject(new Error('Oldschool RuneScape does not have clans.'));
                return;
            }

            request.csv(config.urls.members + encodeURIComponent(name)).then(function(data) {
                resolve(readClan(data));
            }).catch(reject);
        });
    };
}

module.exports = Clan;