import React from 'react'
import axios from 'axios'


let data = [
    {
      height: 17.44140088558197,
      key: 1,
      label: 'head',
      stroke: '#ff0000',
      strokeWidth: 5,
      width: 31.788817048072815,
      x: 255.03821074962616,
      y: 278.25019359588623
    },
    {
      height: 25.68124681711197,
      key: 9,
      label: 'mouth',
      stroke: '#8a4512',
      strokeWidth: 5,
      width: 31.376904249191284,
      x: 249.68498349189758,
      y: 252.76387184858322
    },
    {
      height: 7.292528450489044,
      key: 11,
      label: 'torso',
      stroke: '#f9a35f',
      strokeWidth: 5,
      width: 18.15265119075775,
      x: 192.94247925281525,
      y: 202.47433483600616
    },
    {
      height: 7.818131148815155,
      key: 17,
      label: 'ruarm',
      stroke: '#800080',
      strokeWidth: 5,
      width: 8.332636952400208,
      x: 199.2872804403305,
      y: 235.35277843475342
    },
    {
      height: 6.804871559143066,
      key: 18,
      label: 'rhand',
      stroke: '#c0c0c0',
      strokeWidth: 5,
      width: 25.292494893074036,
      x: 286.2086832523346,
      y: 237.37424910068512
    },
    {
      height: 5.561724305152893,
      key: 22,
      label: 'rlleg',
      stroke: '#c74d90',
      strokeWidth: 5,
      width: 6.264844536781311,
      x: 265.7730385661125,
      y: 245.7118198275566
    },
    {
      height: 22.78658002614975,
      key: 23,
      label: 'ruleg',
      stroke: '#00ff7e',
      strokeWidth: 5,
      width: 29.657934606075287,
      x: 241.70121848583221,
      y: 232.90631473064423
    },
    {
      height: 14.265164732933044,
      key: 24,
      label: 'rfoot',
      stroke: '#d2b48b',
      strokeWidth: 5,
      width: 11.066800355911255,
      x: 290.34633338451385,
      y: 285.06008088588715
    },
    {
      x: 278.65625,
      y: 130.25,
      width: 73,
      height: 89,
      key: 9,
      stroke: '#000000',
      strokeWidth: 5,
      label: 'luleg'
    }
  ]

export default function Try() {

    axios.post('http://127.0.0.1:5000/update', data)

    return (
        <div>
            TRY
        </div>
    )
}
