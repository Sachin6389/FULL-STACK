import React from 'react'

import LatestCollation from '../componet/latestCollation'
import Collection from './Collection'
import { useLocation } from 'react-router-dom'



function Home() {

    return (
        <div>
       <Collection/>
       <LatestCollation/>
       
       </div>
    )
}

export default Home
