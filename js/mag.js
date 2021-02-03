var data1;
var adobe=false;
function hideLoader() {
    $('#loading').hide();
}
window.onload=function(){
    var b=baseUrl();
    if(localStorage.getItem("access_token") === null)
    {
		window.location="index.html";

	}
    else if(localStorage.getItem("access_token"))
    {
        
		$(document).ready(function(){
        var bearer ='Bearer '+localStorage.getItem("access_token");
            console.log(bearer);
            fetch(b+'magazine/getMagazine',{
                method: 'GET',
                contentType: 'application/json',
                headers: {
                    'Authorization':"Bearer "+localStorage.getItem("access_token")
                }
          
        })
         .then((response) => response.json())
         .then((data) => {
             const magid=0;
            for(const i in data['magazine'])
            {
                
                var panch=data['magazine'][i]['is_Panchjanya'];
                var org=data['magazine'][i]['is_Organizer'];
                if(panch==true)
                {
                   
                        var data=data['magazine'][i]['data'];
                         pdf(data);
                }

                console.log(i , data['magazine'][i] );
                var html = '<div class="col-sm-4"><h4 class="hfont" style="text-align: center;">%title%</h4><a  id = %id% onclick="reply_quick(this.id)" href="magazineview.html"><img src="%image%" alt="organiser" style="width:100%"></a><p style="text-align: center;"class="datefont" >%date%</p><h4 class="dfont" style="text-align: center;">%author%</h4></div>';
                var newhtml = html.replace('%id%',data['magazine'][i]['id']);
                newhtml = newhtml.replace('%title%',data['magazine'][i]['title']);
                newhtml = newhtml.replace('%image%',data['magazine'][i]['image']);
                newhtml = newhtml.replace('%date%',data['magazine'][i]['date']);
                newhtml = newhtml.replace('%author%',data['magazine'][i]['author']);
        
                console.log(i);
            }
                    i++;
            
            })
            .catch((error) => {
                console.log("reset client error-------",error);
           });
        
        });
    }
    }
    function previewFile()

    {
        var adobeDCView = new AdobeDC.View({clientId: "e7e07ed1739446638a1536a1cb32ea1f", divId: "adobe-dc-view"});
        adobeDCView.previewFile({
            content:{location: {url: data1}},
            metaData:{fileName: "Organiser 07 February 2021"}
        }, {showLeftHandPanel: false, showDownloadPDF: false, showPrintPDF: false});
    }

    function pdf(data)
    {
        data1=data;
        if(data1 && adobe==true)
        {
            previewFile();
        }
    }

    document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
        adobe=true;
    });

    


   