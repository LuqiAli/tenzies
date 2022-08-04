import React from "react"
import "./style.css"
import Die from "./Die.js"
import Confetti from "react-confetti"
import {nanoid} from "nanoid"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())

    const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allValue = dice.every(die => die.value === firstValue)
        if (allHeld && allValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateDie() {
        return {
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const numbers = []

        for (let i = 0; i < 10; i++) {
            numbers.push(generateDie())
        }

        return numbers
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} : 
                die
        }))

    }

    function rollDice() {

        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }

    }

    const diceElements = dice.map(die => <Die 
        key={die.id} 
        id={die.id}
        value={die.value} 
        isHeld={die.isHeld}
        hold={holdDice}
        />)

    return (
        <main>
            {tenzies && <Confetti />}
            <div>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it as its current value between rolls.</p>
            </div>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{!tenzies ? "Roll" : "New Game"}</button>
        </main> 
    )
}