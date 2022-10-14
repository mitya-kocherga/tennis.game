import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.scss'


const WinnerPresentation = ({ winnerName, flushState }) => (
  <div>
    <img />
    <span>Поздравляем {winnerName}, молодец!</span>
    <button onClick={flushState}>restart</button>
  </div>
)


export default function Home() {
  const initialState = { left: 0, right: 0 }
  
  const [count, setCount] = useState(initialState)
  const [winner, setWinner] = useState()
  
  const [timerId, setTimerId] = useState()
  const [canAbort, setCanAbort] = useState({can: false})

  const flushState = () => {
    setCount(initialState)
    setWinner(undefined)
  }
  const leftRef = useRef()
  const rightRef = useRef()

  useEffect(() => {
    if (count.left > 10) {
      const name = leftRef.current.value;
      setCanAbort({can: false})
      setWinner(name)
    }
    if (count.right > 10) {
      const name = rightRef.current.value;
      setCanAbort({can: false})
      setWinner(name)
    }
  }, [count])


  const onSideClick = (side) => () => {
      clearInterval(timerId)
      setCount({ ...count, [side]: count[side] + 1 })
      setCanAbort({can: true, prevState: count});
      const timer = setTimeout(() => setCanAbort({can: false}), 2000)
      setTimerId(timer)
  }

  const onAbort = () => {
    setCount(canAbort.prevState)
    setCanAbort({can: false})
  }

  return (
    <div className={styles.container}>
      {
        canAbort.can ?
          <div className={styles.aborter}>
            отменить? <button onClick={onAbort}>отменить!</button>
          </div>
          : null
      }
      {
        winner ?
          <WinnerPresentation flushState={flushState} winnerName={winner} />
          :
          <>
            <div className={styles.left} onClick={onSideClick('left')}>
              <input type="text" defaultValue="Name1" className={styles.name} ref={leftRef} onClick={(e) => e.stopPropagation()} />

              <span className={styles.text}>
                {count.left}
              </span>
            </div><div className={styles.right} onClick={onSideClick('right')}>

              <input type="text" defaultValue="Name2" FclassName={styles.name} ref={rightRef} onClick={(e) => e.stopPropagation()} />

              <span className={styles.text}>
                {count.right}
              </span>
            </div>
          </>
      }
    </div>
  )
}
