var usernameInput = document.querySelector('#username-input .username-input-text');

usernameInput.addEventListener('change', function(event) {
	var ghReq = new XMLHttpRequest();
	ghReq.addEventListener("load", updateProfileBadge);
	ghReq.open("GET", "https://api.github.com/users/" + usernameInput.value);
	ghReq.send();
});

var emptyUser = {
	login: "",
	name: "",
	location: "",
	public_repos: 0,
	public_gists: 0,
	avatar_url: "https://www.makeupgeek.com/wp-content/themes/makeupgeek-v4/images/placeholder-square.svg"
};

updateDom(emptyUser);

function updateProfileBadge() {
	var response = JSON.parse(this.responseText);
	if(response.message == "Not Found") {
		updateDom(emptyUser);
	}
	else {
		updateDom(response);
	}
}

function updateDom(user){
	var profile = document.getElementById('github-profile');
	profile.querySelector('.github-profile-username').innerText = user.login;
  	profile.querySelector('.github-profile-name').innerText = user.name;
  	profile.querySelector('.github-profile-location').innerText = user.location;
  	profile.querySelector('.github-profile-repo-count').innerText = user.public_repos;
  	profile.querySelector('.github-profile-gist-count').innerText = user.public_gists;
  	profile.querySelector('.github-profile-avatar').style.backgroundImage = "url(" + user.avatar_url + ")";
}

