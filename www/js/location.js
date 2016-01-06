var gps = function()
{
		this.counter=1;
		this.init =function()
		{
			setInterval(navigator.geolocation.getCurrentPosition(this.handle_geolocation_query,this.handle_errors), 1000); 
		/*	navigator.geolocation.getCurrentPosition(this.handle_geolocation_query,this.handle_errors);*/
		}

		 this.handle_errors=function(error)
        {
            switch(error.code)
            {
                case error.PERMISSION_DENIED: alert("user did not share geolocation data");
                break;
 
                case error.POSITION_UNAVAILABLE: alert("could not detect current position");
                break;
 
                case error.TIMEOUT: alert("retrieving position timed out");
                break;
 
                default: alert("unknown error");
                break;
            }
        }
 
        this.handle_geolocation_query=function(position)
        {
            /*alert('Lat: ' + position.coords.latitude +
                  ' Lon: ' + position.coords.longitude);*/
			console.log(position.coords.latitude+" "+position.coords.longitude);
			setInterval(function(){ console.log(counter++);}, 1000);
        }
};


var geoObj = new gps();
