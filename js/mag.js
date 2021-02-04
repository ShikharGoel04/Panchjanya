var data1;
var adobe=false;

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
             var disp;
             var flag=0;
           
            for(const i in data['magazine'])
            {
                
                var panch=data['magazine'][i]['is_Panchjanya'];
                var org=data['magazine'][i]['is_Organizer'];
                var formatDatee=formatDate(data['magazine'][i]['date']);
                if(magid!=null)
                {
                    if((magid==data['magazine'][i]['id']))
                     {
                          disp='<h3 class="h3heading">      %title%  </h3>    <h5 class="mb-2 mt-0">      By %author%  %date%   </h5>';
                          var newhtml = disp.replace('%title%',data['magazine'][i]['title']);
                          newhtml = newhtml.replace('%date%',formatDatee);
                          newhtml = newhtml.replace('%author%',data['magazine'][i]['author']);
                          document.querySelector('.magheading').insertAdjacentHTML('beforeend' , newhtml);
                          magdata=data['magazine'][i]['data'];
                          continue;
                    }
                 }
                else if((panch==true)&&(flag==0))
                {
                        disp='<h3 class="h3heading">      %title%  </h3>    <h5 class="mb-2 mt-0">      By %author%  %date%   </h5>';
                        var newhtml = disp.replace('%title%',data['magazine'][i]['title']);
                        newhtml = newhtml.replace('%date%',formatDatee);
                        newhtml = newhtml.replace('%author%',data['magazine'][i]['author']);
                        document.querySelector('.magheading').insertAdjacentHTML('beforeend' , newhtml);
                         magdata=data['magazine'][i]['data'];
                         flag=1;
                         continue;
                }

              if(panch==true)
              {
                 
                var html = '  <div class="my-3 ml-1">            <div class="row">        <div class="col-sm-5 pr-0">         <a id=%id% onclick="pdfview(%idd%)" href="magazine.html">             <img src=%image% style="height: 135px; width: 70%;">  </a>     </div>             <div class="col-sm-6 pl-0">                <div class="mt-0">                  <h4 class="mt-0" style="font-weight:600;">                    %title%                  </h4>                  <h5 class="mt-0">                    By %author% %date%                  </h5>                </div>              </div>            </div>            <hr style="border-top: 1.8px solid #eee;">          </div>';
                
                var newhtml = html.replace('%title%',data['magazine'][i]['title']);
                newhtml = newhtml.replace('%id%',data['magazine'][i]['id']);
                 newhtml = newhtml.replace('%image%',data['magazine'][i]['image']);
                 newhtml = newhtml.replace('%date%',formatDatee);
                 newhtml = newhtml.replace('%author%',data['magazine'][i]['author']);
                 newhtml = newhtml.replace('%idd%',data['magazine'][i]['id']);
                 document.querySelector('.panch').insertAdjacentHTML('beforeend' , newhtml);
                 console.log(i);
              }
              else if(org==true)
              {
                var html = '  <div class="my-3 ml-1">            <div class="row">        <div class="col-sm-5 pr-0">         <a id=%id% onclick="pdfview(%idd%)" href="magazine.html">             <img src=%image% style="height: 135px; width: 70%;">  </a>     </div>             <div class="col-sm-6 pl-0">                <div class="mt-0">                  <h4 class="mt-0" style="font-weight:600;">                    %title%                  </h4>                  <h5 class="mt-0">                    By %author% %date%                  </h5>                </div>              </div>            </div>            <hr style="border-top: 1.8px solid #eee;">          </div>';
                
                var newhtml = html.replace('%title%',data['magazine'][i]['title']);
                newhtml = newhtml.replace('%id%',data['magazine'][i]['id']);
                 newhtml = newhtml.replace('%image%',data['magazine'][i]['image']);
                 newhtml = newhtml.replace('%date%',formatDatee);
                 newhtml = newhtml.replace('%author%',data['magazine'][i]['author']);
                 newhtml = newhtml.replace('%idd%',data['magazine'][i]['id']);
                 document.querySelector('.org').insertAdjacentHTML('beforeend' , newhtml);
                 console.log(i);
              }

            }

            retrieveSelected();
                   
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
            metaData:{fileName: "E-Magazine"}
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

    function saveTabSelect(e) {
        localStorage.setItem("tagSelected", e.id);
        return true;
      }

      function retrieveSelected(){
        var curTag;
          if(localStorage.getItem("tagSelected")===null)
          {
                curTag="panch1";
          }
          else
          {
          curTag = localStorage.getItem("tagSelected");
          }
        
        var element = document.getElementById(curTag);
        element.click();
        element.classList.add("active"); 
      }