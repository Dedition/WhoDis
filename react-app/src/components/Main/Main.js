import ChannelMessages from "../ChannelMessages/ChannelMessages"
import { useState } from "react";


const Main = () => {
    const [name, setName] = useState();
    
    const submit = (e) => {
        console.log(e.KeyCode)
        e.preventDefault()
    
    }

    return (
        <div className='main'>
           <div className='main-header'></div>
           <div className='main-content'>
            <ChannelMessages />
           </div>
           <div className='main-inputs'>
                <form className='message-form' onSubmit={submit}>
                    <input
                        id='mf-input'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                    ></input>
                    <button type="submit"></button>
                </form>
           </div>
           {/* <div className='main-footer'></div> */}
        </div>
    )
}


export default Main
