import React from 'react'


function Board(props) {

  return (
    <div className={props.whoWon=="draw" ? "mx-12 text-opacity-25" :`mx-12 ${props.waitingForPlayer ? "pointerNo opacity-10" : ""}`}>

        <div className="flex flex-wrap justify-center border-b-2 border-white  ">
            <button className={props.button1 ? `w-2/6 border-r-2 border-white  h-28 text-white fontT subpixel-antialiased text-8xl  ${props.button1Cond ? "text-blue-900 animate-win" : "animate-show"} ${props.button1Cond=="" && props.whoWon!="" ? "text-opacity-25 anim-pause": ""}` : 'w-2/6  border-r-2  border-white h-28'} onClick={props.changeVal} id={'1'}>{props.button1}</button>
            <button className={props.button2 ? `w-2/6 border-r-2 border-white  h-28 text-white fontT subpixel-antialiased text-8xl  ${props.button2Cond ? "text-blue-900 animate-win" : "animate-show"} ${props.button2Cond=="" && props.whoWon!="" ? "text-opacity-25 anim-pause": ""}` : 'w-2/6  border-r-2  border-white h-28'} onClick={props.changeVal} id={'2'}>{props.button2}</button>
            <button className={props.button3 ? `w-2/6 h-28 text-white fontT subpixel-antialiased text-8xl  ${props.button3Cond ? "text-blue-900 animate-win" : "animate-show"} ${props.button3Cond=="" && props.whoWon!="" ? "text-opacity-25 anim-pause": ""}` : 'w-2/6 h-248'} onClick={props.changeVal} id={'3'}>{props.button3}</button>
        </div>
        <div className="flex flex-wrap justify-center border-b-2 border-white">
            <button className={props.button4 ? `w-2/6  border-r-2 border-white h-28 text-white fontT subpixel-antialiased text-8xl ${props.button4Cond ? "text-blue-900 animate-win" : "animate-show"} ${props.button4Cond=="" && props.whoWon!="" ? "text-opacity-25 anim-pause": ""}` : 'w-2/6  border-r-2 border-white h-28'} onClick={props.changeVal} id={'4'}>{props.button4}</button>
            <button className={props.button5 ? `w-2/6  border-r-2 border-white h-28 text-white fontT subpixel-antialiased text-8xl ${props.button5Cond ? "text-blue-900 animate-win" : "animate-show"} ${props.button5Cond=="" && props.whoWon!="" ? "text-opacity-25 anim-pause": ""}` : 'w-2/6  border-r-2 border-white h-28'} onClick={props.changeVal} id={'5'}>{props.button5}</button>
            <button className={props.button6 ? `w-2/6  h-28 text-white fontT subpixel-antialiased text-8xl ${props.button6Cond ? "text-blue-900 animate-win" : "animate-show"} ${props.button6Cond=="" && props.whoWon!="" ? "text-opacity-25 anim-pause": ""}` : 'w-2/6 h-28'} onClick={props.changeVal} id={'6'}>{props.button6}</button>
        </div>
        <div className="flex flex-wrap justify-center ">
            <button className={props.button7 ? `w-2/6  border-r-2 border-white h-28 text-white fontT subpixel-antialiased text-8xl ${props.button7Cond ? "text-blue-900 animate-win" : "animate-show"}  ${props.button7Cond=="" && props.whoWon!="" ? "text-opacity-25 anim-pause": ""}` : 'w-2/6 border-r-2 border-white h-28'} onClick={props.changeVal} id={'7'}>{props.button7}</button>
            <button className={props.button8 ? `w-2/6  border-r-2 border-white h-28 text-white fontT subpixel-antialiased text-8xl ${props.button8Cond ? "text-blue-900 animate-win" : "animate-show"}  ${props.button8Cond=="" && props.whoWon!="" ? "text-opacity-25 anim-pause": ""}` : 'w-2/6 border-r-2 border-white h-28'} onClick={props.changeVal} id={"8"}>{props.button8}</button>
            <button className={props.button9 ? `w-2/6  h-28 text-white fontT subpixel-antialiased text-8xl ${props.button9Cond ? "text-blue-900 animate-win" : "animate-show"} ${props.button9Cond=="" && props.whoWon!="" ? "text-opacity-25 anim-pause": ""}` : 'w-2/6 h-28'} onClick={props.changeVal} id={"9"}>{props.button9}</button>
        </div>
    </div>
  )
}

export default Board