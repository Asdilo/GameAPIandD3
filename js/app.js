function loadData() {

    // remove resultset if this has already been run
    $('#gameoutput .gameoutput').remove();
    // add spinner to indicate something is happening
    $('<i class="fa fa-refresh fa-spin"/>').appendTo('body');

    // get selected zip code from selectbox
    var game = $('#gamename').val().replace(/ /g, '+'); //remove those blasted spaces and add a damn plus signs
    ;
    var output = $.ajax({
        url: 'https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=10&offset=0&order=release_dates.date:asc&search=' + game, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function (data) {
            // do all this on success       
            var items = [],
                $div;
            console.log(data);
            $.each(data, function (key, val) {

                function picCheck() { //check if there's a fuggin picId if nah give it the generic image id
                    var picId;
                    if ( typeof val.cover === 'undefined') {
                        picId = 'nocover_qhhlj6'
                    }
                    else {
                        picId = val.cover.cloudinary_id;
                    }
                    return picId;
                };

                //iterate through the returned data and build a list
                items.push('<a href="' + val.url + '" target="_blank"><div class="column" id="' + key + '"><img src="https://res.cloudinary.com/igdb/image/upload/t_logo_med/' + picCheck() + '.jpg"><span>' + val.name + '</span></li></a>');
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
        error: function (err) { alert(err); },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "OAxCGrSv1Vmsh13AiC1Wpm2Xyqq8p1OVO0zjsnVDyArc4dhrZf"); // Enter here your Mashape key
        }
    });


}


