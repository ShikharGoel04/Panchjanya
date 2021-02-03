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
             var magid=localStorage.getItem("data");
             var magdata;
            for(const i in data['magazine'])
            {
                
                var panch=data['magazine'][i]['is_Panchjanya'];
                var org=data['magazine'][i]['is_Organizer'];
                if(magid!=null)
                {
                    if((magid==data['magazine'][i]['id']))
                     {
                          magdata=data['magazine'][i]['data'];
                    }
                 }
                else if((panch==true))
                {
                   
                         magdata=data['magazine'][i]['data'];
                }

              
                var html = '  <div class="my-3 ml-1">            <div class="row">        <div class="col-sm-5">         <a id=%id% onclick="pdfview(%idd%)" href="magazine.html">             <img src=%image% style="height: 110px; width: 80%;">  </a>     </div>             <div class="col-sm-6">                <div class="mt-0">                  <h2 class="mt-0">                    %title%                  </h2>                  <h5 class="mt-0">                    by %author% %date%                  </h5>                </div>              </div>            </div>            <hr>          </div';
                
               var newhtml = html.replace('%title%',data['magazine'][i]['title']);
               newhtml = newhtml.replace('%id%',data['magazine'][i]['id']);
                newhtml = newhtml.replace('%image%',data['magazine'][i]['image']);
                newhtml = newhtml.replace('%date%',data['magazine'][i]['date']);
                newhtml = newhtml.replace('%author%',data['magazine'][i]['author']);
                newhtml = newhtml.replace('%idd%',data['magazine'][i]['id']);
                console.log(newhtml);
                document.querySelector('.panch').insertAdjacentHTML('beforeend' , newhtml);
                console.log(i);
            }
            
                    pdf(magdata);
            
            })
            .catch((error) => {
                console.log("reset client error-------",error);
           });
        
        });
    }
}
    function pdfview(data)

    {   //call either orgMagfetch or panchfetchMag function depending on the value stored in local storage. Store in local storage on cick of button Panch or org. 
        window.localStorage.setItem("data",data);
    }
    function previewFile()

    {
        var adobeDCView = new AdobeDC.View({clientId: "e7e07ed1739446638a1536a1cb32ea1f", divId: "adobe-dc-view"});
        adobeDCView.previewFile({
            content:{location: {url: data1}},
            metaData:{fileName: "Organiser 07 February 2021"}
        }, {showAnnotationTools: false, showLeftHandPanel: false, dockPageControls: false, 
			showDownloadPDF: false, showPrintPDF: false});
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