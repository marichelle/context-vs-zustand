import React, { memo } from 'react'
import './App.css'

/*
 * The use of shallow will ensure that the React
 * component will only update when one of the
 * required state items is updated.
 */
import { shallow } from 'zustand/shallow'
import useZustandStore from './ExampleZustand'

let appRenderedTimes = 0
let containerRenderedTimes = 0
let innerOneRenderedTimes = 0
let innerTwoRenderedTimes = 0

const App: React.FC = () => {
  appRenderedTimes++

  return (
    <div className="App Common">
      <p className="Notes">
        Components are rendered only if required data is updated and our
        prop-less inner components are memoized.
      </p>
      <span>App rendered: {appRenderedTimes}</span>
      <Container />
    </div>
  )
}

export const Container = () => {
  containerRenderedTimes++

  const { data, set } = useZustandStore(
    state => ({
      data: state.containerData,
      set: state.setContainerData,
    }),
    shallow
  )

  const handleOnClick = () => set(!data)

  return (
    <div className="Container Common" onClick={handleOnClick}>
      <span>
        Container rendered: {containerRenderedTimes}
        {`: ${data}`}
      </span>
      <InnerOne />
      <InnerTwo />
    </div>
  )
}

/* Because our inner components have no props
 * (empty JS objects that are not pointing to the
 * same reference, `{} === {}` will equal false), we
 * need to wrap our inner components with a memo
 */

export const InnerOne = memo(
  () => {
    innerOneRenderedTimes++

    const { data, set } = useZustandStore(
      state => ({
        data: state.innerOneData,
        set: state.setInnerOneData,
      }),
      shallow
    )

    const handleOnClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      event.stopPropagation()
      set(!data)
    }

    return (
      <div className="InnerOne Common" onClick={handleOnClick}>
        <span>
          Inner one rendered: {innerOneRenderedTimes}
          {`: ${data}`}
        </span>
      </div>
    )
  },
  (prevProps, nextProps) => true
)

export const InnerTwo = memo(
  () => {
    innerTwoRenderedTimes++

    const { data, set } = useZustandStore(
      state => ({
        data: state.innerTwoData,
        set: state.setInnerTwoData,
      }),
      shallow
    )

    const handleOnClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      event.stopPropagation()
      set(!data)
    }

    return (
      <div className="InnerTwo Common" onClick={handleOnClick}>
        <span>
          Inner two rendered: {innerTwoRenderedTimes}
          {`: ${data}`}
        </span>
      </div>
    )
  },
  (prevProps, nextProps) => true
)

export default App
