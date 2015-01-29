'use strict';

var _ = require('lodash');
var Document = require('./document.model');
var fs = require('fs');
var config = require('../../config/environment');
var path = require('path');

// Get list of documents
exports.index = function(req, res) {
  Document.find(function (err, documents) {
    if(err) { return handleError(res, err); }
    return res.json(200, documents);
  });
};

// Get a single document
exports.show = function(req, res) {
  Document.findById(req.params.id, function (err, document) {
    if(err) { return handleError(res, err); }
    if(!document) { return res.send(404); }
    return res.json(document);
  });
};

// Creates a new document in the DB and store the file into storage.
exports.create = function(req, res) {
  if (req.files.file) {
    var file = req.files.file;
    var storagePath = path.join(config.storage.fs.root, file.name);
    console.log(storagePath);
    fs.rename(file.path, storagePath, function(err) {
      if (err) {
        return res.send(500);
      }
      Document.create({name:file.name}, function(err, document) {
        if(err) { return handleError(res, err); }
        return res.json(201, document);
      });
    })
  }

};

// Updates an existing document in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Document.findById(req.params.id, function (err, document) {
    if (err) { return handleError(res, err); }
    if(!document) { return res.send(404); }
    var updated = _.merge(document, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, document);
    });
  });
};

// Deletes a document from the DB.
exports.destroy = function(req, res) {
  Document.findById(req.params.id, function (err, document) {
    if(err) { return handleError(res, err); }
    if(!document) { return res.send(404); }
    document.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}