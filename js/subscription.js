// function showMore(title){
//     //removes the link
//     document.getElementById('link').remove();
//     //shows the #more
//     document.getElementById(title).style.display = "block";
// }
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
   
    if(localStorage.getItem("access_token") === null)
    {
		window.location="index.html";

	}
	else if(localStorage.getItem("access_token"))
    {
		$(document).ready(function(){
         var bearer = "Bearer " + localStorage.getItem("access_token");
         var b=baseUrl();
            fetch(b+'profile/profile',{
                method: 'GET',
                headers:{
                    Authorization:bearer
                }
          
        })
         .then((response) => response.json())
         .then((data) => {
          
                        var phone=data['user']['phone'];
                        var email=data['user']['email'];
                        var username=data['user']['username'];
                        var orgSub=data['user']['is_orgSubscribed'];
                        var startDate="--";
                        if(data['user']['subscription_start']){
                            startDate=formatDate(data['user']['subscription_start']);
                        }

                        var panSub=data['user']['is_pncSubscribed'];
                        var endDate="--";
                        if(data['user']['subscription_end'])
                        {
                            endDate=formatDate(data['user']['subscription_end']);
                        }
                        var orgStart,orgEnd,panchStart,panchEnd;
                        console.log(phone);
                        console.log(orgSub);
                        if(orgSub && panSub)
                        {
                            orgStart=startDate;
                            panchStart=startDate;
                            orgEnd=endDate;
                            panchEnd=endDate;
                        }
                        else if(orgSub && !panSub)
                        {
                            orgStart=startDate;
                            panchStart='--';
                            orgEnd=endDate;
                            panchEnd='--';
                        }
                        else if(panSub && !orgSub)
                        {
                            orgStart='--';
                            panchStart=startDate;
                            orgEnd='--';
                            panchEnd=endDate;
                        }
                        else
                        {
                            orgStart='--';
                            panchStart='--';
                            orgEnd='--';
                            panchEnd='--';
                        }

                        var disp='<div>%username%</div>';
                        var disp1='<div>%phone%</div>';
                        var disp2='<div>%email%</div>';
                        var disp3='  <caption class="subscribe rounded fontt" style="caption-side: top; text-align: center;">              Subscription Details            </caption>          <tr class="firstrow">            <th style="text-align: center;">Subscription type</th>            <th style="text-align: center;">Start Date</th>            <th style="text-align: center;">End Date</th>          </tr>          <tr style="text-align: center;" class="evenrow">            <td>Organiser Ecopy</td>            <td class="tdbreak">%orgStart%</td>            <td>%orgEnd%</td>          </tr>          <tr style="text-align: center;" class="oddrow">            <td>Panchjanya Ecopy</td>            <td>%panchStart%</td>            <td>%panchEnd%</td>          </tr>';

                        var newhtml = disp.replace('%username%',data['user']['username']);
                        var newhtml1 = disp1.replace('%phone%',data['user']['phone']);
                        var newhtml2 = disp2.replace('%email%',data['user']['email']);
                       var newhtml3 = disp3.replace('%orgStart%',orgStart);
                        newhtml3 = newhtml3.replace('%orgEnd%',orgEnd);
                        newhtml3 = newhtml3.replace('%panchStart%',panchStart);
                        newhtml3 = newhtml3.replace('%panchEnd%',panchEnd);
                       
                        document.querySelector('.user1').insertAdjacentHTML('beforeend' , newhtml);
                         document.querySelector('.phone1').insertAdjacentHTML('beforeend' , newhtml1);
                         document.querySelector('.email1').insertAdjacentHTML('beforeend' , newhtml2);
                         document.querySelector('.table1').insertAdjacentHTML('beforeend' , newhtml3);
                  
            
            })
            .catch((error) => {
                console.log("reset client error-------",error);
           });
        
        });
       
    
        }
       
        
        
        
    }
