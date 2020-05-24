function loadData() {

    // remove resultset if this has already been run
    $('#gameoutput .gameoutput').remove();
    // add spinner to indicate something is happening
    $('<i class="fa fa-refresh fa-spin"/>').appendTo('body');

    // get search term from input
    var game = $('#gamename').val().replace(/ /g, '+'); //remove those blasted spaces and add a damn plus signs

    var output = $.ajax({
        url: 'https://api-2445582011268.apicast.io/games/?fields=*&limit=40&offset=0&order=release_dates.date:asc&search=' + game, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        contentType: 'text/plain',
        crossDomain: true,
        xhrFields: {
            withCredentials: false
        },
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function (data) {
            // do all this on success       
            var items = []; //make an empty array

            console.log(data); //just need to check the data in the console so I can see what objects are returned

            $.each(data, function (key, val) {
                function picCheck() { //check if there's a picId if nah give it the generic image id
                    var picId;
                    if (typeof val.cover === 'undefined') {
                        picId = 'nocover_qhhlj6'
                    } else {
                        picId = val.cover.cloudinary_id;
                    }
                    return picId;
                };

                //iterate through the returned data and build a list
                items.push('<a href="' + val.url + '" target="_blank"><div class="" id="' + key + '"><img src="https://res.cloudinary.com/igdb/image/upload/t_logo_med/' + picCheck() + '.jpg"><span>' + val.name + '</span></li></a>');
            });
            // if no items were returned then add a message to that effect
            if (items.length < 1) {
                items.push('<li>No results for this Game, try again!</li>');
            }

            // remove spinner
            $('.fa-spin').remove();

            // append list to page
            $div = $('<div class="row row-wrap gameoutput"  />').appendTo('#gameoutput');

            //append list items to list
            $div.append(items);
        },
        error: function (err) {
            alert(err);
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("user-key", "a4f2207c6b692358532b448a5632cbe6"); // Enter here your Mashape key
        }
    });


}
