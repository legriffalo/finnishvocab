async function api2(){
    console.log('contacting API');
    // document.getElementById('test').style.backgroundColor = "orange";
    // document.getElementById('test0').innerHTML = "contacting servers..."

    // console.log(JSON.stringify(data))
  let url = "https://ostxhudqjbkevpucipke.supabase.co"
  let api_key ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zdHhodWRxamJrZXZwdWNpcGtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyOTU2OTMsImV4cCI6MjAzMzg3MTY5M30.5Q0ZBFjRPjxO3b8nth97HV8pwZCrZMcOlMuE19onWCM"

  await fetch(url, {
      headers: {
        "apikey": api_key,
        "supabaseKey":api_key,
        "Authorization": `Bearer ${api_key}`,
        // "password":api_key,
        // "apiKey":api_key,
        // "anon":api_key,
        // "database":"Finnish vocab"
      },
    
      // mode:'no-cors',
      method:'POST',
      body: 'SELECT * FROM "Finnish vocab".infin',
      // Cache: 'default'
    }).then(response => 
    {
    // document.getElementById('saving').style.backgroundColor = "green";
    // document.getElementById('outputs').innerHTML = 'sent to server =) send me MORE!';
    console.log("data received")
    }
    ).then(response => 
      console.log(response)).catch(error =>{ 
    //   document.getElementById('saving').style.backgroundColor = "red";
    //   document.getElementById('outputs').innerHTML = 'server ERROR come back later';
      console.log(error)}
      )
  }
  
  



api2()
//   // async function to 
//   function save(){
//       localStorage.setItem("lastsave1", canvas.toDataURL());
//   // add API call here 
//   console.log('api_called');
//   let url = canvas.toDataURL().split(',')[1]
//   // console.log(url)
//   api2({"contributor":localStorage.name,
//         "number":`${document.getElementById('task').innerHTML}`,
//         "url":url,
//         "time":''})
//   }

 