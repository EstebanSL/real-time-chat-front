import React from 'react'
import './Message.scss'

export const Message = ({content}: any) => {
  return (
    <div className={content === 'own' ? 'message own' : 'message other'}>{content}</div>
  )
}
