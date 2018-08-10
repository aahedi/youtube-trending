/**
 * Rsspond RSS Feed Plugin
 * Version 1.0
 * Author: Brian Kelley
 * Tested with:
 * http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml
 * http://jquery-plugins.net/rss
 * http://rss.cnn.com/rss/cnn_topstories.rss
**/

(function() {
    var Rsspond;

    Rsspond = (function() {
        function Rsspond(params) {
            var option, value;
            this.options = {
                selector: '.js-rsspond',
                url: '',
                descLimit: false,
                descFunc: null,
                newWindow: true, 
                logData: false,       
                maxCount: 10,
                dateFormat: 'm dd, YY tt',
                periodDay: 'am',
                periodNight: 'pm',
                itemTemplate: '<li><h3>{{title}}</h3><h4>{{creator}}</h4><h6>{{date}}</h6><p>{{description}}</p><a href="{{link}}">Read More</a></li>'
            };

            // Extend Options        
            if (typeof params === 'object') {
                for (option in params) {
                    value = params[option];
                    this.options[option] = value;
                }
            }

            // Plugin Variables
            this.months = [];
            this.itemTemplate = this.options.newWindow ? this.options.itemTemplate.replace("<a", "<a target='_blank'") : this.options.itemTemplate;

            // Extended Variables
            this.handler = document.querySelector(this.options.selector);
            this.query = 'SELECT channel.item FROM feednormalizer WHERE output="rss_2.0" AND url ="' + this.options.url + '" LIMIT ' + this.options.maxCount;
            this.feedUrl = "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(this.query) + "&format=json&diagnostics=false";
        }

        Rsspond.prototype.init = function  () {
            var self = this,
                xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"),
                data;

            xhr.open("GET", this.feedUrl, true);

            xhr.onload = function() {
                switch (xhr.status) {
                    case 200:                  
                        data = JSON.parse(xhr.responseText);     

                        data.query.results.rss ? self.loopEntries( data.query.results.rss ) : console.log("No RSS results were found");         
                        
                        break;
                    case 400:
                        console.log('There was an error retrieving the RSS feed.');

                        break;
                    default:
                        console.log('Your feed was retrieved, but there was an error displaying it.');
                }
            };

            if (this.options.url !== '' && this.handler !== null ) {
                xhr.send();
            }            
        };

        Rsspond.prototype.loopEntries = function ( list ) {
            var self = this,
                handler = self.handler,
                outputString;

            for(var i = 0; i < list.length; i++){
                var d = list[i].channel.item;
                    itemOutput = self.itemTemplate;

                self.options.logData ? console.log(d) : false;

                outputString = self.replaceTemplate( itemOutput, d);   

                handler.insertAdjacentHTML( 'beforeend', outputString );
            }
        };

        Rsspond.prototype.stripTags = function ( el ) {            
            return el.replace(/<(?:.|\n)*?>/gm, '');
        };

        Rsspond.prototype.testTemplate = function ( pattern ) {
            return pattern.test(this.options.dateFormat);
        };

        Rsspond.prototype.formatDate = function ( date ) {
            var postDate = new Date( date ),
                dateTemplate = this.options.dateFormat,
                year = postDate.getFullYear().toString(),
                month = postDate.getMonth(),
                day = postDate.getDate(),
                hours = postDate.getHours().toString(),
                minutes = postDate.getMinutes().toString().length <=1 ? '0' + postDate.getMinutes().toString() : postDate.getMinutes().toString(),
                period = (hours >= 12) ? this.options.periodNight : this.options.periodDay,
                partial,
                revDay;

            this.months.push("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

            // Year
            switch(true) {
                case this.testTemplate(/\byy\b/):
                    dateTemplate = dateTemplate.replace(/\byy\b/, year.substring(2));
                    break;
                case this.testTemplate(/\bYY\b/):
                    dateTemplate = dateTemplate.replace(/\bYY\b/, year);
                    break;
            }

            // Month
            switch(true) {
                case this.testTemplate(/\bm\b/):
                    dateTemplate = dateTemplate.replace(/\bm\b/, this.months[month] );
                    break;
                case this.testTemplate(/\bMM\b/):
                    dateTemplate = dateTemplate.replace(/\bMM\b/, month + 1);
                    break;
                case this.testTemplate(/\bM\b/):
                    dateTemplate = dateTemplate.replace(/\bM\b/, this.months[month].slice(0,3) );
                    break;
            }

            // Day
            switch(true) {
                case this.testTemplate(/\bdd\b/):
                    dateTemplate = dateTemplate.replace(/\bdd\b/, this.getOrdinal(day) );
                    break;
                case this.testTemplate(/\bDD\b/):
                    revDay = day.length <= 1 ? '0' + (revDay + 1).toString() : day.toString();
                    dateTemplate = dateTemplate.replace(/\bDD\b/, revDay );
                    break;
            }

            // Time
            switch(true) {
                case this.testTemplate(/\btt\b/):
                    if (hours > 12) {
                        hours = hours - 12;
                    }

                    dateTemplate = dateTemplate.replace(/\btt\b/, hours + ":" + minutes + period);
                    break;
                case this.testTemplate(/\bTT\b/):
                    dateTemplate = dateTemplate.replace(/\bTT\b/, hours + ":" + minutes);
                    break;
            }

            return dateTemplate;
        };

        Rsspond.prototype.replaceTemplate = function(template, data) {
            var self = this,
                output, pattern, ref, key, value, desc, newValue;
            
            pattern = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/;
            output = template;

            while (pattern.test(output)) {
                key = output.match(pattern)[1];

                value = (ref = this.getObjectProperty(data, key)) != null ? ref : '';

                if (key == 'date' && self.dateFormat !== '') {
                    value = self.formatDate( value );
                }

                if (key == 'description') {

                    desc = typeof value !== 'string' ? self.locateString(value) : value;

                    newValue = self.stripTags( desc );  

                    if (self.options.descFunc) {
                        newValue = self.options.descFunc( newValue );
                    }   

                    value = newValue;
                } else if (typeof value == 'object') {
                    value = self.locateString(value);
                }

                output = output.replace(pattern, function() {
                    return "" + value;
                });
            }

            return output;
        };

        Rsspond.prototype.getObjectProperty = function( object, property ) {
            var piece, pieces;
            property = property.replace(/\[(\w+)\]/g, '.$1');
            pieces = property.split('.');

            while (pieces.length) {
                piece = pieces.shift();

                if ((object != null) && piece in object) {
                  object = object[piece];
                } else {
                return null;
            }
          }

          return object;
        };

        Rsspond.prototype.locateString = function ( arr ) {
            for (var i = 0; i < arr.length; i++) {
                if (typeof arr[i] == 'string') {
                    return arr[i];
                    break;
                }
            }
        };

        Rsspond.prototype.getOrdinal = function ( number ) {
            var suffix = ["th","st","nd","rd"],
            
            v = number % 100;

            return number + ( suffix[ (v-20) % 10 ] || suffix[v] || suffix[0] );
        };   

        return Rsspond;

    })();

    (function(root, factory) {
        if (typeof define === 'function' && define.amd) {
            return define([], factory);
        } else if (typeof module === 'object' && module.exports) {
            return module.exports = factory();
        } else {
            return root.Rsspond = factory();
        }
    })(this, function() {
        return Rsspond;
    });

}).call(this);
