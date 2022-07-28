import * as React from "react"

export default function SvgComponent (props) { 
    return (
  <svg height={21} width={21} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill={props.fill?props.fill:"none"}
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.5 4.5-1.978-2-2.022 2M10.5 2.5v9M7.5 6.5h-1a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1" />
    </g>
  </svg>
)

}
