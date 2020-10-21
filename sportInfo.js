var arr;
var id;
window.addEventListener('load',function(){
    arr = JSON.parse(localStorage.getItem('sports'))
    // console.log(arr);
    id = localStorage.getItem('id')
    rendorDOM()
})

function rendorDOM(){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].strSport == id){
            displayData(arr[i])
            break;
        }else{
            let body = document.createElement('body')
            let h2 = document.createElement('h2')
            h2.textContent = "Data not available"
            body.append(h2)
        }
    }
}
var league_content = document.getElementById('league-content')

function displayData(data){
    var left = document.getElementById('left')
    var right = document.getElementById('right')
    var img = document.createElement('img')
    img.setAttribute('src', data.strSportThumb)
    left.append(img)
    var title = document.createElement('h1')
    title.textContent = data.strSport
    var description = document.createElement('p')
    description.textContent = data.strSportDescription
    right.append(title,description)
    var h1 = document.createElement('h1')
    h1.textContent = "List of Leagues"
    h1.style.width = "100%"
    h1.style.textAlign = "center"
    league_content.append(h1)
    getLeagueData(title)
}

function getLeagueData(title){
 
    var xhr = new XMLHttpRequest()
    var url = "https://www.thesportsdb.com/api/v1/json/1/all_leagues.php"
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function(){
        var res = JSON.parse(xhr.response)
        console.log(res);
        displayLeagueData(title,res.leagues)
    }
}


function displayLeagueData(title,data){
    console.log(data,title);
    data.forEach(element => {
        if(element.strSport === title.textContent && element.strLeague != "_No League"){
            var league = document.createElement('div')
            league.setAttribute('class',element.idLeague)
            league.style.border = "1px solid black"
            var leagueName = document.createElement('p')
            leagueName.setAttribute('class',element.idLeague)
            leagueName.textContent = element.strLeague
           
            league.append(leagueName)
            league_content.append(league)

        }
    });
    localStorage.setItem('leagues',JSON.stringify(data));
    leagueInfo()
}


function leagueInfo(){
    league_content.addEventListener('click',function(){
        var idLeague = event.target.getAttribute('class');
        console.log(idLeague);
        if(idLeague != null){
            localStorage.setItem('idLeague',idLeague)
            location.href = "leagueInfo.html"
        }
        
    })
}