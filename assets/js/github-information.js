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
            <a href="${user.html_url} target="_blank">
                <img src="${user.avatar_url}" width="80" length="80" alt="${user.login}"/>
            </a>
        </div>
        <p>Followers: ${user.followers} Follows: ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`
};  

// displaying the user's repos if there are any
// repos.length goes thru the array and checks if there are any, if not "No Repos!"
// variable listItemsHTML displays the repos
// .map() works as .forEach() method but it returns an array
function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No Repos!</div>`
    }

    let listItemsHTML = repos.map(function(repo) {
        return `<li>
                <a href="${repo.html_url} target="_blank">${repo.name}</a>
            </li>`
    });
//joins all togetether with listItemsHTML.join("\n") with a new string so we do not have to iterate to it again
    return `<div class="clearfix repo-list"> 
                <p>
                    <strong> Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`
};



function fetchGitHubInformation() {
    //when the search area is empty no information will be displayed
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    // declaring a varible and using jqerry instead of getElementById()
    var username = $("#gh-username").val();
    
    // if input of username is empty then print in div #gh-user-data "Please enter a github username"
    if(!username) {
        $("#gh-user-data").html(`<h2>Please enter a GibHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loader..."/>
        </div>`
    );

    $.when( 
        // when username retrieved from GitHub
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
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

            // GitHub has a limit restriction in place as to how many requests can be made in a certain time
            // this is called THROTTELING, and it's designed to prevent users form making too many API requests and putting GitHubs server under stress
            // here we present a nicer and friendlier error message with a time when search is possible again
            } else if(errorResponse.status ===403) {
                let resetTime = new Date (errorResponse.getResponseHeader("X-RateLimit-Reset")*1000);
                $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`)

            // or if not an 404 error display Error: ....
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
         });
}

$(document).ready(fetchGitHubInformation);