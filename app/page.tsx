/* 
    Names: Bill Soronzonbold, Carly Seigel, Eliana Longoria-Valenzuela 
    
    Most recent edit: 10/20/2023 
    update summary:   made a login button and got more familiar with the code

*/

"use client" /* todo: ask elizabeth about use client best practices */

import Button from "@mui/material/Button"

export default function Home() {
    return <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height:"100vh", 
    }}>
        <Button
            color="secondary"
            variant='outlined'
            className="buttonCenter"
            onClick={() => { /* for more user interactivity */ 
                alert('clicked');
            }}
        >
            Login
        </Button>
    </div>
}