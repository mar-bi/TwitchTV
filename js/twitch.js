$(document).ready(function(){
	var regular_users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
	
// get data from API and present data in html
	var endpoint1 = "https://api.twitch.tv/kraken/streams/";
	var endpoint2 = "https://api.twitch.tv/kraken/channels/";
	var ID = "qhktgo8idsuq9ja9fxikhzc1qea4lj";

		
//request for user's channels
	regular_users.forEach(function(element){
		var link1 = endpoint1 + element + '/';
		var user_logo = '';
	    var status = '';
	    var user_name = '';
	    var link_to_user = '';

		$.ajax({
			type: 'GET',
			url: link1,
      		dataType : "json",
      		headers: {
      			'Client-ID': ID
      		},
      		success: function(data) {
        		if (data.stream === null){
        			//launch another request
        			$.ajax({
						type: 'GET',
						url: endpoint2 + element + '/',
	      				dataType : "json",
	      				headers: {
			      			'Client-ID': ID
			      		},
	      				success: function(data) {
	        				//checking for logo
	        				if (data.logo === null) {
	        					user_logo = '<img src="img/logo.png" alt="User Logo">';	
	        				}
	        				else {
	        					user_logo = '<img src="' + data.logo + '" alt="User Logo">';
	        				}
	        				
	        				user_name = '<h3>' + data['display_name'] +'</h3>';
	        				link_to_user = 'href="' + data.url + '"';

	        				$('div.list-channels').append('<div class="channel offline">' + user_logo + '<a ' + link_to_user + ' target="_blank">' 
	        					+  user_name + '</a>' + '<p class="aside">Offline</p>' + '</div>');
	        				
	        			},
			        	error: function(err){
			        		//adding info for non-existent users
							status = '<p class="status">Unable to find channel for ' + element + '</p>';
	        				user_name = '<h3>' + element + '</h3>'; 
	        				$('div.list-channels').append('<div class="channel nonexistent">' +  user_name +  status  +  '</div>');
						}
			        }); // end of ajax
        		}
        		else {
        			//checking for logo
        			if (data.stream.channel.logo === null) {
    					user_logo = '<img src="img/logo.png" alt="User Logo">';	
    				}
    				else {
    					user_logo = '<img src="' + data.stream.channel.logo + '" alt="User Logo">';
    				}
    				// checking for status
    				if (data.stream.channel.status === null) {
    					status = '';	
    				}
    				else {
    					status = '<p class="status">' + data.stream.channel.status +'</p>';
    				}
        			
	        		user_name = '<h3>' + data['stream']['channel']['display_name'] +'</h3>';
	        		link_to_user = 'href="' + data.stream.channel.url + '"';
	        		
	        		$('div.list-channels').append('<div class="channel online">' + user_logo + '<a ' + link_to_user + ' target="_blank">' +  user_name + '</a>' + 
	        			'<p class="aside">Online</p>' + status + '</div>');
        		}
        	},
        	error: function(){
				console.log("Error getting data");
			}
        	
		}); // end of ajax
	});
	
	
// filtering data on click
$('button#all').on('click', function(){
	$('div.channel').show('fast');
});

$('button#online').on('click', function(){
	$('div.offline').hide('fast');
	$('div.nonexistent').hide('fast');
	$('div.online').show('fast');

});
$('button#offline').on('click', function(){
	$('div.online').hide('fast');
	$('div.nonexistent').hide('fast');
	$('div.offline').show('fast');
});

// search by channel name
$('#search-chan').keypress(function(evt){
		//console.log("hello");
		var pressed = evt.which;
		if (pressed === 13) {
			var user_data = $('input#search-chan').val();
			console.log(user_data.toLowerCase());
			var search = 'h3:contains(' + user_data + ')';
			console.log(search);
			$('div.channel').hide('fast');
			console.log($(search).parent());
			$(search).parent().parent().show('fast');
		}
		
	});



}); // end of document.ready
