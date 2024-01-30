import { faReply, faShare, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
  notation: string[]
}
const NotationList: React.FC<Props> = ({notation}) => {
    const whichIcon = (direction: string) => {
        switch (direction) {
            case "left":
                return faReply
            case "right":
                return faShare
            case "forward":
                return faUpLong
            default:
                return faReply
        }
}
  return (
    <div className='border dark:border-slate-800 p-2 rounded-md text-slate-300'>
        <ul>

        {notation.map((item, index) => (
            <li key={index} className='flex items-center'>
                <div>
                {index+1}
                {item === "left" || item === "right" || item === "forward" ? <FontAwesomeIcon icon={whichIcon(item)}/> : item}</div>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default NotationList