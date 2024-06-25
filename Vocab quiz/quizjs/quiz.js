//global variable to store currently select mixnd match element
selected = {"eword":"",
            "fword":""};

// function to jumble lists for matching activities
const randomise = (x)=>{
    let y = []
    while(x.length>0){
        y.push(String(x.splice(Math.floor(Math.random()*x.length-1),1)));
    }
    return y
};

const buildMatchem= (x,target)=>{
    let category = x;
    let words = vocab[category];
    let eWords = Object.keys(words);
    let fWords = Object.values(words);

    let randFin = randomise(fWords);

    for(let i = 0; i<eWords.length;i++){
        let englishWord = eWords[i];
        let finnishWord = randFin[i];
    
        console.log(englishWord,finnishWord)
        
        document.getElementById(target).innerHTML+=`<div class = "matchem_row">
        <div class = "selectable english_word ${x}" data-type="${x}">${englishWord}</div>
        <div class = "selectable finnish_word ${x}" data-type="${x}">${finnishWord}</div>
        </div>`;
    }
    
    return 1
}





// use two elements to check if they match
const checkMatch = (newSelection,selected)=>{
    // console.log(newSelection.innerHTML)
    newSelection.classList.contains("english_word")? selected["eword"]=newSelection:0;
    newSelection.classList.contains("finnish_word")? selected["fword"]=newSelection:0;

    // now check if the match is in the data provided
    // console.log(selected["eword"].dataset.type); 
    // console.log(selected["fword"].dataset.type);
    // console.log(selected);

    let english = selected["eword"].innerHTML;
    let finnish = selected["fword"].innerHTML;
    let type = selected["eword"].dataset.type;

    //if types match check correctness
    if(selected["eword"].dataset.type == selected["fword"].dataset.type){

        if(vocab[type][english]==finnish){
            console.log("MATCH MATCH MATCH");
            // need to add code to show correct
            selected["eword"].classList.add("correct");
            selected["fword"].classList.add("correct");


        }
        //if incorrect add to mistakes log
        else{
          console.log(learninglog) ;
          console.log("MATCHED type but not correct values");

          learninglog.errors.includes(english)? null :learninglog.errors.push(english);
          console.log(learninglog)  
        }
        // console.log("MATCHED type but not correct values");
    }
    console.log(selected)
    // console.log(newSelection,previousSelection);

}


buildMatchem("recall","recall_q")
buildMatchem("nouns","nouns_q")
buildMatchem("adjectives","adjectives_q")
buildMatchem("verbs","verbs_q")


//activate eventListeners
let selectables = document.getElementsByClassName("selectable");
for(let i = 0;i<selectables.length;i++){
    selectables[i].addEventListener("pointerdown",(e)=>{
        checkMatch(e.target,selected)
    })
}






