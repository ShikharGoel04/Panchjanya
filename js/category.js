// function showMore(title){
//     //removes the link
//     document.getElementById('link').remove();
//     //shows the #more
//     document.getElementById(title).style.display = "block";
// }
function hideLoader() {
    $('#loading').hide();
}
window.onload=function(){

    if(localStorage.getItem("access_token") === null)
    {
		window.location="index.html";

	}
	else if(localStorage.getItem("access_token"))
    {
		$(document).ready(function(){
            
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const category = urlParams.get('category')
            console.log("category");
            console.log(category);
            var bearer = "Bearer " + localStorage.getItem("access_token");
            var b=baseUrl();
            fetch(b+'videos/getVideos',{
                method: 'GET',
                headers:{
                    Authorization:bearer
                }
          
        })
         .then((response) => response.json()).then((response) => response['videos'].filter((data) => data.category === category)
     )
         .then((data) => {
                console.log(data);
            for(const i in data)
                    {
                        var disp;
                        console.log(i , data[i] );
                        console.log(data[i]['title']);
                        var description=data[i]['description'];
                        var trimmedString = description.substring(0, 1000);
                        var descLength=description.length;
                        // if(descLength>1000)
                        // {
                        //   disp='<div class="mb-5 border-bottom mt-3"><div class="col-sm-3"><iframe id="ytplayer" class="responsive-iframe " type="text/html" width="350px" height="250px"src="https://www.youtube.com/embed/%videoid%?autoplay=0&origin=http://example.com"frameborder="0"></iframe></div><div class="col-sm-1"></div><div class="col-sm-8"><h4 class="fontt">%title%</h4><p class="content">%description% . . .<div id=%title% style="display:none;"><p>%desc%</p></div></p></div><a href="javascript:showMore(%title%)" id="link">Read More >></a></div>';
                        // }
                        // else
                        // {
                            disp='<div class="row mt-3 mb-5 border-bottom"><div class="col-sm-4"><iframe id="ytplayer" class=" responsive" type="text/html" width="350px" height="250px"src="https://www.youtube.com/embed/%videoid%?autoplay=0&origin=http://example.com" modestbranding="1" frameborder="0" allowfullscreen ></iframe></div><div class="col-sm-8"><h5 class="fontt mt-0 mx-2">%title%</h5><p class="content mx-2">%description%</p></div></div>'
                        // }
                        //var newhtml = html.replace('%id%',data['news'][i]['id']);
                        var newhtml = disp.replace('%videoid%',data[i]['videoId']);
                        newhtml = newhtml.replace('%title%',data[i]['title']);
                        newhtml = newhtml.replace('%description%',trimmedString);
                        // newhtml = newhtml.replace('%desc%',description);
                        document.querySelector('.cat-add').insertAdjacentHTML('beforeend' , newhtml);
                        setTimeout(3000);
                       
                    }
                    i++;
            
            })
            .catch((error) => {
                console.log("reset client error-------",error);
           });
        
        });
       
    
        }
        // setTimeout(function(){
        //     document.getElementById("loader").style.display='none';
        // }, 3000)
        
        
        
    }
