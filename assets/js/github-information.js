// displaying the user information/ data
    // shows the username "Nadine Schmidt"
    // shows the user loging "haselnuts"
    // shows how many followers 
    // shows how many the user follows
    // shows how many public repos
    // user.html_url - direct link to github public user profile
function userInformationHTML(user) {
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url} target="_blank">${user.login}</a>)
        </span>
    </h2> 
    <div class="gh-content>
        <div class="gh-avatar">
            <a href="${users.html_url} target="_blank">
                <img src="${user.avatar_url}" width="80" length="80" alt="${user.login}"/>
            </a>
        </div>
        <p>Followers: ${users.followers} Follows: ${users.following} <br> Repos: ${users.public_repos}</p>
    </div>
     
    `
};

function repoInformationHTML(repos) {
    
}



function fetchGitHubInformation(event) {

    // declaring a varible and using jqerry instead of getElementById()
    var username = $("#gh-username").val();
    
    // if input of username is empty then print in div #gh-user-data "Please enter a github username"
    if(!username) {
        $("#gh-user-data").html(
            `<h2>Please enter a GibHub username</h2>`
        );
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loader..."/>
        </div>`
    );

    $.when( 
        // when username retrieved from GitHub
        $.getJSON(`https://api.github.com/user/${username}`)
        $.getJSON(`https://api.github.com/user/${username}/repos`)
    ).then(
        // then display "userData/ repoData"
        function(firstResponse, secondResponse) {
            // the when() method packs a response up into arrays, each one is the first element of the array, need to put the indexes in there fo these responses
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
            // if username is incorrect === 404 (page not found) then display "No info found for user ..."
        }, function(errorResponse) {
            if(errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`
                );

                // or if not an 404 error display Error: ....
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
         });
}