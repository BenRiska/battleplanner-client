import React, { useContext, useState } from 'react';

import { AuthContext } from '../context/auth';

function Home() {

    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default Home
