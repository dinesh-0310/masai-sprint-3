
var teamid;
window.addEventListener('load',function(){
    
    teamid = localStorage.getItem('id')
    // console.log(teamid);
    rendorDOM()
})

function rendorDOM(){
    var xhr = new XMLHttpRequest()
    var url = "https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id="
    xhr.open('GET', url + teamid)
    xhr.send()
    xhr.onload = function(){
        var res = JSON.parse(xhr.response)
        // console.log(res.teams);
        displayData(res.teams)

    }
}

function displayData(data){
    var banner = document.getElementById('banner')
    var info = document.getElementById('info')
    var fb = document.getElementById('fb')
    // console.log(data[0].strFacebook)
    fb.setAttribute('href', data[0].strFacebook)
    var twitter = document.getElementById('twitter')
    twitter.setAttribute('href',data[0].strTwitter)
    var youtube = document.getElementById('youtube')
    youtube.setAttribute('href',data[0].strYoutube)
    var banner_img3 = document.createElement('img')
    banner_img3.setAttribute('src', data[0].strTeamBanner)
    var h1 = document.createElement('h1')
    h1.textContent = `About ${data[0].strTeam}`
    var description = document.createElement('p')
    description.textContent = data[0].strDescriptionEN
    var table_info = document.createElement('div')
    table_info.innerHTML = `<table border="1">
                        <tbody>
                            <tr><th colspan = "2">Information</th>
                            </tr>
                            <tr> <td>FormedYear</td><td>${data[0].intFormedYear}</td>
                            </tr>
                            <tr> <td>Alternate Names</td><td>${data[0].strAlternate}</td>
                            </tr>
                            <tr> <td>Country</td><td>${data[0].strCountry}</td>
                            </tr>
                            <tr> <td>Website</td><td><a href = "${data[0].strWebsite}">${data[0].strTeam}</td>
                            </tr>
                        </tbody>
                    </table>`

    banner.append(banner_img3)
    info.append(h1,description,table_info)
}