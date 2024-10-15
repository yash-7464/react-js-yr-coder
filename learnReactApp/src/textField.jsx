import { useState } from "react";


function TextFiled(){
    const [textField, setTextField] = useState("Hello");

    function handleClick(e){
        setTextField(e.target.value)
    }

    return(
    <>
        <input type="text" value={textField}
        onChange={handleClick} 
        className="border-2 border-black m-2"
        />

        <p className="m-2">you Typed: {textField}</p>

        <button onClick={() => setTextField("")}
        className="border-2 m-2 p-2 bg-orange-400 rounded-xl"    
        >Reset</button>
    </>
    )
}
function CheckBox(){
    const [check, setCheckBox] = useState(true);

    function handelChange(e){
        setCheckBox(e.target.checked);
    }

    return(
        <div>
            <input type="checkbox" 
            onChange={handelChange}
            checked={check} />I like this
            <p>You {check ? 'liked' : 'did not like'}</p>
        </div>
    )
}

function Age(){
    const [name, setName] = useState("yash");
    const [age, setAge] = useState(23);

    function handelChange(e){
        setName(e.target.value);
    }

    function handleClick(){
        setAge(age+1);
       
    }

    return(
        <>
            <label htmlFor="name">
                <input type="text"
                value={name}
                onChange={handelChange}
                className="border-2 border-black m-2" />
            </label><br/>
            <button onClick={() => {
                handleClick();
                handleClick();
                handleClick();
            }}
            className="border-2 m-2 p-2 bg-orange-400 rounded-xl" >+3</button>
            <button onClick={() => {
                handleClick();
            }}
            className="border-2 m-2 p-2 bg-orange-400 rounded-xl" >+1</button>
            <p>Hello {name}, and your age is {age} </p>
        </>
    )
}


export{TextFiled, CheckBox, Age}