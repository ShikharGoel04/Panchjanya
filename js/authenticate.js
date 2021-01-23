function loginShow()

{
	if(localStorage.getItem("access_token") === null)
    {
		document.getElementById("login").style.display='block';
        document.getElementById("logout").style.display='none';
	}
	else if(localStorage.getItem("access_token"))
    {
		document.getElementById("login").style.display='none';
        document.getElementById("logout").style.display='block';
    }
 
}
function hideLoader() {
    $('#loading').hide();
}
function showButton(){
	document.getElementById("button").style.display='block';
	document.getElementById("otp1").style.display='block';
}
  
 
  function hideButton(){
	document.getElementById("otp").style.display='none';
  }
function authenticate()
{
	       
		var b=baseUrl();
		console.log(b);
 
	var phoneno = /^\d{10}$/;
	var phone=document.getElementById("phone");
	phone.disabled = true; 
	const ph=phone.value;

	if(!ph.match(phoneno))
	{
		phone.disabled = false; 
		alert("Enter valid 10 digit phone number");	
	}
	else
	{	
		var p='91';
		var pho=p.concat(ph);
		console.log(pho);
		// p=p+'9';
		// p=p+'1';
		// k=0;
		// for(i=2;i<12;i++)
		// {
		// 	p+=ph[k];
		// 	k++
		// }
	// console.log(p);
	//e.preventDefault();
	fetch(b+'profile/register',{
		method: 'POST',
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json'
		},
		body: JSON.stringify({
    username:pho,
    phone:pho,
  }),
   credentials: "same-origin"
})
 .then((response) => response.json())
 .then((responseJson) => {
     console.log(responseJson);
	
 })
 .catch((error) => {
     console.log("reset client error-------",error);
});
showButton();
hideButton();
}	
	}

	function otp()
	{
		var b=baseUrl();
		
		var otp1=document.getElementById("otp1");
		var phone=document.getElementById("phone");
		
		var status;
		var p='91';
		var pho=p.concat(phone.value);
		console.log(pho);
		//e.preventDefault();
		fetch(b+'profile/login',{
			method: 'POST',
			headers:{
				'Accept':'application/json',
				'Content-Type':'application/json'
			},
			body: JSON.stringify({
		username: pho,
		password: otp1.value
	  }),
	   credentials: "same-origin"
	})
	 .then((response) => response.json())
	 .then((responseJson) => {
		console.log(responseJson.access_token);
		if(responseJson.access_token)
		{
		// const token=btoa(responseJson.access_token);
		//  console.log(token);
		document.getElementById("loading").style.display='block';
		 window.localStorage.setItem("access_token", responseJson.access_token);
		 
		// loginShow();




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
			 
						   var orgSub=data['user']['is_orgSubscribed'];
						   var panSub=data['user']['is_pncSubscribed'];
						   if(orgSub || panSub)
						   {
							window.localStorage.setItem("magsub",1);
							window.location="news.html";
						   }
						   else{
							 window.localStorage.setItem("magsub",0);
							 window.location="news.html";
						   }

			   
			   })
			   .catch((error) => {
				   console.log("reset client error-------",error);
			  });





		/* have to fetch profile api here and store it on local storage   */

		 
		}
		else
		{
			alert("Enter correct OTP");
		}

		 
		})
	 .catch((error) => {
		 console.log("reset client error-------",error);
		 alert("Enter correct OTP");

	});
	$('#myModal').modal('hide');
	
	}
	
	
	
	function vid()
	{
		var access_token=localStorage.getItem("access_token");
		console.log(access_token);
		if(access_token)
		{
			window.location="video.html";
		}
		else
		{
			alert("Please login first");
		}
		
		
	}

	function magazine()
	{
		var access_token=localStorage.getItem("access_token");
		console.log(access_token);
		if(access_token)
		{
			var mag_sub=localStorage.getItem("magsub");
			if(mag_sub==1){
				window.location="magazine.html";
			}
			else if(mag_sub==0){
				alert("Please Subscribe!");
			}
			
		}
		else
		{
			alert("Please login first");
		}
		
		
	}

	function news()
	{
		var access_token=localStorage.getItem("access_token");
		if(access_token)
		{
			window.location="news.html";
		}
		else
		{
			alert("Please login first");
		}
	}

	function subscription()
	{
		var access_token=localStorage.getItem("access_token");
		console.log(access_token);
		if(access_token)
		{
			window.location="subscription.html";
		}
		else
		{
			alert("Please login first");
		}
		
		
	}
	function logout()
	{
		 localStorage.clear();
		
		 window.location="index.html";
		//  loginShow();
		 
	}



	