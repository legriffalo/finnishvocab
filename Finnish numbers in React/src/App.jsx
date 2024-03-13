import { useState } from 'react';
import Nav from './components/Buttons/Nav.jsx';
import Demo from './components/Demo/Demo.jsx'
import { FINNISH_NUMBERS } from '../data.js';



export default function App(){
  // handles the entire app state as extensive as that becomes =) 
  const [appState, setAppState] = useState([{selected:null}])
  
  // user options for which activity they want to do
  const options = {choices:['Learn the basics','Explore','play'],
                   addresses:['a','b','c']
                  }

  // const sleep = (delay) =>{
  //   new Promise((resolve)=>setTimeout(resolve, delay))
  // }

  // change app state depending on choice
  function handleChoice(choice,address){
    // console.log(choice);
    // console.log(address);
    setAppState((appState)=>(appState = [{selected:choice}]))
   console.log(appState)
  }

const sleep = ms =>{
  return new Promise(resolve => setTimeout(resolve,ms))
}

const showNumber = async (delay,number) =>{
  return await sleep(delay).then(v=>{
    document.getElementById('fruity').innerHTML = number;})
  }

const fruity = async()=>{
  
  let rand = Math.floor(Math.random()*30);
  for(let i = 0; i<=rand; i++){

    let number = i%10;
    let delay = 100 + 600*1.5**(i-rand)
    console.log(delay)
    await showNumber(delay,number).then(v=>{})

}
}

  
  //
  //   // random number generator
  // const randomNumber = async()=> {
  //     let rand = Math.floor(Math.random()*30);
  //     console.log(rand);
  //     console.log('');

  //     let numberShown = 0;

  //     for(let i = 0; i<=rand; i++){

  //      await sleep(500)
  //      console.log('yo',i)

  //       // const p = new Promise(
  //       //   function(resolve, reject){

  //       //   setTimeout(()=>{
  //       //     console.log(numberShown)

  //       //     },1000)
  //       //     const numberShown = i%10;

  //       //       //update box and use setTimeout to make appearance of fruity.
          
  //       //   resolve("bob");
  //       //   reject();
  //       //   }
  //       // );

  //       // promise.then(
          
  //       //   function(value){
  //       //   document.getElementById('fruity').innerHTML = value;},
  //       //   function(error){
  //       //   console.log(error)}
  //       // )
  //   }
  // }  





  function whatContent(appState){
    const state = appState[0];
    const selected = state.selected;

    // console.log('look here')
    // console.log(selected)
    // console.log(selected == options.choices[0])
    let inside = '';

    if (!selected){
      
      inside = <p>Make a choice yo!</p>;
    } 
    if(selected == options.choices[0])

    // Section to show all the numbers and their recordings
    {
    console.log(FINNISH_NUMBERS[0])
     inside = FINNISH_NUMBERS.map((item)=>(
      <Demo key = {item.number}
            number = {item.number}
            phonetics = {item.Pronunciation}
            written = {item.written}
            soundAddress = {item.audio} /> 
     )) }

   if(selected == options.choices[1]){ 
    inside =  <p>poop</p>
   }
   else{}
   if(selected == options.choices[2]){
    inside =  <p>egg</p>
   }
   return inside
  }





  // return to render the entire web app
  return(
  <>
<Nav prompt = 'What do you want to do today?'  options = {options} handleClick = {handleChoice} />

{whatContent(appState)}

<button onClick ={fruity}>push</button>
<div id = 'fruity'></div>
</>
  )
}
