function formatDate (input) {
    var trimmedString=input.substring(0,10);
    var datePart = trimmedString.split("-",3),
    year = datePart[0], // get only two digits
    month = datePart[1],
     day = datePart[2];
    return day+'/'+month+'/'+year;
  }
  

function hideLoader() {
    $('#loading').hide();
}
function newsDisp(){
    // document.getElementById("loader").style.display='block';
    var b=baseUrl();
    var status;
        if(localStorage.getItem("access_token") === null)
        {
            window.location="index.html";
    
        }
        else if(localStorage.getItem("access_token"))
        {
            $(document).ready(function(){
             var bearer = "Bearer " + localStorage.getItem("access_token");
             var refreshtoken=localStorage.getItem("refreshtoken");
             var category=localStorage.getItem("newscategory");
                fetch('https://cors-anywhere.herokuapp.com/https://rocky-bayou-35696.herokuapp.com/news/getNewsbyCategory',{
                    method: 'POST',
                    headers:{
                        'Accept':'application/json',
			            'Content-Type':'application/json',
                        Authorization:bearer
                    },body: JSON.stringify({
                        category:category,
                        client:"Panchjanya"
                    })
              
            })
             .then( (response) =>  {status=response.status; return(response.json());})
             .then((data) => {
                 console.log(status);
                 if(status==403)
                 {
                    //  alert("Forbidden");
                     console.log(refreshtoken);

                 fetch(b+'profile/refresh',{
                    method: 'POST',
                    headers:{
                        Authorization:"Bearer " + localStorage.getItem("access_token"),
                        'Accept':'application/json',
				        'Content-Type':'application/json'

                    },
                    body: JSON.stringify({
                refreshtoken:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMjMyMywiZXhwIjoxNjQzMTMxNzEzLCJpYXQiOjE2MTE2ODIxMTN9.w6dGXQX0i6fx9rLaIxcbPNuDZBVQh2Yzo6RMZ9W2CVA"
              }),
               credentials: "same-origin"
            })
             .then((response) => response.json())
             .then((responsejson) => {
                    window.localStorage.setItem("access_token",responsejson.access_token);
                    window.location="news.html";

             })
             .catch((error) => {
                console.log("reset client error-------",error);
           });
                
                
                }
                 else{

                    for(const i in data['news'])
                    {
                        
                        var disp;
                        var contentLen=data['news'][i]['content'].length;
                        var contentDesc=data['news'][i]['content'];
                        var trimmedString=contentDesc.substring(0,500);
                        console.log(i , data['news'][i] );
                        console.log(data['news'][i]['title']);
                        if(contentLen>500)
                        {
                            trimmedString+='. . .';
                        }
                       
                            disp='<div class="my-2 py-3 border mt-3 row justify-content-between"><div class="col-sm-5 mx-2"><img class="imgg responsive" style="margin-bottom:10px;" src=%imgsrc% height="300px" width="350px"></div><div class="col-sm-6 mx-2 "><a class="anch" onclick="newsview(%i%)" href="newsview.html"><h2 class="mt-0 fontt break">%title%</h2><h5 class="text-muted">by %author% %date%</h5><p class="content" style="color:#222224;">%content%</p></a></div></div>';
                        //var newhtml = html.replace('%id%',data['news'][i]['id']);
                        var newhtml = disp.replace('%title%',data['news'][i]['title']);
                        newhtml = newhtml.replace('%content%',trimmedString);
                        newhtml = newhtml.replace('%i%',i);
                        newhtml=newhtml.replace('%imgsrc%',data['news'][i]['image']);
                        newhtml=newhtml.replace('%data%',data);
                        var dateConvert=formatDate(data['news'][i]['date']);
                        newhtml = newhtml.replace('%date%',dateConvert);
                        newhtml = newhtml.replace('%author%',data['news'][i]['author']);
                        document.querySelector('.news-add').insertAdjacentHTML('beforeend' , newhtml);
                       
                        setTimeout(3000);
                    }
                    i++;
                 }
               
                
                })
                .catch((error) => {
                    console.log("reset client error-------",error);
                   
                    
               });
            
            });
            setTimeout(hideLoader,3000);
        
            }
                
            
            
            
        }

        
    

    