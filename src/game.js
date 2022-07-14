import React, { Component } from 'react';
function Square(props){

  let btn 
  if((props.dispWinline)){
    btn = <button className='square' onClick={ props.onClick } style={{color: 'red'}}>{props.value}</button>
  }else{
    btn = <button className='square' onClick={ props.onClick }>{props.value}</button>
  }

  return(
    <>{btn}</>
  )
}
//////////////////////////////////////////////////////////

class Board extends React.Component{
  //ボード内の各マス目をレンダー
  renderSquare(row,col,winline){
    let dispWinline = false
    dispWinline = winline == null?  false :this.props.winline.some(elm => elm[0]===row && elm[1]===col) 
    return( 
      <Square
        value = { this.props.squares[row][col] }
        onClick = { () => {this.props.onClick(row,col)} } 
        squares = { this.props.squares }
        dispWinline = { dispWinline }
      />
    )
  }
  //ボード部分のレンダー
  render() { return (
    <div>
      {this.props.squares.map((row,row_index) => {
        return( 
          <div className="board-row" key={row_index}>
            {
              row.map((col,col_index) => { return (
                <React.Fragment key={col_index}>
                  { this.renderSquare(row_index,col_index,this.props.winline) }
                </React.Fragment>
              )})
            }
          </div>
        )
        })
      }
    </div>
  )}
}
//////////////////////////////////////////////////////////

export default class Game extends Component {
  //コンストラクタ
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          //squares: Array(3).fill(Array(3).fill(null))
          squares: [[null,null,null],[null,null,null],[null,null,null]]
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      historyOrder: "desc",
      historyJump:false,
    };
  }
  //ボタン押下時のアクション
  handleClick(row,col) {
//    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current,history
    if(this.state.historyOrder==="desc"){ 
      history = this.state.history.slice(0, this.state.stepNumber + 1);
      current = history[this.state.stepNumber] 
    }else{ 
      if(this.state.historyJump){
        history = this.state.history.slice(this.state.stepNumber,this.state.history.length);
        current = history[(this.state.history.length-1) - this.state.stepNumber] 
      }else{
        history = this.state.history.slice(0, this.state.stepNumber + 1);
        current = history[(history.length-1) - this.state.stepNumber]
      }
    }
    
    const squares = current.squares.map( elm => { return[...elm]});
    
    if (calculateWinner(squares) || squares[row][col]) {
      return;
    }
    squares[row][col] = this.state.xIsNext ? "X" : "O";

    let newHistory
    if (this.state.historyOrder === "desc"){
      newHistory = history.concat([{squares: squares}])
    }else{
      newHistory = [{squares: squares}].concat(history)
    }

    this.setState({
      history: newHistory,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      historyJump:false
    });
  }
  //履歴参照時のアクション
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      historyJump:true
    });
  }
  changeOrder(){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const his_rev = history.reverse()
    this.setState({
      history:his_rev.concat(),
      historyOrder:this.state.historyOrder==="desc"? "asc" : "desc",
      historyJump:false
    }) 
  }

  render() {
    //////////////////////////////////////Data///////////////////////////////////////////////
    const history = this.state.history
    
    let current
    if(this.state.historyOrder==="desc"){ 
      current = history[this.state.stepNumber] 
    }else{ 
      if(this.state.historyJump){
        current = history[this.state.stepNumber] 
      }else{
        current = history[(history.length-1) - this.state.stepNumber]
      }
    }
    
    const winner = calculateWinner(current.squares)
    const moves = history.map( ( step, move ) => {

      let desc,btn
      //降順の場合 
      if (this.state.historyOrder === "desc"){
        desc = move ? 'Go to move #' + move : 'Go to game start'
        if(move === this.state.stepNumber){
          btn = <button className='w-48 mb-4 p-2 rounded-lg bg-green-400 hover:bg-green-500 font-bold text-white shadow-lg shadow-indigo-200 transition ease-in-out duration-200 translate-10' onClick={() => this.jumpTo(move)} style={{color: 'red'}}>{desc}</button>
        }else{
          btn = <button className='w-48 mb-4 p-2 rounded-lg bg-green-400 hover:bg-green-500 font-bold text-white shadow-lg shadow-indigo-200 transition ease-in-out duration-200 translate-10' onClick={() => this.jumpTo(move)}>{desc}</button>
        }
      //昇順の場合  
      }else{
        desc = (move === this.state.stepNumber) ? 'Go to game start' : 'Go to move #' + (this.state.stepNumber - move)
        if(move === ((history.length - 1) - this.state.stepNumber)){
          btn = <button onClick={() => this.jumpTo(move)} style={{color: 'red'}}>{desc}</button>
        }else{
          btn = <button onClick={() => this.jumpTo(move)}>{desc}</button>
        }  
      }

      return (
        <li key={move}>
          {btn}
        </li>
      )
    })

    let status,winline;
    if(winner){
      status = 'Winner:' + winner.player;
      winline = winner.line;
    }else if(this.state.stepNumber===9){
      status = '引き分けです！'
    }else{
      status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O')
    }
    //////////////////////////////////////Render///////////////////////////////////////////////
    

    return (
      <div className="flex flex-col">
        <h1 className='ml-6 font-sans text-4xl text-sm font-medium text-gray-700'>3目並べゲーム</h1>
        <div className="flex justify-center mt-4">
          <Board 
            squares={current.squares}
            onClick={(row,cow) =>{this.handleClick(row,cow)}}
            winline={winline}
          />
          <div className="game-info">
            <div className='flex flex-row space-x-4'>
              <div className='font-sans text-4xl text-sm font-medium text-gray-700'>{status}</div>
              <button className="bg-blue-700 font-semibold text-white py-2 px-4 rounded" onClick={() => this.changeOrder()}>並び替え↑↓</button>
            </div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }

}
//結果判定メソッド
function calculateWinner(squares) {
  const lines = [
    [[0,0], [0,1],[0,2]],
    [[1,0], [1,1],[1,2]],
    [[2,0], [2,1],[2,2]],
    [[0,0], [1,0],[2,0]],
    [[0,1], [1,1],[2,1]],
    [[0,2], [1,2],[2,2]],
    [[0,0], [1,1],[2,2]],
    [[0,2], [1,1],[2,0]],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [[a0,a1], [b0,b1], [c0,c1]] = lines[i];
    if (squares[a0][a1] && (squares[a0][a1] === squares[b0][b1]) && (squares[a0][a1] === squares[c0][c1])) {
      return {player: squares[a0][a1], line: [[a0,a1], [b0,b1], [c0,c1]]};
    }
  }
  return null;
}