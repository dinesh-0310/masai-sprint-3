window.addEventListener('load',function(){
    
    addSports()
})
var sports = document.getElementById('sports')
function addSports(){
    
    var xhr = new XMLHttpRequest()
    var url = "https://www.thesportsdb.com/api/v1/json/1/all_sports.php"
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function(){
        var res = JSON.parse(xhr.response)
        // console.log(res.sports);
        // localStorage.setItem('search',res.sports)
        rendorDOM(res.sports)
    }
}

function rendorDOM(arr){
    for(var i = 0; i < arr.length; i++){
        var div = document.createElement('div')
        var img = document.createElement('img')
        img.setAttribute('src',arr[i].strSportThumb)
        var title = document.createElement('h4')
        title.textContent = arr[i].strSport
        var btn = document.createElement('button')
        btn.setAttribute('id', arr[i].strSport)
        btn.textContent = "See more"
        div.append(img,title,btn)
        sports.append(div)
    }
    localStorage.setItem('sports',JSON.stringify(arr));
    sportInfo();

}
function sportInfo(){
    sports.addEventListener('click',function(){
        var id = event.target.getAttribute('id');
        var value = event.target.textContent 
        // console.log(id);
        if(id != null && id != "sports" && value != "About Team"){
            localStorage.setItem('id',id)
            location.href = "sportInfo.html"
        }else{
            localStorage.setItem('id',id)
            location.href = "teamInfo.html"

        }
       
    })
}