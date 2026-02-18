import { describe, it, expect } from 'vitest'
import {
  validateCommentContent,
  COMMENT_MIN_LENGTH,
  COMMENT_MAX_LENGTH,
} from '@/types/comment'

describe('Comment validation', () => {
  describe('validateCommentContent', () => {
    // --- Rejection cases ---

    it('rejects null content', () => {
      const error = validateCommentContent(null)
      expect(error).toBe('Comment content is required')
    })

    it('rejects undefined content', () => {
      const error = validateCommentContent(undefined)
      expect(error).toBe('Comment content is required')
    })

    it('rejects non-string content (number)', () => {
      const error = validateCommentContent(42)
      expect(error).toBe('Comment content is required')
    })

    it('rejects empty string', () => {
      const error = validateCommentContent('')
      expect(error).toBe('Comment content is required')
    })

    it('rejects whitespace-only string (spaces)', () => {
      const error = validateCommentContent('   ')
      expect(error).toBe('Comment cannot be empty')
    })

    it('rejects whitespace-only string (tabs and newlines)', () => {
      const error = validateCommentContent('\t\n\r  \n\t')
      expect(error).toBe('Comment cannot be empty')
    })

    it('rejects content over max length', () => {
      const overMax = 'a'.repeat(COMMENT_MAX_LENGTH + 1)
      const error = validateCommentContent(overMax)
      expect(error).toBe(`Comment must be ${COMMENT_MAX_LENGTH} characters or less`)
    })

    it('rejects content way over max length', () => {
      const wayOverMax = 'x'.repeat(10000)
      const error = validateCommentContent(wayOverMax)
      expect(error).toBe(`Comment must be ${COMMENT_MAX_LENGTH} characters or less`)
    })

    // --- Acceptance cases ---

    it('accepts a valid single-character comment', () => {
      const error = validateCommentContent('a')
      expect(error).toBeNull()
    })

    it('accepts a normal comment', () => {
      const error = validateCommentContent('This is a great problem to solve!')
      expect(error).toBeNull()
    })

    it('accepts content at exactly max length', () => {
      const atMax = 'a'.repeat(COMMENT_MAX_LENGTH)
      const error = validateCommentContent(atMax)
      expect(error).toBeNull()
    })

    it('accepts content with leading/trailing whitespace (trimmed version is valid)', () => {
      const error = validateCommentContent('  Hello world  ')
      expect(error).toBeNull()
    })

    it('accepts multiline content', () => {
      const multiline = 'Line 1\nLine 2\nLine 3'
      const error = validateCommentContent(multiline)
      expect(error).toBeNull()
    })
  })

  describe('Validation constants', () => {
    it('has sensible min length', () => {
      expect(COMMENT_MIN_LENGTH).toBe(1)
    })

    it('has sensible max length', () => {
      expect(COMMENT_MAX_LENGTH).toBe(5000)
    })
  })
})
