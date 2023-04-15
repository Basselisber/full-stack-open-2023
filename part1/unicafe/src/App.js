import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatistcsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = `${good / all * 100}%`
  return all > 0 ? (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatistcsLine text='good' value={good} />
          <StatistcsLine text='neutral' value={neutral} />
          <StatistcsLine text='bad' value={bad} />
          <StatistcsLine text='all' value={all} />
          <StatistcsLine text='average' value={average} />
          <StatistcsLine text='positive' value={positive} />
        </tbody>
      </table>
    </>
  )
  : (<p>No feedback given</p>)
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    console.log('increasing, value before', good)
    setGood(good + 1)
  }
  const increaseNeutral = () => {
    console.log('increasing, value before', neutral)
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    console.log('increasing, value before', bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text = 'nuetral' />
      <Button handleClick={increaseBad} text = 'bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App