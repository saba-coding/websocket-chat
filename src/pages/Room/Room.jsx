import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useSocket } from 'socket'
import socketManager from 'socket/socketManager'
import socketEvents from 'socket/socketEvents'
import conversationSelectors from 'state/conversation/conversationSelectors'
import userSelectors from 'state/user/userSelectors'

import UserInfo from 'components/UserInfo'

import Conversations from './Conversations'
import NoConversation from './NoConversation'
import Chat from './Chat'

import {
  StyledContainer,
  StyledSubContainer
} from './RoomStyles'

const Room = () => {
  const dispatch = useDispatch()
  const conversationId = useSelector(conversationSelectors.currentConversationIdSelector)
  const user = useSelector(userSelectors.userSelector)

  useSocket(socketEvents.newMessage, socketManager.onNewMessage(dispatch, user.id))
  useSocket(socketEvents.userJoined, socketManager.onUserJoined(dispatch))
  useSocket(socketEvents.userLeft, socketManager.onUserLeft(dispatch))

  return (
    <StyledContainer>
      <UserInfo />
      <StyledSubContainer>
        <Conversations />
        {conversationId && <Chat conversationId={conversationId} />}
        {!conversationId && <NoConversation />}
      </StyledSubContainer>
    </StyledContainer>
  )
}

export default Room
