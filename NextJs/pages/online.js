import React, {useEffect,useState} from "react";
import  io  from "socket.io-client";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import Head from 'next/head';
import Script from "next/script"
import {Howl} from "howler"

//const socket = io("http://localhost:3050/");
const socket = io("https://socketio-xoserver.herokuapp.com/");


var turn=false;
var score1=0;
var draw=0;
var score2=0;
function Online() {
    
    const [button1,setButton1]=useState("");
    const [button2,setButton2]=useState("");
    const [button3,setButton3]=useState("");
    const [button4,setButton4]=useState("");
    const [button5,setButton5]=useState("");
    const [button6,setButton6]=useState("");
    const [button7,setButton7]=useState("");
    const [button8,setButton8]=useState("");
    const [button9,setButton9]=useState("");
    const [buttonCond1,setButtonCond1]=useState("");
    const [buttonCond2,setButtonCond2]=useState("");
    const [buttonCond3,setButtonCond3]=useState("");
    const [buttonCond4,setButtonCond4]=useState("");
    const [buttonCond5,setButtonCond5]=useState("");
    const [buttonCond6,setButtonCond6]=useState("");
    const [buttonCond7,setButtonCond7]=useState("");
    const [buttonCond8,setButtonCond8]=useState("");
    const [buttonCond9,setButtonCond9]=useState("");
    
    
    

    const [createRoomBool,setCreateRoomBool]=useState(false);
    const [room,setRoom]= useState("");
    const [playerName1,setPlayerName1]=useState("");
    const [playerName2,setPlayerName2]=useState("");
    const [waitingForPlayer,setWaitingForPlayer]=useState(true);
    const [turnText,setTurnText]= useState("Opponent's Turn");
    
    
    


  


    //The play
    const [playing,setPlaying]= useState("");
    const [whoWon,setWhoWon] =useState("");
    const soundPlay=(src)=>{
      const sound= new Howl({
        src:src,
        html5:true,
      })
      sound.play();
    }

    useEffect(() => {
      
      socket.on("connect", (arg)=>{
      })
      socket.on("disconnect",(arg)=>{

        setRoom("");
        setCreateRoomBool(false);
        score1=0;
        score2=0;
        draw=0;
        turn=false;
        setWaitingForPlayer(true);
        setPlayerName1("");
        setPlayerName2("");
        setTurnText("Opponent's Turn");
        for(let i=1;i<10;i++){
          
          eval(`setButton${i}("")`)
          eval(`setButtonCond${i}("")`)
        }

      })
      socket.on("reset",(arg)=>{
        for(let i=1;i<10;i++){
          
          eval(`setButton${i}("")`)
          eval(`setButtonCond${i}("")`)
        }
        setWhoWon("")

      })
      socket.on("play",(nmb,playing)=>{
        soundPlay("pop.mp3")
        console.log(nmb+playing)
        eval(`setButton${nmb}("${playing}")`)
        if (turn==false){turn=true; setTurnText("Your Turn")}
        else{turn=false; setTurnText("Opponent's Turn")}
      });
      socket.on("playerJoined",(arg)=>{

        setWaitingForPlayer(false)
      })

      
  
    },[]);
    
    //Check the game if someone won or...
    useEffect(()=>{
      
      let  conditions=[button1+button2+button3,button4+button5+button6,button7+button8+button9,button1+button4+button7,button2+button5+button8,button3+button6+button9,button1+button5+button9,button3+button5+button7]
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
      if(whoWon==""){
        for (let x in conditions){
          if (conditions[x]==="OOO" || conditions[x]==="XXX"){
            
            setWhoWon(conditions[x].charAt(0));
            if (conditions[x]==="OOO"){score2++}
            else{ score1++}
            for (let btnnmb of conditionsObject[x]){
              eval(`setButtonCond${btnnmb}("win")`)
            }
            return "";
          }
        }
        for(let x of conditions){
          if (x.length!=3){
            return "";
          }
        }
        setWhoWon('draw');
        draw++;
        return "";
      }
    },[button1+button2+button3,button4+button5+button6,button7+button8+button9,button1+button4+button7,button2+button5+button8,button3+button6+button9,button1+button5+button9,button3+button5+button7])
    //update text to buttons 
  

    function changeVal(e){
      if ([button1,button2,button3,button4,button5,button6,button7,button8,button9].every((button)=>{return button!="" }) || whoWon!=""){
        socket.emit("reset","now");
        return ""
      }
      else if (e.target.innerHTML!==""){
        return "";
      }
      else if (turn==false){
        return "";
      }
      else{
        socket.emit("play",e.target.id,playing)
      }

    }
    function joinRoom(e){
      e.preventDefault();
      if(room!="" && playerName1!=""){
        socket.emit("create",room,playerName1)
        setCreateRoomBool(true) 
        socket.on("XorO",(arg,player1,player2)=>{
          if (playing==""){setPlaying(arg)}
          if (arg=="X"){turn=true;setTurnText("Your Turn")}

          setPlayerName1(player1);
          setPlayerName2(player2)
        })
      }


    }

           

  return (
    <div className="bg-black h-screen flex flex-wrap user-none select-none justify-center items-center ">
      <Head>
        
       
        <title>XO Game - play tictactoe online ! Check out all tictactoe modes!</title>
        <meta name="og:title"  content="XO Game - play tictactoe online ! Check out all tictactoe modes!" />
        <meta name="keywords"  content='x and o game, xo game online,  tictactoe online, tictactoe play, tictactoe game, google tictactoe, tictactoe 2 players' />
        <meta name="og:description" content="XO Online - play tictactoe online against a friend  with an easy room setup. @ahmad" />
        <meta name="description" content="XO Online - play tictactoe online against a friend  with an easy room setup. @ahmad" />
        <link rel="icon" href="/Tic.ico" />
      </Head>
      <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4230105514569476" /> 
          <div className="w-full  lg:w-1/4  xl:w-1/4 md:w-1/4 "></div>
          <div className="w-full  lg:w-2/4  xl:w-2/4 md:w-2/4  ">
            {createRoomBool 
              ?
                <div>
                   
                  {waitingForPlayer 
                    ? 
                    <div>
                      <h1 className="fontT text-xl text-center text-white "> Room Name: {room}</h1>
                      <h3 className="text-white text-xl fontT text-center animate-pulse mb-4"> Waiting for the other player .  .  .   </h3> 
                    </div>
                    :
                    <div>
                      <h1 className="text-white text-lg md:text-xl fontT text-center animate-pulse mb-4">Do not press when it is not your turn! </h1>
                      <h1 className="text-white text-xl fontT text-center animate-pulse"> {turnText}</h1>
                    </div>

                  }
                    
                    <Board waitingForPlayer={waitingForPlayer} whoWon={whoWon} button1Cond={buttonCond1} button2Cond={buttonCond2} button3Cond={buttonCond3}  button4Cond={buttonCond4} button5Cond={buttonCond5} button6Cond={buttonCond6} button7Cond={buttonCond7} button8Cond={buttonCond8} button9Cond={buttonCond9} button1={button1} button2={button2} button3={button3} button4={button4} button5={button5} button6={button6} button7={button7} button8={button8}  button9={button9}  changeVal={changeVal}/>
                    <ScoreBoard player1={playerName1+"(X)"} player2={playerName2+"(O)"} score1={score1} draw={draw} score2={score2} whoWon={whoWon}/>
                  </div>

              : 
              <div>
                <form onSubmit={joinRoom} className="flex flex-col justify-center items-center gap-8">
                  <p className='text-center text-white text-5xl font-bold  fontT'>Tic Tac Toe Online </p>
                  <input  onChange={(e)=> setRoom(e.target.value)} placeholder="Create or Enter Your room Code"  className="w-72 bg-transparent text-white border-2 border-white px-4 py-2 rounded-xl fontT"/>
                  <input  onChange={(e)=> setPlayerName1(e.target.value)} placeholder="Enter Your Name"  className="w-72 bg-transparent text-white border-2 border-white px-4 py-2 rounded-xl fontT "/>
                  <input type="submit" value="Create / Join"  className="text-white fontT border-2 border-white rounded-2xl px-4 py-2 hover:bg-white hover:text-black cursor-pointer "/>
                </form>
              </div>
            }
            
          </div>
          
          <div className="w-full  lg:w-1/4  md:w-1/4 xl:w-1/4"></div>
      </div>
  )
}

export default Online;