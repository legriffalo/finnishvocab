export default function Nav({prompt, options,handleClick}){
    const {choices,addresses} = options
    return(
    <>
        <p>{prompt}</p>
        
        {options['choices'].map((key,index)=>(
            <button onClick={()=> handleClick(choices[index],addresses[index])} key = {addresses[index]}>{choices[index]} {addresses[index]}</button>))}

    </>)
    
};