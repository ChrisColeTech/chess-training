import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Download, Link as LinkIcon, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import type { PuzzleImportExportProps } from '@/types/customPuzzles'

/**
 * Custom puzzle import/export component
 * Handles PGN import, URL import, and collection export functionality
 * Follows SRP - only handles import/export UI and file operations
 */
export const CustomPuzzleImportExport: React.FC<PuzzleImportExportProps> = ({
  onImportPGN,
  onImportFromURL,
  onExportCollection,
  theme,
  importProgress
}) => {
  const [importUrl, setImportUrl] = useState('')
  const [selectedFormat, setSelectedFormat] = useState<'pgn' | 'json'>('pgn')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onImportPGN(file)
    }
  }

  const handleUrlImport = () => {
    if (importUrl.trim()) {
      onImportFromURL(importUrl.trim())
      setImportUrl('')
    }
  }

  const handleExport = () => {
    // For demo purposes, using a mock collection ID
    onExportCollection('demo_collection', selectedFormat)
  }

  const getProgressStatusColor = () => {
    if (!importProgress) return 'bg-blue-500'
    switch (importProgress.status) {
      case 'processing': return 'bg-blue-500'
      case 'complete': return 'bg-green-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-blue-500'
    }
  }

  const getProgressStatusIcon = () => {
    if (!importProgress) return null
    switch (importProgress.status) {
      case 'processing': return <Upload className="w-4 h-4 animate-pulse" />
      case 'complete': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />
      default: return null
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-white flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Import & Export
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Import Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Import Puzzles</h3>
          
          {/* File Import */}
          <div className="space-y-3">
            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-white font-medium">PGN File Import</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">
                Import puzzles from a PGN file. Supports standard PGN format with FEN positions.
              </p>
              
              <div className="flex space-x-2">
                <input
                  type="file"
                  accept=".pgn,.txt"
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1 bg-black/30 border-blue-500/30 text-blue-300 hover:bg-blue-500/10 hover:border-blue-500/50 hover-grow active:animate-button-press transition-all duration-300 gpu-accelerated"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select PGN File
                </Button>
              </div>
            </div>

            {/* URL Import */}
            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <LinkIcon className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-white font-medium">URL Import</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">
                Import puzzles from a URL (Lichess studies, Chess.com collections, etc.)
              </p>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="https://lichess.org/study/abc123"
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  className="flex-1 bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
                />
                <Button
                  onClick={handleUrlImport}
                  disabled={!importUrl.trim()}
                  variant="outline"
                  className="bg-black/30 border-green-500/30 text-green-300 hover:bg-green-500/10 hover:border-green-500/50 hover-grow active:animate-button-press transition-all duration-300 gpu-accelerated disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </div>

          {/* Import Progress */}
          {importProgress && (
            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {getProgressStatusIcon()}
                  <span className="text-white font-medium ml-2">
                    {importProgress.status === 'processing' && 'Importing puzzles...'}
                    {importProgress.status === 'complete' && 'Import completed!'}
                    {importProgress.status === 'error' && 'Import failed'}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">
                  {importProgress.current} / {importProgress.total}
                </span>
              </div>
              
              <div className="w-full bg-black/40 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressStatusColor()}`}
                  style={{
                    width: `${(importProgress.current / importProgress.total) * 100}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Export Section */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-white font-semibold mb-4">Export Collection</h3>
          
          <div className="bg-black/20 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Download className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-white font-medium">Export Current Collection</span>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">
              Export the current puzzle collection for backup or sharing.
            </p>
            
            <div className="space-y-3">
              {/* Format Selection */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Export Format
                </label>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={selectedFormat === 'pgn' ? 'default' : 'outline'}
                    onClick={() => setSelectedFormat('pgn')}
                    className={`flex-1 transition-all duration-200 ${
                      selectedFormat === 'pgn'
                        ? `bg-gradient-to-r ${theme.primary} text-white`
                        : 'bg-black/30 border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    PGN
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedFormat === 'json' ? 'default' : 'outline'}
                    onClick={() => setSelectedFormat('json')}
                    className={`flex-1 transition-all duration-200 ${
                      selectedFormat === 'json'
                        ? `bg-gradient-to-r ${theme.primary} text-white`
                        : 'bg-black/30 border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    JSON
                  </Button>
                </div>
              </div>
              
              {/* Export Button */}
              <Button
                onClick={handleExport}
                className={`w-full bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold hover-glow active:animate-button-press transition-all duration-300 gpu-accelerated`}
              >
                <Download className="w-4 h-4 mr-2" />
                Export as {selectedFormat.toUpperCase()}
              </Button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-white font-semibold mb-3">Supported Sources</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span>Lichess studies and puzzles</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>Chess.com puzzle collections</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              <span>Standard PGN files with FEN positions</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              <span>Chess Training App JSON format</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomPuzzleImportExport