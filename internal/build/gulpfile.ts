import { mkdir } from 'fs/promises'
import { series, type TaskFunction } from 'gulp'
import { epOutput } from '@element-ai/build-utils'
import { run } from './src'

const withTaskName = (name: string, fn: any) =>
  Object.assign(fn, { displayName: name })
export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true }))
) as TaskFunction
