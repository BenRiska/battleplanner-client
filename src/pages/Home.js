import React, { useContext, useState } from 'react';

import { AuthContext } from '../context/auth';

function Home() {

    const { user, logout } = useContext(AuthContext);

    return (
        <div> 
            <h1>home</h1>
        </div>
    )
}

export default Home
