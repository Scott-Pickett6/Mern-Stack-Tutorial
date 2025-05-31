import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Header from '../Components/Header';
import Hero from '../Components/Hero';

export default function Home() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]);

    return (
        <>
            <Header />
            <Hero/>
        </>
    )
}