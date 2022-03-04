import { ActorRefFrom, assign, createMachine } from 'xstate'

type IContext = {
  showModal: boolean
}

type IEvent =
  | { type: 'RANDOM' }
  | { type: 'FINISH' }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'REDO' }
  | { type: 'CLOSE' }

export const myMachine = createMachine(
  {
    id: 'myMachine',
    tsTypes: {} as import('./machine.typegen').Typegen0,
    schema: {
      context: {} as IContext,
      events: {} as IEvent
    },
    initial: 'idle',
    context: { showModal: false },
    states: {
      idle: {
        on: {
          RANDOM: 'random'
        },
        entry: 'closeModal'
      },
      random: {
        on: {
          FINISH: 'step1'
        },
        exit: 'openModal'
      },
      step1: {
        on: {
          NEXT: 'step2',
          REDO: 'random',
          CLOSE: 'idle'
        }
      },
      step2: {
        on: {
          NEXT: [{ target: 'step3', cond: '' }],
          REDO: 'random',
          CLOSE: 'idle'
        }
      },
      step3: {
        on: {
          BACK: 'step2',
          REDO: 'random',
          CLOSE: 'idle'
        }
      }
    }
  },
  {
    actions: {
      openModal: assign(context => {
        return { ...context, showModal: true }
      }),
      closeModal: assign(context => {
        return { ...context, showModal: false }
      })
    }
  }
)

export type MyService = ActorRefFrom<typeof myMachine>
