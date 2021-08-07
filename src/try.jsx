import React from 'react'
import axios from 'axios'


export default function Try() {

    axios.post('http://127.0.0.1:5000/update',{label_name: 'head', cords: []})

    return (
        <div>
            TRY
        </div>
    )
}
