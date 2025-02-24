"use client"
import React from "react";
import Loginx from "./Login/Loginx";
export default function Skeletonx() {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const toggleLoad = () => {
        setIsLoaded(!isLoaded);
    };

    return (
        <div className="flex flex-col gap-3">
            <Loginx isLoaded={isLoaded} toggleLoad={toggleLoad}></Loginx>           
        </div>
    );
}

