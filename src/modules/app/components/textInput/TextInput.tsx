import React from 'react'
import './TextInput.scss'

export const TextInput = () => {
  return (
    <div className='textInput'>
      <input className='textInput-input' type="text" placeholder='write your message...' />
      <button className='textInput-button' type='button'>Send</button>

    </div>
  )
}
