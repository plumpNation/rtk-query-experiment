import { useAppDispatch, useAppSelector } from './redux/hooks'
import { increment } from './redux/slices/counterSlice'
import { Posts } from './components/Posts'
import { Button } from './components/Button'

import './App.css'

export const App = () => {
  const dispatch = useAppDispatch()

  const count = useAppSelector(({ counter }) => counter.value)

  const handleClick = () => {
    dispatch(increment())
  }

  return (
    <main className="App">
      <section>
        <h1 className="h1">Redux Toolkit</h1>
        <Button onClick={handleClick}>Clicked {count} times</Button>
      </section>

      <Posts />
    </main>
  )
}
