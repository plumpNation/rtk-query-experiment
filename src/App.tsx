import { useAppDispatch, useAppSelector } from './redux/hooks'
import { increment } from './redux/slices/counterSlice'

import './App.css'

export const App = () => {
  const dispatch = useAppDispatch()

  const count = useAppSelector(({ counter }) => counter.value)

  const handleClick = () => {
    dispatch(increment())
  }

  return (
    <div className="App">
      <button onClick={handleClick}>Clicked {count} times</button>
    </div>
  )
}
