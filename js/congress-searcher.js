(function(window) {
    var $ = window.jQuery;

    var CongressSearcher = function(searchFormEl, searchInputEl, resultsEl) {
        this.apiKey = 'YOUR SUNLIGHT API KEY'; //http://sunlightfoundation.com/api/
        this.apiBase = 'http://congress.api.sunlightfoundation.com';
        this.apiLocateLegislators = '/legislators/locate';
        this.searchFormEl = searchFormEl;
        this.searchInputEl = searchInputEl;
        this.resultsEl = resultsEl;
    };

    CongressSearcher.prototype.init = function() {
        /*
            Uncomment _init_geolocation() if you want to
            rely on geolocation (when available) to grab location
            information.  At this point we're not doing
            anything with this.  Eventually we may invoke this via
            a checkbox or something.  It's really here for
            illustration purposes.
        */
        //this._init_geolocation();
        this._init_events();
    };

    CongressSearcher.prototype.search = function(url) {
        var self = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data, textStatus, xhr) {
                var results = [];
                $.each(data.results, function(index, value){
                    //Personal
                    var title = value.title;
                    var name = title + '. ' + value.first_name + ' ' + value.last_name;

                    //Social
                    var facebook_id = value.facebook_id;
                    var facebook_link = '<a href="http://facebook.com/' + facebook_id + '">Facebook</a>';
                    var twitter_id = value.twitter_id;
                    var twitter_link = '<a href="http://twitter.com/' + twitter_id + '">Twitter - @' + twitter_id + '</a>';
                    var youtube_id = value.youtube_id;
                    var youtube_link = '<a href="http://youtube.com/' + youtube_id + '">YouTube</a>';

                    //Party
                    var chamber = value.chamber;
                    var party = value.party;

                    //Contact
                    var website = value.website;
                    var website_link = '<a href="' + website + '">' + website + '</a>';
                    var phone = value.phone;
                    var contact_form = value.contact_form;
                    var contact_form_link = '<a href="' + contact_form + '">Contact Form</a>';

                    var member = '<div class="member">' +
                                     '<h5>' + name + ' (' + party + ')</h5>' +
                                     '<ul>' +
                                         '<li>Phone: ' + phone  + '</li>' +
                                         '<li>' + website_link + '</li>' +
                                         '<li>' + contact_form_link + '</li>' +
                                         '<li>' + facebook_link + '</li>' +
                                         '<li>' + twitter_link + '</li>' +
                                         '<li>' + youtube_link + '</li>' +
                                     '</ul>' +
                                 '</div>';
                    results.push(member);
                });
                self.resultsEl.html(results.join(''));
            }
        });
    };

    CongressSearcher.prototype.geolocation_enabled = function() {
        return 'geolocation' in navigator;
    };

    CongressSearcher.prototype.geolocation_error = function() {};

    CongressSearcher.prototype.geolocation_success = function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var url = this.apiBase + this.apiLocateLegislators + '?latitude=' + latitude + '&longitude=' + longitude + '&apikey=' + this.apiKey;
        this.search(url);
    };

    CongressSearcher.prototype._init_events = function() {
        var self = this;
        self.searchFormEl.on('submit', function(e){
            var zip = self.searchInputEl.val();
            var url = self.apiBase + self.apiLocateLegislators + '?zip=' + zip + '&apikey=' + self.apiKey;
            self.search(url);
            return false;
        });
    };

    CongressSearcher.prototype._init_geolocation = function() {
        var self = this;
        if(self.geolocation_enabled()) {
            var self = this;
            var success = function(position) {
                self.geolocation_success(position);
            };
            var error = function(msg) {
                self.geolocation_error(msg);
            };
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };

    var searchEls = $('[data-action=congress-search]');
    searchEls.each(function(index) {
        var searchFormEl = $('<form class="congress-search">');
        var searchInputEl = $('<input type="text" placeholder="Your Zip Code">');
        var searchButtonEl = $('<input type="submit" value="Search">');
        searchFormEl.append(searchInputEl).append(searchButtonEl);
        var resultsEl = $('<div class="congress-search-results">');
        $(this).append(searchFormEl).append(resultsEl);
        new CongressSearcher(searchFormEl, searchInputEl, resultsEl).init();
    });
}).call(this, window);
