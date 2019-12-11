import useEventListener from '@use-it/event-listener'

export default function useHotKeys(actions) {
  useEventListener('keydown', e => {
    const action = actions[e.code]
    if (!e.ctrlKey && !e.metaKey && action) {
      action(e.shiftKey)
    }
  })
}
