"use strict";

var model = require("./model.js");

module.exports.query = query;

function query(req, res) {
    model.load(req.params.entity, function(entities) {
        if(req.query.filter){
            req.query.filter = JSON.parse(req.query.filter);
        }
        console.log(req.query);
        for(var key in req.query.filter) {            
            entities = entities.filter(function(obj) {
                if(obj[key] !== undefined) {
                    return obj[key].toString().toLowerCase().indexOf(req.query.filter[key].toLowerCase()) > -1;
                }
                return true;
            });
        }
		
		if(req.query.filter) {
			var priceFrom = parseInt(req.query.filter.priceFrom, 10);
			if(priceFrom !== undefined  && !isNaN(priceFrom)) {
				entities = entities.filter(function(obj) {
					return parseInt(obj.price, 10) >= priceFrom;
				});
			}
			var priceTo = parseInt(req.query.filter.priceTo, 10);
			if(priceTo !== undefined && !isNaN(priceTo)) {
				entities = entities.filter(function(obj) {
					return parseInt(obj.price, 10) <= priceTo;
				});
			}
		}
		
		if(req.query.sort) {
            entities = sort(entities, req.query.sort, req.query.sortDirection);
        }
        var count = entities.length;
        entities = pagination(entities, req.query.page, req.query.pageSize);

        res.status(200).json(entities);
    });
}

function sort(array, field, sortDirection) {
    if(sortDirection && sortDirection === 'desc') {
        return array.sort(function(a, b) { return (a[field] > b[field]) ? -1 : ((b[field] > a[field]) ? 1 : 0); });
    } else {
        return array.sort(function(a, b) { return (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0); });
    }
}

function pagination(array, pageNumber, pageSize) {
    pageNumber = pageNumber || 1
    pageSize = pageSize || 50;

    var endIndex = pageSize * pageNumber,
        startIndex = endIndex - pageSize;
    if(endIndex > array.length) {
        return array.slice(startIndex);
    }
    return array.slice(startIndex, endIndex);
}