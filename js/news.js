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
                if(localStorage.getItem("start")===null)
                {
                    window.localStorage.setItem("start",0);
                }
                 
              const start=parseInt(localStorage.getItem("start"));
              
             var bearer = "Bearer " + localStorage.getItem("access_token");
             var refreshtoken=localStorage.getItem("refreshtoken");
             var category=localStorage.getItem("newscategory");
             console.log("category");
             console.log(category);
                fetch(b+'news/getNewsbyCategory',{
                    method: 'POST',
                    headers:{
                        'Accept':'application/json',
			            'Content-Type':'application/json',
                        Authorization:bearer
                    },body: JSON.stringify({
                        category:category,
                        client:"Panchjanya",
                        start:start
                    })
              
            })
             .then( (response) =>  {status=response.status; return(response.json());})
             .then((data) => {
                
                 const count=parseInt(data["count"]);
                 const next=parseInt(data["next"]);
                 if((next<count)&&(next>=8))
                 {
                    document.getElementById("next").style.display='block';
                    document.getElementById("previous").style.display='block';
                    
                 }
                 else if((count<=next) && (next>=8))
                 {
                    document.getElementById("next").style.display='none';
                    document.getElementById("previous").style.display='block';
                    
                 }
                 else if((next<count)&&(next<8))
                 {
                    document.getElementById("next").style.display='block';
                    document.getElementById("previous").style.display='none';
                  
                 }
                 else if((count<=next) && (next<8))
                 {
                    document.getElementById("next").style.display='none';
                    document.getElementById("previous").style.display='none';
                    
                 }
                 console.log(status);
                 if(status==403)
                 {
                    //  alert("Forbidden");
                    //  console.log(refreshtoken);

                 fetch(b+'profile/refresh',{
                    method: 'POST',
                    headers:{
                        'Accept':'application/json',
				        'Content-Type':'application/json'

                    },
                    body: JSON.stringify({
                refreshtoken:refreshtoken
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
                   
                        fetchCategoryAPI();
                        
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
                            disp='<div class="my-2 py-3 border mt-3 row shadow rc justify-content-between"><div class="col-sm-5 mx-2"><img class="imgg responsive" style="margin-bottom:10px;" src=%imgsrc% height="300px" width="350px"></div><div class="col-sm-6 mx-2 "><a class="anch" onclick="newsview(%i%)" href="newsview.html"><h2 class="mt-0 fontt break">%title%</h2><h5 class="text-muted">by %author% %date%</h5><p class="content" style="color:#222224;">%content%</p></a></div></div>';
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
        
            }
                
            
            
            
        }

        function category(idd)
        {
                window.localStorage.setItem("active",idd.id);
                window.localStorage.setItem("start",0);
                window.localStorage.setItem("newscategory",idd.innerText);
                window.location="news.html";
        }


        function fetchCategoryAPI()
        {
            var b=baseUrl();
            var totalCat=0;
            fetch(b+'category/getCategories',{
                method: 'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    Authorization:"Bearer " + localStorage.getItem("access_token")
                }
          
        })
         .then( (response) => response.json())
         .then((data) => {
            var newscategory=localStorage.getItem("newscategory");
            var allid1;
            var allid2;
          
            for(const j in data['categories'])
            {
               
                var disp1;
                var disp2;
                var disp3;
               
               
                console.log(data['categories'][j]['categoryName']);
                if(data['categories'][j]['categoryName']=="All")
                {
                    disp3='<button class="btn btn-lg my-2 button1" id=%id% value=%category1% onclick="category(%idd%)">%category% </button>'; 
                    disp4='<button class="btn btn-lg my-2 button1" style="width:80%;" id=%id% value=%category1% onclick="category(%idd%)">%category% </button>'; 
                    var newhtml7 = disp3.replace('%id%','check'+totalCat+1);
                    var newhtml7 = newhtml7.replace('%idd%','check'+totalCat+1);
                    var newhtml7 = newhtml7.replace('%category1%',data['categories'][j]['categoryName']);
                    var newhtml7 = newhtml7.replace('%category%',data['categories'][j]['categoryName']);
                    var newhtml8 = disp4.replace('%id%','check'+totalCat);
                    var newhtml8 = newhtml8.replace('%idd%','check'+totalCat);
                    var newhtml8 = newhtml8.replace('%category1%',data['categories'][j]['categoryName']);
                    var newhtml8 = newhtml8.replace('%category%',data['categories'][j]['categoryName']);
                    allid1='check'+totalCat+1;
                    allid2='check'+totalCat;
                    document.querySelector('.content4').insertAdjacentHTML('beforeend' , newhtml7);
                    document.querySelector('.content5').insertAdjacentHTML('beforeend' , newhtml8);
                    totalCat++;
                }
                else
                {
                if(data['categories'][j]['categoryName']!=null)
                {
                    if(data['categories'][j]["is_Panchjanya"]==true)
                    {
                        disp2='<button class="btn btn-lg my-2 button1" id=%id% value=%category1% onclick="category(%idd%)">%category% </button>';
                        disp1='<button class="btn btn-lg my-2 button1" style="width:80%;" id=%id% value=%category1% onclick="category(%idd%)">%category% </button>';
                        var newhtml5 = disp1.replace('%id%','check'+totalCat);
                        var newhtml5 = newhtml5.replace('%idd%','check'+totalCat);
                        var newhtml5 = newhtml5.replace('%category1%',data['categories'][j]['categoryName']);
                        var newhtml5 = newhtml5.replace('%category%',data['categories'][j]['categoryName']);
                        var newhtml6 = disp2.replace('%id%','check'+totalCat+1);
                        var newhtml6 = newhtml6.replace('%idd%','check'+totalCat+1);
                        var newhtml6 = newhtml6.replace('%category1%',data['categories'][j]['categoryName']);
                        var newhtml6 = newhtml6.replace('%category%',data['categories'][j]['categoryName']);
                        // console.log(newhtml5);
                        // console.log(newhtml6);
    
                        totalCat++;
                        document.querySelector('.content2').insertAdjacentHTML('beforeend' , newhtml5);
                        document.querySelector('.content3').insertAdjacentHTML('beforeend' , newhtml6);
                    }

                }
            }
           
         }
        //  if(newscategory=== null)
        //  {
        //      window.localStorage.setItem("newscategory",data['categories'][1]['category']);
        //      window.localStorage.setItem("active","check01");
        //      window.location("news.html");
             
        //  }
         if(localStorage.getItem("newscategory")=="All")
         {
            document.getElementById(allid1).style.backgroundColor="orange";
            document.getElementById(allid2).style.backgroundColor="orange";
         }
         else
         {
            var active=localStorage.getItem("active");
            document.getElementById(active).style.backgroundColor="orange";
            window.localStorage.setItem("totalCat",totalCat);
         }
         
        })
         .catch((error) => {
            console.log("reset client error-------",error);
           
            
       });

    

            
        }
        function next()
        {
            window.localStorage.setItem("start",parseInt(localStorage.getItem("start"))+4);

        }
      

        function previous()
        {

            var start=localStorage.getItem("start");
            window.localStorage.setItem("start",parseInt(start)-8);
        }

      

        
    

    