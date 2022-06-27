import React from "react";
import "./matrix.css"
import { useState, useEffect, useRef} from "react";

let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

const maxStream = 50;
const minStream = 15;

const getRandomRange = (max,min) => Math.floor(Math.random() * (max-min)) + min 

const randomchars = () => characters.charAt(Math.floor(Math.random() * characters.length))

const randStream = () => {
   return new Array(getRandomRange(maxStream, minStream))
    .fill()
    .map(_ => randomchars());
}


const stream = randStream();

const Matrix = () => {

    setInterval(() => {
    }, 100)
    
    const count = useRef(0);
    
    const [topPadding, setTopPadding] = useState(count);

    
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("component rerendered")
            if (topPadding > window.innerHeight){
                count.current = 0
                setTopPadding(0)
            }
            else {
                setTopPadding(count.current = count.current + 44)
            }
        }, 100);
        return () => clearInterval(interval);
    });
      
    


    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1,
            //background: "black"
        }}>
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
        </div>
    )
}




export default Matrix;