window.onload = function(){
    var sbar = document.querySelector('#search-container')
    sbar.addEventListener('keyup',debouncer(500,getsportsBySearch))
}

function debouncer(delay,callback){
    var debounce;
    
    return function(){
        var value = event.target.value
        debounce && clearTimeout(debounce);
        debounce = setTimeout(function(){
            callback(value)
        },delay)
    }
}

function getsportsBySearch(query){
    var xhr = new XMLHttpRequest();
    var url = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t="
    xhr.open('GET', url + query)
    xhr.send()
    xhr.onload = function(){
        var res = JSON.parse(xhr.response);
        console.log(res.teams);
        renderCards(res.teams)
    }
}
var sports = document.getElementById('sports')

function renderCards(results){
    sports.innerHTML = ""
    for(var i = 0; i < results.length; i++){
        var div = document.createElement('div')
        var img = document.createElement('img')
        img.setAttribute('src',results[i].strTeamBadge)
        var title = document.createElement('h4')
        title.textContent = results[i].strTeam
        var btn = document.createElement('button')
        btn.setAttribute('id', results[i].idTeam)
        btn.textContent = "About Team"
        div.append(img,title,btn)
        sports.append(div)
    }
    localStorage.setItem('teams',JSON.stringify(results));
    teamInfo();

}

function teamInfo(){
    sports.addEventListener('click',function(){
        var teamid = event.target.getAttribute('id');
        var value = event.target.textContent 
        // console.log(id);
        if(id != null && id != "sports" && value == "About Team"){
            localStorage.setItem('teamid',teamid)
            location.href = "teamInfo.html"
        }
       
    })
}
