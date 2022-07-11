import React from 'react'

function ScoreBoard(props) {
  return (
    <div className='flex justify-center content-center mt-8'>
        <table  className='text-white w-2/4'>
            <thead>
                <tr>
                    <th className={props.whoWon=="X" ? "text-blue-900 font-black animate-pulse" : "text-white"}>{props.player1}</th>
                    <th>Draw</th>
                    <th  className={props.whoWon=="O" ? "text-blue-900 font-black animate-pulse" : "text-white"}>{props.player2}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th  className={props.whoWon=="X" ? "text-blue-900 font-black animate-pulse " : "text-white"}>{props.score1}</th>
                    <th>{props.draw}</th>
                    <th  className={props.whoWon=="O" ? "text-blue-900 font-black animate-pulse" : "text-white"}>{props.score2}</th>
                </tr>
            </tbody>
        </table>
    </div>

  )
}

export default ScoreBoard