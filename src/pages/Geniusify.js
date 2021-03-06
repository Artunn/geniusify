import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Geniusify.css'

export default function Geniusify() {
    const [inputboxstate, setinputboxstate] = useState("");
    const [geniusifiedboxstate, setgenuisifiedboxstate] = useState("");
    const [headerstate, setheaderstate] = useState("");
    const textarearef = useRef(null);

    const randomizeText = useCallback((inputobj) => {
        if (inputobj.length === 0) {
            alert("You need to type something my bRiLliAnT friend");
            return;
        }
        let noncapitalized = (inputobj[0].toUpperCase() === inputobj[0]) ? 2 : 0;
        return [...inputobj].map(letter => {
            if ((Math.random() >= 0.5 && noncapitalized !== 0) || noncapitalized >= 2) {
                letter = letter.toUpperCase();
                noncapitalized = 0;
            } else {
                letter = letter.toLowerCase();
                noncapitalized++;
            }
            return letter;
        }).join("")
    }, [inputboxstate]);

    //Randomly transform letters to lowercase or uppercase
    const geniusifyInputText = useCallback(() => {
        setgenuisifiedboxstate(randomizeText(inputboxstate))
    }, [inputboxstate, randomizeText]);

    //Copy the clipboard
    const copyToClipboard = (e) => {
        textarearef.current.select();
        document.execCommand("copy");
    }

    //Geniusify the input text on "Enter" click
    useEffect(() => {
        const handleEnter = (e) => {
            if (e.keyCode === 13) {
                geniusifyInputText();
            }
        };
        window.addEventListener('keydown', handleEnter);
        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, [inputboxstate, geniusifyInputText]);

    useEffect(() => {
        setheaderstate(randomizeText("Geniusify"));
    }
        , [])

    return (
        <div className={"geniusify"}>
            <div className={"geniusify__body"}>
                <h1>{headerstate}</h1>
                <div className={"geniusify-textarea__wrapper"}>
                    <textarea placeholder={"Type your text here"} className={"geniusify-textarea"} onChange={(e) => { setinputboxstate(e.target.value) }} value={inputboxstate}></textarea>
                </div>
                <div>
                    <button className={"geniusify-button"} disabled={(inputboxstate.length <= 0) ? true : false} onClick={geniusifyInputText}>CLICK HERE</button>
                </div>
                <div className={"geniusify-textarea__wrapper"} >
                    <textarea placeholder={"YoUr ReSuLt WiLl bE hErE"} className={"geniusify-textarea"} ref={textarearef} value={geniusifiedboxstate} readOnly={true}></textarea>
                </div>
                <div className={"genuisfy-lowbutton_wrapper"}>
                    <button className={"geniusify-button"} onClick={copyToClipboard}>COPY</button>
                </div>
            </div>
        </div>
    )
}