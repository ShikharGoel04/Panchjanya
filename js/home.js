function hideLoader() {
    $('#loading').hide();
}
function newsHome(){
    
      
        var i = 0;
        console.log("hi");
        if(i===0)
        {
        var url ='https://cors-anywhere.herokuapp.com/https://secret-mesa-20529.herokuapp.com/news/getNews?format=json';
        $.getJSON(url, function(data)
        {
            // console.log(data);
            for(const i in data['news'])
            {
                console.log(i , data['news'][i] );
                console.log(data['news'][i]['title']);
                var disp='<div class="my-2 py-3 border mt-3 row justify-content-between"><div class="col-sm-5 mx-2"><img class="imgg responsive" style="margin-bottom:10px;" src=%imgsrc% height="300px" width="350px"></div><div class="col-sm-6 mx-2 "><h2 class="mt-0 fontt break">%title%</h2><h5 class="text-muted">by %author% %date%</h5><p class="content" style="color:#222224;">%content%</p></div></div>';
                //var newhtml = html.replace('%id%',data['news'][i]['id']);
                var newhtml = disp.replace('%title%',data['news'][i]['title']);
                newhtml = newhtml.replace('%content%',data['news'][i]['content']);
                newhtml=newhtml.replace('%imgsrc%',data['news'][i]['imageUrl']);
                console.log(data['news'][i]['imageUrl']);
                newhtml = newhtml.replace('%date%',data['news'][i]['date']);
                newhtml = newhtml.replace('%author%',data['news'][i]['author']);
                document.querySelector('.news-add').insertAdjacentHTML('beforeend' , newhtml);
                setTimeout(3000);
            }
            i++;
        }); 

        }
        setTimeout(hideLoader,1500);
    
    
   
    }

    