import "./splash.css"


const Splash = () => {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: "black"
        }}>
            <div style={{
                fontFamily: "matrixFont",
                color: '#20c20e',
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
                whiteSpace: 'nowrap',
                userSelect:'none',
                textShadow: '0px 0px 8px rgba(32, 194, 14, 0.8)',
                fontSize: 50,
            }}>
                {"test".split("").map(char => (
                    <a
                    style={{
                        marginTop: -12,
                    }}>{char}</a>
                ))}
            </div>
        </div>
    )
}




export default Splash;