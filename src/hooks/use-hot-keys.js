import useEventListener from '@use-it/event-listener'

export default function useHotKeys(actions) {
  useEventListener('keydown', e => {
    const action = actions[e.code]

    if (!e.ctrlKey && !e.metaKey && action) {
      const letter = e.code[e.code.length - 1]
      action(e.shiftKey, letter)
    }
  })
}
