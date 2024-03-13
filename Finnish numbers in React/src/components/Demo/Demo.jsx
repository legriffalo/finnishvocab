import useSound from 'use-sound';

export default function Demo({number,phonetics,written, soundAddress}){
    
        // returns a function to play audio
        // array destructuring used to get 1st element (function we want) 
        // as it returns an array with meta data too =)
        const [playSound] = useSound(soundAddress);
        //playSound is ow a const storig the required function to play audio
       
    

    return(
        <div class = 'demo'>
            <p>{number}: Pronounced as <span >{phonetics}</span> <br/>
            spelt as: <span >{written}</span></p><br/>
            
            
            {/*
            This button uses the const playSound which stores the 
            required function to play audio 
            */}
            <button onClick= {playSound}>Press to listen</button>

        </div>
    )


}
