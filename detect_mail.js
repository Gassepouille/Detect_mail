(function($){
	$.fn.detect_mail= function(options){
		//---------------------------------------------------------------------------------------------------------------------------------------------------------options par d�fauts
		var settings=$.extend({
			popup : false,
			newtab : false,
			color : "#43494d",
			backgroundColor : "#aaa",
			border : "1px solid #888",
			colorhover : "#43494d",
			backgroundColorhover : "#ddd",
			mailcolor : "#000",
			mailstyle : "italic",
		}, options);
		
		var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		
		
		//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------recherche des mails dans tout le body			
			
			$(this).each(function(){
				var enfants=$(this).children();
				var tabstring=[];
				
				for (k=0;k<enfants.length;k++){
				
					var string=$(enfants[k]).html();
					var stringArray=string.split(" ");
					
					for (i=0;i<stringArray.length;i++){			
						if (stringArray[i].search(emailRegEx)== -1){
						
						
							var stringArray2=stringArray[i].split("	");
							for (m=0;m<stringArray2.length;m++){
								if (stringArray2[m].search(emailRegEx)== -1){
									var stringArray3=stringArray2[m].split("\n");
									for (n=0;n<stringArray3.length;n++){
										if (stringArray3[n].search(emailRegEx)== -1){
										}else{
											stringArray3[n]="<span class='mail'>"+stringArray3[n]+"</span>";
										}
									}	
									var string3=stringArray3.join("\n");
									stringArray2[m]=string3;
								}else{
									stringArray2[m]="<span class='mail'>"+stringArray2[m]+"</span>";
								}							  
							}
							var string2=stringArray2.join("	");
							stringArray[i]=string2;
							
							
						}else{
							stringArray[i]="<span class='mail'>"+stringArray[i]+"</span>";
						}
					} 
					string=stringArray.join(" ");
					tabstring=tabstring.concat(string);
				}
				for (l=0;l<enfants.length;l++){
				  $(enfants[l]).empty();
				  $(enfants[l]).append(tabstring[l]); 
				} 
			});  
			
			//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------recursive pour trouver les mails esseul�s
			
			recursive($(this));
			
			function recursive(a){

				if (a.children().length > 0){
					
					a.children().each(function(){
						recursive($(this));
					});
				}else{
					var string=a.text();
					var stringArray=string.split(" ");
					
					for (i=0;i<stringArray.length;i++){
						if (stringArray[i].search(emailRegEx)== -1){
						}else{
							stringArray[i]="<span class='mail'>"+stringArray[i]+"</span>";
						}
					} 
					string=stringArray.join(" ");
					a.empty();
					a.append(string);
				}
			}
			
		//------------------------------------------------------------------------------------------------------------------------------------------------------------css du mail	
		
			$(".mail").css({
				fontStyle : settings.mailstyle,
				color : settings.mailcolor,
			});
			$(".mail").hover(function(){
				$(this).css({
					cursor :"pointer",
				});
			});
		
		
		
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------fonction de click
		$("body").on("click", ".mail" , function(e){
		//---------------------------------------------------------------------------------------------------------------------------------------------------------------reset du menu des webmessageries
			$("#mailMenu").remove();
			
		
		//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------r�cup�ration du mail dans une variable
			var selectedMail=$(this).text();
		
		//---------------------------------------------------------------------------------------------------------------------------------------------------------------------cr�ation du menu 
			var mailmenu=document.createElement("div");
			
			$(mailmenu).css({
				width : "138px",
				height : "89px",
				backgroundColor : settings.backgroundColor,
				position: "absolute",
				top : e.pageY+"px",
				left : e.pageX+"px",
				borderRadius: "3px",
				border : settings.border,
				boxShadow : "2px 2px 2px #444"		
			}).attr('id','mailMenu');
			$("body").append(mailmenu);
			//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------Gestion du popup			
					
			
			if(settings.popup==true){
				var docheight=$(document).height();
				var docwidth=$(document).width();
				var selectedMailMenu= "<div id='menuGmail'>Gmail</div><div id='menuHotmail'>Hotmail</div><div id='menuYahoo' >Yahoo</div>";
				$("body").on("click", "#menuGmail", function(){
					window.open('https://mail.google.com/mail/?view=cm&fs=1&tf=1&to='+selectedMail,'Compose Mail','scrollbars=auto,width=600,height=600,top=175,left=175,status=yes,resizable=yes,toolbar=no');
				});
						
					$("body").on("click", "#menuHotmail ", function(){
						window.open('http://hotmail.com/default.aspx?rru=compose&to='+selectedMail,'Compose Mail','scrollbars=auto,width=800,height=600,top=175,left=175,status=yes,resizable=yes,toolbar=no');
					});
					$("body").on("click", " #menuYahoo ", function(){
						window.open('http://compose.mail.yahoo.com/?To='+selectedMail,'Compose Mail','scrollbars=auto,width=1000,height=600,top=175,left=175,status=yes,resizable=yes,toolbar=no');
					});
					
					
					
					
				
			}else{
				//-----------------------------------------------------------------------------------------------------------------------------------------------------------------cr�ation des liens vers la webmessagerie
				var selectedMailMenu= "<a id='menuGmail' href='https://mail.google.com/mail/?view=cm&fs=1&tf=1&to="+selectedMail+"'>Gmail</a><a id='menuHotmail' href='http://hotmail.com/default.aspx?rru=compose&to="+selectedMail+"'>Hotmail</a><a id='menuYahoo' href='http://compose.mail.yahoo.com/?To="+selectedMail+"/'>Yahoo</a>";

			}
			$("#mailMenu").append(selectedMailMenu);
			// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------css du menu cr��
			$("#menuGmail").css({
					width : "120px",
					height : "23px",
					borderBottom : "1px solid #808080",
					textDecoration : "none",
					display : "block",
					marginTop : "3px",
					marginLeft : "3px",
					paddingLeft : "10px",
					color : settings.color,
					fontWeight : "bold",
					textShadow: "1px 1px 1px #fff",
					border : "1px solid #888",
					borderRadius: "2px",
					fontFamily : "Arial",
					fontSize : "12px",
					cursor : "pointer",
					lineHeight : "23px",
			});
			$("#menuHotmail").css({
					width : "120px",
					height : "22px",
					borderColor : "#808080",
					borderBottom : "1px solid #808080",
					borderTop : "1px solid #fff",
					textDecoration : "none",
					display : "block",
					marginLeft : "3px",
					marginTop : "3px",
					paddingLeft : "10px",
					paddingTop : "3px",	
					color : settings.color,
					textShadow: "1px 1px 1px #fff",
					border : "1px solid #888",
					borderRadius: "2px",
					fontWeight : "bold",
					fontFamily : "Arial",
					fontSize : "12px",
					cursor : "pointer",
					lineHeight : "18px",
			});
			$("#menuYahoo").css({
					width : "120px",
					height : "20px",
					borderTop : "1px solid #fff",
					textDecoration : "none",
					display : "block",
					marginLeft : "3px",
					marginTop : "3px",
					paddingLeft : "10px",
					paddingTop : "3px",
					color : settings.color ,
					textShadow: "1px 1px 1px #fff",
					border : "1px solid #888",
					borderRadius: "2px",
					fontWeight : "bold",
					fontFamily : "Arial",
					fontSize : "12px",
					cursor : "pointer",
					lineHeight : "18px",
			});
			
			
			//-------------------------------------------------------------------------------------------------------------------------------------------------------------CSS du hover
			
			$("#menuGmail").hover(
			  function () {
				$(this).css({backgroundColor : settings.backgroundColorhover ,color : settings.colorhover});
			  }, 
			  function () {
				$(this).css({backgroundColor : "transparent",color :  settings.color});
			  }
			);
			$("#menuHotmail").hover(
			  function () {
				$(this).css({backgroundColor : settings.backgroundColorhover,color :  settings.colorhover});
			  }, 
			  function () {
				$(this).css({backgroundColor : "transparent",color :  settings.color});
			  }
			);
			$("#menuYahoo").hover(
			  function () {
				$(this).css({backgroundColor : settings.backgroundColorhover,color :  settings.colorhover});
			  }, 
			  function () {
				$(this).css({backgroundColor : "transparent",color :  settings.color});
			  }
			);
			e.stopPropagation();
		});

		
		//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------suppression du menu si click � cot� 
		
		$("body").click(function(){
			$("#mailMenu").remove();
		});
 
	}
})(jQuery);