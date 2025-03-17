"use client"

import { useEffect } from "react"

function BootstrapClient() {
    useEffect(() => {
        // Bootstrap client side code here
        require('bootstrap/dist/css/bootstrap.min.css');
    }, [])
    return null
}
 
export default BootstrapClient;