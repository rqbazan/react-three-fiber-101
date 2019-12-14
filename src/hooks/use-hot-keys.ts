import useEventListener from '@use-it/event-listener'
import { FaceName } from 'types'

interface Action {
  (letter: FaceName, shiftKeyPressed: boolean): void
}

// React.KeyboardEvent does not support code native property
// https://github.com/facebook/react/issues/14102
export default function useHotKeys(actions: { [key: string]: Action }) {
  useEventListener('keydown', (e: React.KeyboardEvent & { code: string }) => {
    const action = actions[e.code]

    if (!e.ctrlKey && !e.metaKey && action) {
      const letter = e.code[e.code.length - 1]
      action(letter as FaceName, e.shiftKey)
    }
  })
}
