function gameSearch() {
    // remove resultset if this has already been run
    $('#gameoutput .gameoutput').remove();
    // add spinner to indicate something is happening
    $('<i class="fa fa-refresh fa-spin"/>').appendTo('body');

    // get search term from input
    var game = $('#gamename').val();

    var items = []; //make an empty array


    var settings = {
        "url": "https://api-v3.igdb.com/games?search=zelda&fields=name, cover.url,  summary, storyline, url, websites",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "user-key": "d850a044f368de4bdc7905afd9c5dab5",
        },
      };

    $.ajax(settings).done(function (response) {
        console.log(response);
        renderResults(response.results);
    });

    function renderResults(response) {
        // remove spinner
        $('.fa-spin').remove();

        // append list to page
        $div = $('<div class="grid gameoutput"  />').appendTo('#gameoutput');

        $.each(response, function (key, val) {
            //iterate through the returned data and build a list
            items.push('<div class="card" id="' + val.id  + '"><img src="' + val.cover.url + '"><p>' + val.name + ' - ' + val.summary + '</p></div>');
        });
        // if no items were returned then add a message to that effect
        if (items.length < 1) {
            items.push('<div class="card">No results for this Game, try another game title.</div>');
        }
        //append list items to list
        $div.append(items);
    }


}