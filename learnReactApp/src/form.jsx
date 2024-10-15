import { useState } from "react";

function Form() {
    const [form, setForm] = useState({
        firstName: "yash",
        lastName: "Patel",
        email: "ypatel@gmail.com",
    });

    return (
        <>
            <label htmlFor="firstName">FirstName
                <input
                    className="border-2 border-black m-2"
                    value={form.firstName}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            firstName: e.target.value
                        });
                    }
                    } />
            </label>
            <br />
            <label htmlFor="LastName">LastName
                <input
                    className="border-2 border-black m-2"
                    value={form.lastName}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            lastName: e.target.value
                        });
                    }
                    } />
            </label>
            <br />
            <label htmlFor="email">Email
                <input
                    className="border-2 border-black m-2"
                    value={form.email}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            email: e.target.value
                        });
                    }
                    } />
            </label>
            <p>
                {form.firstName}{' '}
                {form.lastName}{' '}
                {form.email}
            </p>
            <br/>
            <br/>
            <br/>
        </>
    );
}
//nested Object using form

function NestedObject(){
    const [person, setPerson] = useState({
        name : "Hellon",
        artWork : {
            title : "ocen",
            city : "London",
            imgage :"../img/bird.jpg",
        }
    });

    function handelChangeName(e){
        setPerson({
            ...person,
            name : e.target.value,
        });
    }

    function handelChangeTitle(e){
        setPerson({
            ...person,
            artWork : {
                ...person.artWork,
                title : e.target.value,
            }
        });
    }

    function handelChangeCity(e){
        setPerson({
            ...person,
            artWork : {
                ...person.artWork,
                city : e.target.value,
            }
        });
    }

    function handelChangeImage(e){
        setPerson({
            ...person,
            artWork : {
                ...person.artWork,
                imgage : e.target.value,
            }
        });
    }
    return(
        <div>
            <label htmlFor="">Name: </label>
            <input 
                value={person.name} 
                onChange={handelChangeName}
                className="border-2 border-black m-2"
            />
            <label htmlFor="">Title: </label>
            <input 
                value={person.artWork.title} 
                onChange={handelChangeTitle}
                className="border-2 border-black m-2"
            />
            <br/>
            <label htmlFor="">City: </label>
            <input 
                value={person.artWork.city} 
                onChange={handelChangeCity}
                className="border-2 border-black m-2"
            />
             <label htmlFor="">Image: </label>
            <input 
                value={person.artWork.imgage} 
                onChange={handelChangeImage}
                className="border-2 border-black m-2"
            />

            <p>{person.artWork.title} by {person.name}</p>
            <p>Location in {person.artWork.city}</p>
            <img src={person.artWork.imgage} alt={person.artWork.title} />
        </div>
    )
}
export { Form, NestedObject }