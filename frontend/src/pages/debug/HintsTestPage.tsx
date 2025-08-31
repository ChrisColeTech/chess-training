import React, { useState } from 'react'
import { Chess } from 'chess.js'
import { ChessBoardContainer } from '../../components/chess/ChessBoardContainer'
import { MoveHintsPanel } from '../../components/chess/MoveHintsPanel'
import { GameLayout } from '../../components/chess/GameLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { useGameHints } from '../../hooks/chess/useGameHints'

/**
 * HintsTestPage - Test page for Move Hints functionality
 * Single Responsibility: Test hints integration in isolation
 */
const HintsTestPage: React.FC = () => {
  const [chess] = useState(() => new Chess())
  const [testGameId] = useState('test-game-123') // Mock game ID for testing
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate')

  // Test the useGameHints hook with mock data
  const {
    hints,
    isLoading,
    error,
    refresh,
    clearError
  } = useGameHints({
    gameId: testGameId,
    position: chess.fen(),
    difficulty,
    disabled: false,
    autoRefreshOnPositionChange: true
  })

  const handleMove = (move: any) => {
    try {
      chess.move(move)
      // Force re-render to update position
      refresh()
    } catch (err) {
      console.error('Invalid move:', err)
    }
  }

  const resetBoard = () => {
    chess.reset()
    refresh()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Move Hints Test Page
          </h1>
          <p className="text-gray-400 text-lg">
            Testing AI-powered move suggestions and educational hints
          </p>
        </div>

        {/* Test Controls */}
        <Card className="mb-6 bg-black/20 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Test Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm">Difficulty:</span>
                {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                  <Badge
                    key={level}
                    variant={difficulty === level ? 'default' : 'outline'}
                    className={`cursor-pointer ${
                      difficulty === level 
                        ? 'bg-blue-500 text-white' 
                        : 'border-white/20 text-gray-300 hover:bg-white/10'
                    }`}
                    onClick={() => setDifficulty(level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
              
              <Button onClick={resetBoard} variant="outline" size="sm">
                Reset Board
              </Button>
              
              <Button onClick={refresh} variant="outline" size="sm">
                Refresh Hints
              </Button>
              
              {error && (
                <Button onClick={clearError} variant="outline" size="sm">
                  Clear Error
                </Button>
              )}
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <Badge variant="outline">Game ID: {testGameId}</Badge>
              <Badge variant="outline">Position: {chess.fen().split(' ')[0]}</Badge>
              <Badge variant="outline">Turn: {chess.turn() === 'w' ? 'White' : 'Black'}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Game Layout with Hints */}
        <GameLayout
          chessBoard={
            <ChessBoardContainer
              chessInstance={chess}
              boardWidth={600}
              onMove={handleMove}
              playerColor="white"
              disabled={false}
              showCoordinates={true}
              premiumEffects={true}
              showMoveHints={true}
              enableSounds={false} // Disable for testing
              highlightLastMove={true}
              highlightCheck={true}
            />
          }
          
          playerInfo={
            <Card className="bg-black/20 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Test Player</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>Color: White</div>
                  <div>Turn: {chess.turn() === 'w' ? 'Your Turn' : 'Waiting'}</div>
                  <div>Moves: {chess.moveNumber()}</div>
                  <div>Status: Testing</div>
                </div>
              </CardContent>
            </Card>
          }
          
          gameControls={
            <Card className="bg-black/20 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Test Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button onClick={resetBoard} className="w-full" variant="outline">
                    Reset Position
                  </Button>
                  <Button onClick={refresh} className="w-full" variant="outline">
                    Force Refresh Hints
                  </Button>
                </div>
              </CardContent>
            </Card>
          }
          
          moveHints={
            <MoveHintsPanel
              hints={hints}
              isLoading={isLoading}
              error={error}
              onRefresh={refresh}
              disabled={false}
              difficulty={difficulty}
            />
          }
        />

        {/* Debug Info */}
        <Card className="mt-6 bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-300">Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-400 font-mono space-y-2">
              <div><strong>FEN:</strong> {chess.fen()}</div>
              <div><strong>Legal Moves:</strong> {chess.moves().join(', ')}</div>
              <div><strong>Hints Loading:</strong> {isLoading ? 'Yes' : 'No'}</div>
              <div><strong>Hints Error:</strong> {error || 'None'}</div>
              <div><strong>Hints Data:</strong> {hints ? `${hints.bestMoves.length} moves` : 'None'}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HintsTestPage