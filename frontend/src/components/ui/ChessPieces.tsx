import React from 'react'

interface ChessPieceProps {
  className?: string
}

export const WhiteKing: React.FC<ChessPieceProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 45 45" className={className} fill="currentColor">
    <g style={{fill:'none', stroke:'#000', strokeWidth:1.5, strokeLinecap:'round', strokeLinejoin:'round'}}>
      <path d="M22.5 11.63L22.5 6"/>
      <path d="m20 8 h5"/>
      <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" style={{fill:'#fff', stroke:'#000'}}/>
      <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10V37z" style={{fill:'#fff'}}/>
      <path d="M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0"/>
    </g>
  </svg>
)

export const BlackKing: React.FC<ChessPieceProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 45 45" className={className} fill="currentColor">
    <g style={{fill:'none', stroke:'#000', strokeWidth:1.5, strokeLinecap:'round', strokeLinejoin:'round'}}>
      <path d="M22.5 11.63L22.5 6"/>
      <path d="m22.5 25 c0 0 4.5-7.5 3-10.5 0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" style={{fill:'#000', stroke:'#000'}}/>
      <path d="m11.5 37 c5.5 3.5 15.5 3.5 21 0 v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27 v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10V37z" style={{fill:'#000'}}/>
      <path d="M20 8L25 8M22.5 6.5L22.5 10M11.5 30C17 27 27 27 32.5 30M11.5 33.5C17 30.5 27 30.5 32.5 33.5M11.5 37C17 34 27 34 32.5 37" style={{stroke:'#fff'}}/>
    </g>
  </svg>
)

export const WhiteQueen: React.FC<ChessPieceProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 45 45" className={className} fill="currentColor">
    <g style={{fill:'#fff',stroke:'#000',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}}>
      <path d="M8 12A2 2 0 1 1 4 12A2 2 0 1 1 8 12" transform="translate(7.5,8.5)"/>
      <path d="M8 12A2 2 0 1 1 4 12A2 2 0 1 1 8 12" transform="translate(21.5,8.5)"/>
      <path d="M8 12A2 2 0 1 1 4 12A2 2 0 1 1 8 12" transform="translate(14.5,4.5)"/>
      <path d="M8 12A2 2 0 1 1 4 12A2 2 0 1 1 8 12" transform="translate(0,8.5)"/>
      <path d="M8 12A2 2 0 1 1 4 12A2 2 0 1 1 8 12" transform="translate(28.5,8.5)"/>
      <path d="m9 26c8.5-1.5 21-1.5 27 0l2-12-7 11v-14l-5.5 13.5-3-15-3 15-5.5-13.5v14l-7-11 2 12z" style={{strokeLinecap:'butt'}}/>
      <path d="M9 26C17.5 24.5 30.5 24.5 36 26L38 14L31 25L31 11L25.5 24.5L22.5 9.5L19.5 24.5L14 11L14 25L7 14L9 26 Z"/>
      <path d="M11.5 30C15 29 30 29 33.5 30M12 33.5C18 32.5 27 32.5 33 33.5"/>
      <circle cx="6" cy="12" r="2" transform="translate(7.5,8.5)"/>
      <circle cx="6" cy="12" r="2" transform="translate(21.5,8.5)"/>
      <circle cx="6" cy="12" r="2" transform="translate(14.5,4.5)"/>
      <circle cx="6" cy="12" r="2" transform="translate(0,8.5)"/>
      <circle cx="6" cy="12" r="2" transform="translate(28.5,8.5)"/>
    </g>
  </svg>
)

export const BlackQueen: React.FC<ChessPieceProps> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 45 45" className={className} fill="currentColor">
    <g style={{fill:'#000',stroke:'#000',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}}>
      <g style={{fill:'#000',stroke:'none'}}>
        <circle cx="6" cy="12" r="2.75" transform="translate(7.5,8.5)"/>
        <circle cx="6" cy="12" r="2.75" transform="translate(21.5,8.5)"/>
        <circle cx="6" cy="12" r="2.75" transform="translate(14.5,4.5)"/>
        <circle cx="6" cy="12" r="2.75" transform="translate(0,8.5)"/>
        <circle cx="6" cy="12" r="2.75" transform="translate(28.5,8.5)"/>
      </g>
      <path d="m9 26c8.5-1.5 21-1.5 27 0l2-12-7 11v-14l-5.5 13.5-3-15-3 15-5.5-13.5v14l-7-11 2 12z" style={{strokeLinecap:'butt'}}/>
      <path d="m9 26c8.5-1.5 21-1.5 27 0l2-12-7 11v-14l-5.5 13.5-3-15-3 15-5.5-13.5v14l-7-11 2 12z" style={{fill:'#ececec', stroke:'#000'}}/>
      <path d="m11.5 30c3.5-1 15.5-1 21 0M12 33.5c6-1 15-1 21 0" style={{fill:'none', stroke:'#fff'}}/>
    </g>
  </svg>
)

// Simplified piece representations for other pieces
export const SimplePawn: React.FC<ChessPieceProps & { color: 'white' | 'black' }> = ({ className = "w-8 h-8", color }) => (
  <div className={`${className} rounded-full ${color === 'white' ? 'bg-gray-200 border-2 border-gray-400' : 'bg-gray-800 border-2 border-gray-600'} flex items-center justify-center text-xs font-bold`}>
    ♟
  </div>
)

export const SimpleRook: React.FC<ChessPieceProps & { color: 'white' | 'black' }> = ({ className = "w-8 h-8", color }) => (
  <div className={`${className} rounded ${color === 'white' ? 'bg-gray-200 border-2 border-gray-400' : 'bg-gray-800 border-2 border-gray-600'} flex items-center justify-center text-lg font-bold`}>
    ♜
  </div>
)

export const SimpleKnight: React.FC<ChessPieceProps & { color: 'white' | 'black' }> = ({ className = "w-8 h-8", color }) => (
  <div className={`${className} rounded ${color === 'white' ? 'bg-gray-200 border-2 border-gray-400' : 'bg-gray-800 border-2 border-gray-600'} flex items-center justify-center text-lg font-bold`}>
    ♞
  </div>
)

export const SimpleBishop: React.FC<ChessPieceProps & { color: 'white' | 'black' }> = ({ className = "w-8 h-8", color }) => (
  <div className={`${className} rounded ${color === 'white' ? 'bg-gray-200 border-2 border-gray-400' : 'bg-gray-800 border-2 border-gray-600'} flex items-center justify-center text-lg font-bold`}>
    ♝
  </div>
)

// Main piece component that handles all piece types
export const ChessPieceIcon: React.FC<{ 
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'; 
  color: 'white' | 'black'; 
  className?: string 
}> = ({ type, color, className = "w-8 h-8" }) => {
  switch (type) {
    case 'king':
      return color === 'white' ? <WhiteKing className={className} /> : <BlackKing className={className} />
    case 'queen':
      return color === 'white' ? <WhiteQueen className={className} /> : <BlackQueen className={className} />
    case 'rook':
      return <SimpleRook className={className} color={color} />
    case 'bishop':
      return <SimpleBishop className={className} color={color} />
    case 'knight':
      return <SimpleKnight className={className} color={color} />
    case 'pawn':
      return <SimplePawn className={className} color={color} />
    default:
      return null
  }
}