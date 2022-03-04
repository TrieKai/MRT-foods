import { ActorRefFrom, assign, createMachine } from 'xstate'

type IContext = {
  showModal: boolean
  selectedFoodType: string | null
}

type IEvent =
  | { type: 'RANDOM' }
  | { type: 'FINISH' }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'REDO' }
  | { type: 'CLOSE' }
  | { type: 'SET_SELECTED_FOOD_TYPE'; selectedFoodType: null }

export const myMachine = createMachine(
  {
    id: 'myMachine',
    tsTypes: {} as import('./machine.typegen').Typegen0,
    schema: {
      context: {} as IContext,
      events: {} as IEvent
    },
    initial: 'idle',
    context: { showModal: false, selectedFoodType: null },
    states: {
      idle: {
        on: {
          RANDOM: 'random',
          SET_SELECTED_FOOD_TYPE: {
            actions: 'setSelectedFoodType'
          }
        },
        entry: ['closeModal', 'clearSelectedFoodType']
      },
      random: {
        entry: 'clearSelectedFoodType',
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
          NEXT: [
            { target: 'step3', cond: context => !!context.selectedFoodType }
          ],
          REDO: 'random',
          CLOSE: { target: 'idle' },
          SET_SELECTED_FOOD_TYPE: {
            actions: 'setSelectedFoodType'
          }
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
      }),
      setSelectedFoodType: assign((context, event) => {
        return { ...context, selectedFoodType: event.selectedFoodType }
      }),
      clearSelectedFoodType: assign(context => {
        return { ...context, selectedFoodType: null }
      })
    }
  }
)

export type MyService = ActorRefFrom<typeof myMachine>
