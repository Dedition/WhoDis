import React from "react";
import "./matrix.css"
import { useState, useEffect, useRef} from "react";
import { useInterval } from 'use-interval'

/***********************************************************************************************************/

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*+-?|\/:;"
const stream_mutation_odds = 0.02;

const maxStream = 50;
const minStream = 15;

const getRandomRange = (max,min) => Math.floor(Math.random() * (max-min)) + min 

const randomchars = () => characters.charAt(Math.floor(Math.random() * characters.length))

const randStream = () => {
   return new Array(getRandomRange(maxStream, minStream))
    .fill()
    .map(_ => randomchars());
}

const getMutatedStream = stream => {
    const newStream = [];
    for (let i = 1; i < stream.length; i++){
        if (Math.random() < stream_mutation_odds){
            newStream.push(randomchars());
        } else {
            newStream.push(stream[i]);
        }
    }
    newStream.push(randomchars());
    return newStream;
}

/***********************************************************************************************************/

const RainStream = () => {
    
    const [stream, setStream]  = useState(randStream());
    const [topPadding, setTopPadding] = useState(stream.length * -30);

    useInterval(() => {
        if ( topPadding > window.innerHeight) setTopPadding(stream.length * -30)
        else {
            setTopPadding(topPadding + 44)
            setStream(getMutatedStream)
        }
    }, 100);


    return (
        <div style={{
            marginTop: topPadding,
            color: '#20c20e',
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            whiteSpace: 'nowrap',
            userSelect:'none',
            textShadow: '0px 0px 8px rgba(32, 194, 14, 0.8)',
            fontSize: 30,
        }}>
            {stream.map((char, index) => (
                <a key={index}
                style={{
                    color: index===stream.length-1 ? "#fff" : undefined,
                    opacity: index < 6 ? 0.1 + index * 0.15 : 1,
                    textShadow: index === stream.length -1 ? '0px 0px 20px rgba(255, 255, 255, 1)' : undefined,
                    marginTop: -12,
                }}>{char}</a>
            ))}
        </div>
    )
}

/***********************************************************************************************************/

export default RainStream;