
function hideLoader() {
    $('#loading').hide();
}
function newsDisp(){
    // document.getElementById("loader").style.display='block';
    var b=baseUrl();
        if(localStorage.getItem("access_token") === null)
        {
            window.location="index.html";
    
        }
        else if(localStorage.getItem("access_token"))
        {
            $(document).ready(function(){
             var bearer = "Bearer " + localStorage.getItem("access_token");
                fetch(b+'news/getNews?format=json',{
                    method: 'GET',
                    headers:{
                        Authorization:bearer
                    }
              
            })
             .then((response) => response.json())
             .then((data) => {
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
                    newhtml = newhtml.replace('%date%',data['news'][i]['date']);
                    newhtml = newhtml.replace('%author%',data['news'][i]['author']);
                    document.querySelector('.news-add').insertAdjacentHTML('beforeend' , newhtml);
                   
                    setTimeout(3000);
                }
                i++;
                
                })
                .catch((error) => {
                    console.log("reset client error-------",error);
               });
            
            });
            setTimeout(hideLoader,1500);
        
            }
                
            
            
            
        }

        
    

    