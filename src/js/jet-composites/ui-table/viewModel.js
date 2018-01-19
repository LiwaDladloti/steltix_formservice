/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery'], function (oj, ko, $) {
    'use strict';
    
    function ExampleComponentModel(context) {
        
        
        var self = this;
        self.messageText = ko.observable('Hello from Example Component');
        
        var req = {};
        
        self.callAIS = function() {
            req.token = localStorage.getItem('token'),
            req.deviceName = "aTest",
              req.formName = "P4101_W4101E",
              req.formActions = [{
                  "command":"SetQBEValue",
                    "controlID":"1[123]",
                    "value":"1001"
              },{
                  "command":"DoAction",
                    "controlID":"22"
                }],
              req.aliasNaming = true,
              req.outputType = "VERSION2",
              req.formServiceAction = "R",
              req.bypassFormServiceEREvent = true

             // authenticate with the system by getting a token
             $.ajax({
               url: "http://sandbox921.steltix.com/jderest/v2/formservice", // <<- JD Edwards API token service
               type: 'post', // <<- the method that we using
               data: JSON.stringify(req), // <<- JSON of our request obj
               contentType: 'application/json', // <<- telling server how we are going to communicate
               fail: function(xhr, textStatus, errorThrown) {

                 console.log(errorThrown, textStatus, xhr); //  <<- log any http errors to the console

               }
             }).done(function(data, textStatus, xhr) {
                 console.log(data.fs_P4101_W4101E.data.gridData.rowset);
             });

           };
        this.callAIS();

        }
    return ExampleComponentModel;
    });