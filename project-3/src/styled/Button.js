import styled from "styled-components";

export const Button = styled.button`
    background:black;
    color:white;
    min-width:220px;
    padding:10px 18px;
    border-radius : 5px;
    border:none;    
    font-size: 16px;
    border:1px solid transparent;
    transition: 0.4s background ease-in;

    &:hover{
        background: white;
        border: 1px solid black;
        color: black;
        transition: 0.3s background ease-in;
    }
`;

export const OutlineBtn = styled(Button)`
    background: white;
    color: black;
    border: 1px solid black;
    &:hover{
        background: black;
        border: 1px solid transparent;
        color: white;
    }
`;