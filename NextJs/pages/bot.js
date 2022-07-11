import React,{useState,useEffect,useRef} from "react"
import Board from "../components/Board"
import ScoreBoard from "../components/ScoreBoard"
import {Howl} from "howler"
import Head from 'next/head'
import Script from "next/script"
export default function Single() {

  //For all buttons
  const [buttons,setButtons]=useState(["","","","","","","","",""])

  //To put colors and animations on endGame
  const [buttonsCond,setButtonsCond]=useState(["","","","","","","","",""])

  //For Score...
  const score1= useRef(0);
  const score2= useRef(0);
  const draw=useRef(0);
  //The play
  const [whoWon,setWhoWon] =useState("");
  const [botFirstTurn,setBotFirstTurn]=useState(false)

  const soundPlay=(src)=>{
    const sound= new Howl({
      src:src,
      html5:true,
    })
    sound.play();
  }
  //Check the game if someone won or...
  useEffect(()=>{
    let  conditions=[buttons[0]+buttons[1]+buttons[2],buttons[3]+buttons[4]+buttons[5],buttons[6]+buttons[7]+buttons[8],buttons[0]+buttons[3]+buttons[6],buttons[1]+buttons[4]+buttons[7],buttons[2]+buttons[5]+buttons[8],buttons[0]+buttons[4]+buttons[8],buttons[2]+buttons[4]+buttons[6]];
    const conditionsObject={
      0:[1,2,3],
      1:[4,5,6],
      2:[7,8,9],
      3:[1,4,7],
      4:[2,5,8],
      5:[3,6,9],
      6:[1,5,9],
      7:[3,5,7]
    }
    for (let x in conditions){
      if (conditions[x]==="OOO" || conditions[x]==="XXX"){
        setWhoWon(conditions[x].charAt(0));
        if (conditions[x]==="OOO"){score2.current++}
        else{ score1.current++}
        for (let btnnmb of conditionsObject[x]){
          let here= buttonsCond;
          here[btnnmb-1]="win";
          setButtonsCond([...here]);
          
        }
        return "";
      }
    }
    for(let x of conditions){
      if (x.length!==3){
        return "";
      }
    }
    setWhoWon('draw');
    draw.current++;
    return "";
  },[buttons[0]+buttons[1]+buttons[2],buttons[3]+buttons[4]+buttons[5],buttons[6]+buttons[7]+buttons[8],buttons[0]+buttons[3]+buttons[6],buttons[1]+buttons[4]+buttons[7],buttons[2]+buttons[5]+buttons[8],buttons[0]+buttons[4]+buttons[8],buttons[2]+buttons[4]+buttons[6]])
  

  //To decide if bot should strat first or no 
  useEffect(()=>{
    for(let button of buttons){
      if(button!=""){
        return ""
      }
    }
    if(botFirstTurn==true){
      botPlay();
      setBotFirstTurn(false)
    }else{
      setBotFirstTurn(true)
    }
  
  },[buttons])

  //update text to buttons 
  function changeVal(e){
    if (buttons.every((button)=>{return button!="" }) || whoWon!=""){
      setButtons(["","","","","","","","",""]);
      setButtonsCond(["","","","","","","","",""]);
      setWhoWon("")

    
      return ""
    }
    else if (e.target.innerHTML!==""){
      return "";
    }
    soundPlay("pop.mp3")
    changeButtonVal(e.target.id,"X").then(()=> setTimeout(()=> botPlay(),100))
   
    
  }
  function botPlay(){
    soundPlay("pop.mp3")
    let  conditions=[buttons[0]+buttons[1]+buttons[2],buttons[3]+buttons[4]+buttons[5],buttons[6]+buttons[7]+buttons[8],buttons[0]+buttons[3]+buttons[6],buttons[1]+buttons[4]+buttons[7],buttons[2]+buttons[5]+buttons[8],buttons[0]+buttons[4]+buttons[8],buttons[2]+buttons[4]+buttons[6]];
    const conditionsObject={
      0:[1,2,3],
      1:[4,5,6],
      2:[7,8,9],
      3:[1,4,7],
      4:[2,5,8],
      5:[3,6,9],
      6:[1,5,9],
      7:[3,5,7]
    }
    for(let letters of ["OO","XX"]){
      for(let condition in conditions){
        if (conditions[condition]==letters){
          for(let buttonnmb of conditionsObject[condition]){
            if(eval(`buttons[${buttonnmb-1}]`)==""){
              changeButtonVal(buttonnmb,"O")
              return ""
            }
          }
        }
      }
    }
    if (buttons==["","","","","","","","",""]){ changeButtonVal(5,"O")}
    else {
    
      let randomNumber= Math.floor(Math.random() * (9 - 1 + 1) + 1)
      while (buttons[randomNumber-1]!=""){
        randomNumber= Math.floor(Math.random() * (9 - 1 + 1) + 1);
        if(buttons[randomNumber-1]=="" || (buttons[0]!="" && buttons[1]!="" && buttons[2]!="" && buttons[3]!="" && buttons[4]!="" && buttons[5]!="" && buttons[6]!="" && buttons[7]!="" && buttons[8]!="" )){break}
      }
      
      if(! (buttons[0]!="" && buttons[1]!="" && buttons[2]!="" && buttons[3]!="" && buttons[4]!="" && buttons[5]!="" && buttons[6]!="" && buttons[7]!="" && buttons[8]!="" )){
        changeButtonVal(randomNumber,"O")
      }
    }

    
    
    
  }
  async function changeButtonVal(nmb,letter){
    let here = buttons;
    here[ parseInt(nmb)-1]= letter;
    setButtons([...here]);

  }


  return (

  <div className="bg-black h-screen flex flex-wrap user-none select-none justify-center items-center ">
      <Head>
        <title>XO Game- Play Against Bot!</title>
        <meta name="description" content="XO Play Against a bot- Hard level Bot!! Dont miss out the online multiplayer though ! " />
        <link rel="icon" href="/Tic.ico" />
      </Head>
      <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4230105514569476" /> 
      <div className="w-full  lg:w-1/4  xl:w-1/4 md:w-1/4 "></div>
      <div className="w-full  lg:w-2/4  xl:w-2/4 md:w-2/4  ">
        
        <Board whoWon={whoWon} button1Cond={buttonsCond[0]} button2Cond={buttonsCond[1]} button3Cond={buttonsCond[2]}  button4Cond={buttonsCond[3]} button5Cond={buttonsCond[4]} button6Cond={buttonsCond[5]} button7Cond={buttonsCond[6]} button8Cond={buttonsCond[7]} button9Cond={buttonsCond[8]} button1={buttons[0]} button2={buttons[1]} button3={buttons[2]} button4={buttons[3]} button5={buttons[4]} button6={buttons[5]} button7={buttons[6]} button8={buttons[7]}  button9={buttons[8]}  changeVal={changeVal}/>
        <ScoreBoard player1="Player 1(X)" player2="Computer (O)" score1={score1.current} draw={draw.current} score2={score2.current} whoWon={whoWon}/>
      </div>
      
      <div className="w-full  lg:w-1/4  md:w-1/4 xl:w-1/4"></div>
  </div>

  );
}