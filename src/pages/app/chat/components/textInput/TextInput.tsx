import React, { FormEvent, useContext, useState } from 'react'
import './TextInput.scss'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../../../context/AuthContext'
import { sendMessage } from '../../services/messages.service'
import useFetchAndLoad from '../../../../../hooks/useFetch';

export const TextInput = () => {

  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [inputValue, setInputValue] = useState('')
  const { loading, callEndpoint } = useFetchAndLoad();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!inputValue) return
    sendNewMessage()
  }

  const sendNewMessage = async () => {
    const bodyMessage = {
      from: user._id,
      to: id,
      created: new Date(),
      content: inputValue
    }
    await callEndpoint(sendMessage(bodyMessage));
    setInputValue('');
  };

  return (
    <form className='textInput' onSubmit={(e) => onSubmit(e)}>
      <input className='textInput-input' type="text" placeholder='write your message...' onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
      <button type='submit' className='textInput-button'>Send</button>
    </form>
  )
}
