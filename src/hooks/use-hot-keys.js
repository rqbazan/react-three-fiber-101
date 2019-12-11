import useEventListener from '@use-it/event-listener'

export default function useHotKeys(actions) {
  useEventListener('keydown', e => {
    const action = actions[e.code]
    if (action && !e.ctrlKey && !e.metaKey) {
      action()
    }
  })
}
