/**
 * Storage validation utility for testing cross-platform storage
 * Use this to verify the storage solution works correctly in both environments
 */

import { storageUtils, createCrossPlatformStorage } from '../services/storage/crossPlatformStorage'

interface ValidationResult {
  success: boolean
  environment: 'electron' | 'browser'
  tests: {
    environmentDetection: boolean
    tokenStorage: boolean
    tokenRetrieval: boolean
    tokenClearance: boolean
  }
  errors: string[]
}

export class StorageValidator {
  private errors: string[] = []

  async validate(): Promise<ValidationResult> {
    console.log('🧪 Starting storage validation tests...')
    this.errors = []

    const result: ValidationResult = {
      success: false,
      environment: storageUtils.isElectron() ? 'electron' : 'browser',
      tests: {
        environmentDetection: false,
        tokenStorage: false,
        tokenRetrieval: false,
        tokenClearance: false
      },
      errors: []
    }

    try {
      // Test 1: Environment detection
      result.tests.environmentDetection = await this.testEnvironmentDetection()

      // Test 2: Token storage
      result.tests.tokenStorage = await this.testTokenStorage()

      // Test 3: Token retrieval
      result.tests.tokenRetrieval = await this.testTokenRetrieval()

      // Test 4: Token clearance
      result.tests.tokenClearance = await this.testTokenClearance()

      // Overall success
      result.success = Object.values(result.tests).every(test => test)
      result.errors = this.errors

      console.log(`✅ Storage validation completed: ${result.success ? 'PASS' : 'FAIL'}`)
      console.log(`📱 Environment: ${result.environment}`)
      console.log('📋 Test results:', result.tests)

      if (this.errors.length > 0) {
        console.warn('⚠️  Validation errors:', this.errors)
      }

    } catch (error) {
      this.errors.push(`Validation failed: ${error}`)
      console.error('❌ Storage validation failed:', error)
    }

    return result
  }

  private async testEnvironmentDetection(): Promise<boolean> {
    try {
      const isElectron = storageUtils.isElectron()
      const hasElectronAPI = typeof window !== 'undefined' && !!window.electronAPI
      
      console.log(`🔍 Environment detection: isElectron=${isElectron}, hasAPI=${hasElectronAPI}`)
      
      if (isElectron && !hasElectronAPI) {
        this.errors.push('Detected Electron but window.electronAPI is not available')
        return false
      }

      return true
    } catch (error) {
      this.errors.push(`Environment detection failed: ${error}`)
      return false
    }
  }

  private async testTokenStorage(): Promise<boolean> {
    try {
      const storage = createCrossPlatformStorage()
      const testData = JSON.stringify({
        state: {
          isAuthenticated: true,
          accessToken: 'test-access-token-12345',
          refreshToken: 'test-refresh-token-67890',
          user: { id: 'test-user', email: 'test@example.com' }
        },
        version: 0
      })

      await storage.setItem('chess-auth-storage', testData)
      console.log('✅ Test token storage successful')
      return true
    } catch (error) {
      this.errors.push(`Token storage failed: ${error}`)
      return false
    }
  }

  private async testTokenRetrieval(): Promise<boolean> {
    try {
      const tokens = await storageUtils.getAuthTokens()
      
      if (!tokens?.accessToken || !tokens?.refreshToken) {
        this.errors.push('Token retrieval returned null or missing tokens')
        return false
      }

      if (tokens.accessToken !== 'test-access-token-12345' || 
          tokens.refreshToken !== 'test-refresh-token-67890') {
        this.errors.push('Retrieved tokens do not match stored values')
        return false
      }

      console.log('✅ Test token retrieval successful')
      return true
    } catch (error) {
      this.errors.push(`Token retrieval failed: ${error}`)
      return false
    }
  }

  private async testTokenClearance(): Promise<boolean> {
    try {
      await storageUtils.clearAllAuth()
      
      const tokensAfterClear = await storageUtils.getAuthTokens()
      
      if (tokensAfterClear?.accessToken || tokensAfterClear?.refreshToken) {
        this.errors.push('Tokens still exist after clearance')
        return false
      }

      console.log('✅ Test token clearance successful')
      return true
    } catch (error) {
      this.errors.push(`Token clearance failed: ${error}`)
      return false
    }
  }
}

/**
 * Quick validation function for console testing
 * Usage: await validateStorage()
 */
export const validateStorage = async (): Promise<ValidationResult> => {
  const validator = new StorageValidator()
  return await validator.validate()
}

/**
 * Attach validation function to window for console access
 * Usage in browser/electron console: window.validateStorage()
 */
if (typeof window !== 'undefined') {
  (window as any).validateStorage = validateStorage
  console.log('🔧 Storage validation available: window.validateStorage()')
}