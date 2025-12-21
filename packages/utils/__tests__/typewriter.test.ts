import { describe, expect, it } from 'vitest'
import { typewritertest } from '..'

describe('typewriter', () => {
  it('test 测试', () => {
    expect(typewritertest).toBe('bar')
  })
})
