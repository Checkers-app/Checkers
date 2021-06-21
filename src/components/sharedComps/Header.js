import React, { useState, useEffect } from 'react';

import "../../css/header.css";

function FrontPage() {
    

    return (
        <header className="header">
            <h1 className="header_title">CHECKERS</h1>
            <div className="header_names">
                <p>by:</p>
                <p>Nicholas D'Amato</p>
                <p>Joseph Fatani</p>
                <p>Adam Pal</p>
                <p>Alexander Raia</p>
            </div>
        </header>
    );
}

export default FrontPage;