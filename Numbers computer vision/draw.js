  ///////////////////////////////
 // functions                 //
///////////////////////////////

function contributor(){
  if(!localStorage.name){
     let name = prompt('please give a name')
     localStorage.name = name
  }
}


async function api2(data){
  console.log('contacting API');
  document.getElementById('saving').style.backgroundColor = "orange";
  document.getElementById('outputs').innerHTML = "sending to servers..."
  // console.log(data)
  // console.log(data)
  console.log("this one!!!!")
  console.log(JSON.stringify(data))


await fetch("http://127.0.0.1:5000/pp", {
    method:'POST',
    body: JSON.stringify(data),
    Cache: 'default'
  }).then(response => 
  {document.getElementById('saving').style.backgroundColor = "green";
  document.getElementById('outputs').innerHTML = 'sent to server =) send me MORE!';

  }
  ).then(response => 
    console.log(response)).catch(error =>{ 
    document.getElementById('saving').style.backgroundColor = "red";
    document.getElementById('outputs').innerHTML = 'server ERROR come back later';
    console.log(error)}
    )
  
  nextNumber()
  clear_all();
}





function clear_all(){
    context.clearRect(0,0,canvas.width,canvas.height);
    paint_or_erase = 'painting';
    erase_button.classList.remove('mode_on')
    draw_button.classList.add('mode_on');
}

//
function nextNumber(){
    console.log('next number')
    width = Math.floor(Math.random()*10 +3);
    const number = Math.floor(Math.random()*10);
    document.getElementById('task').innerHTML = number;
}


// async function to 
function save(){
    localStorage.setItem("lastsave1", canvas.toDataURL());
// add API call here 
console.log('api_called');
let url = canvas.toDataURL().split(',')[1]
// console.log(url)
api2({"contributor":localStorage.name,
      "number":`${document.getElementById('task').innerHTML}`,
      "url":url,
      "time":''})
}


// placeholder function for server API 
const sleep = ms =>{
    return new Promise(resolve => setTimeout(resolve,ms))
  }
//replace with API call
const a = 1;
 
  ///////////////////////////////////////////
 // setting starting parameters variables //
///////////////////////////////////////////
let canvas_width = document.getElementById('container').offsetWidth;   
    
let canvas_height = document.getElementById('container').offsetHeight; 
//window.alert(canvas_width);
let color = document.getElementById('color_choice');
let color_picked = 'black';   


    
//painting/erasing
let paint = false;
//painting or erasing
let paint_or_erase = 'painting';
// get canvas and context
let canvas = document.getElementById('paint');
canvas.height = canvas_height;
canvas.width = canvas_width;
let context = canvas.getContext('2d');
context.stroke();
//get canvas container
let container = document.getElementById('paint');
// mouse position
let mouse = {x: 0,y: 0};   
let width = 3


//set drawing parameters
context.lineWidth = width;
context.lineCap = 'round';
context.lineJoin = 'round';

// set up first number 
nextNumber()
//check if contributor given
contributor()
  ///////////////////////////////////////////
 // Addign event listeers to controll app //
///////////////////////////////////////////


container.addEventListener('mouseout', function(e){
  if(paint){
    paint = false;
  }
  });




container.addEventListener('touchstart',function(e){

    // prevents default behaviour and allows for sustained touch/pointer events.
    e.preventDefault();
    paint = true;
    context.beginPath();
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    //console.log(mouse.x,mouse.y);
    context.moveTo(mouse.x,mouse.y);
})

container.addEventListener('mousedown',function(e){

  paint = true;
  context.beginPath();
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
  //console.log(mouse.x,mouse.y);
  context.moveTo(mouse.x,mouse.y);
})
    
/// buttons to toggel erase and paint
// grabbed s variables to save time
let draw_button = document.getElementById('draw')
draw_button.classList.add('mode_on');
let erase_button = document.getElementById('erase');
let save_button = document.getElementById('save');


erase_button.addEventListener('click',function(e){
  //window.alert('hi');
    // paint_or_erase = 'erasing';
    // this.classList.add('mode_on');
    // draw_button.classList.remove('mode_on');
    clear_all()
})
    
draw_button.addEventListener('click',function(e){
  //window.alert('hello');
  paint_or_erase = 'painting';
  // this.classList.add('mode_on');
  // erase_button.classList.remove('mode_on');
})
    
save_button.addEventListener('click',function(e){
     //let saveState = canvas.innerHTML;
save()

// window.prompt(canvas.toDataURL())
// prompt("Copy to clipboard: Ctrl+C, Enter", canvas.toDataURL());

})
    

// erase_button.addEventListener('dblclick',function(){clear_all()})
    
container.addEventListener('pointermove',function(e){
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    if(paint == true){
        
        if(paint_or_erase == 'painting')
        {
        context.lineWidth = width;
        context.strokeStyle = color_picked;    
        }
        
        else{ 
            context.strokeStyle = 'white';
            context.lineWidth =  30;
        }
        
    context.lineTo(mouse.x,mouse.y);
    context.stroke();
    }
});
    
container.addEventListener('pointerup',function(e){
    paint = false;
})

document.addEventListener('keydown', (e)=>{
  if(e.key == 'Enter'){
    save()
    // window.alert(e.key);
  }
})
