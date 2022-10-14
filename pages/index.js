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

  const flushState = () => {
    setCount(initialState)
    setWinner(undefined)
  }
  const leftRef = useRef()
  const rightRef = useRef()

  useEffect(() => {
    if (count.left > 10) {
      const name = leftRef.current.innerText;
      setWinner(name)
    }
    if (count.right > 10) {
      const name = rightRef.current.innerText;
      setWinner(name)
    }
  }, [count])


  const onSideClick = (side) => () => {
    setCount({ ...count, [side]: count[side] + 1 })
  }

  return (
    <div className={styles.container}>
      {
        winner ?
          <WinnerPresentation flushState={flushState} winnerName={winner} />
          :
          <>
            <div className={styles.left} onClick={onSideClick('left')}>
              <span contentEditable className={styles.name} ref={leftRef}>
                Name1
              </span>
              <span className={styles.text}>
                {count.left}
              </span>
            </div><div className={styles.right} onClick={onSideClick('right')}>
              <span contentEditable className={styles.name} ref={rightRef}>
                Name2
              </span>
              <span className={styles.text}>
                {count.right}
              </span>
            </div>
          </>
      }
    </div>
  )
}
