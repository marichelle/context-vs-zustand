import React from 'react'
import './App.css'
import { useExampleContext } from './ExampleContext'

let appRenderedTimes = 0
let containerRenderedTimes = 0
let innerOneRenderedTimes = 0
let innerTwoRenderedTimes = 0

const App: React.FC = () => {
  appRenderedTimes++

  return (
    <>
      <div className="App Common">
        <p className="Notes">
          All components use their own data and setters. Unfortunately, our
          inner components and container will re-render even if unrelated data
          was updated.
        </p>
        <span>App rendered: {appRenderedTimes}</span>
        <Container />
      </div>
    </>
  )
}

export const Container = () => {
  containerRenderedTimes++

  const { containerData, setContainerData } = useExampleContext()

  const handleOnClick = () => {
    setContainerData(prevState => !prevState)
  }

  return (
    <div className="Container Common" onClick={handleOnClick}>
      <span>
        Container rendered: {containerRenderedTimes}
        {`: ${containerData}`}
      </span>
      <InnerOne />
      <InnerTwo />
    </div>
  )
}

export const InnerOne = () => {
  innerOneRenderedTimes++

  const { innerOneData, setInnerOneData } = useExampleContext()

  const handleOnClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
    setInnerOneData(prevState => !prevState)
  }

  return (
    <div className="InnerOne Common" onClick={handleOnClick}>
      <span>
        Inner one rendered: {innerOneRenderedTimes}
        {`: ${innerOneData}`}
      </span>
    </div>
  )
}

export const InnerTwo = () => {
  innerTwoRenderedTimes++

  const { innerTwoData, setInnerTwoData } = useExampleContext()

  const handleOnClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
    setInnerTwoData(prevState => !prevState)
  }

  return (
    <div className="InnerTwo Common" onClick={handleOnClick}>
      <span>
        Inner two rendered: {innerTwoRenderedTimes}
        {`: ${innerTwoData}`}
      </span>
    </div>
  )
}

export default App
