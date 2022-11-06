import { Client } from '@xmtp/xmtp-js'
import React, { useState } from 'react'
import {
  Container,
  Button,
  Card,
  StylesProvider,
  TextField,
  MenuItem,
} from '@material-ui/core'
import './Chat.css'

export default function XmtpChat({ wallet, loggedUser, signer }) {
  const date = new Date().toJSON().slice(0, 10).split('-').reverse().join('-')
  const [connection, setConnection] = useState(null)
  const [chatMessages, setChatMessages] = useState(null)
  const [buyerInput, setBuyerInput] = useState(null)
  const [inputText, setInputText] = useState(null)
  const [message, setMessage] = useState(null)

  const connectXmtpClient = async () => {
    const xmtp = await Client.create(signer)
    setConnection(xmtp)

    const conversation = await xmtp.conversations.newConversation(wallet)
    // Load all messages in the conversation
    const messages = await conversation.messages()
    const allConversations = await xmtp.conversations.list()

    const tempMsgs = []
    for (let msg of messages) {
      if (msg.recipientAddress === loggedUser) {
        tempMsgs.push(msg)
      }
    }
    setChatMessages(tempMsgs)
    for await (const message of await conversation.streamMessages()) {
      console.log(`[${message.senderAddress}]: ${message.text}`)
    }
  }

  const sendXmtpMesg = async () => {
    const xmtp = await Client.create(signer)
    // Start conversation with Organizer
    const conversation = await xmtp.conversations.newConversation(sender)
    // Send a message
    const send = await conversation.send(message)
    const messages = await conversation.messages()
    console.log('🚀messages', messages)
    setBuyerInput(inputText)
  }

  const initilizeXMTP = async () => {
    // Create the client with your wallet. This will connect to the XMTP development network by default
    const xmtp = await Client.create(wallet)
  }
  return (
    <div className="xmtpchat-body">
      {xmtpconnection ? (
        <div class="wrapper">
          <div class="left">
            <div class="left-container">
              <div class="left-card">
                <div class="left-card-container">
                  {/* this should take 575px */}
                  <div className="item1">
                    <div class="left-header">
                      <div class="left-header-container">
                        <div>
                          <div class="arrow"></div>
                          <span class="header-bold">{currentApt.name}</span>
                        </div>
                        <div class="kebab-menu">
                          <img
                            src="https://i.postimg.cc/mk2w8wBr/Dots.png"
                            alt="kebab-menu"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="today">{date}</div>
                    <div class="left-body">
                      <div class="left-body-container">
                        {you}

                        {company}
                        <br />
                        {currentAccount === loggedUser ? message : ''}

                        <div class="fourth">
                          <img
                            src="https://i.postimg.cc/PxgHD2DB/Group-39.png"
                            alt="third-avt"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item2">
                    <div class="left-footer">
                      <div class="left-footer-container">
                        <div class="input-group">
                          <div class="input-container">
                            <div>
                              <div class="share">
                                <img
                                  src="https://i.postimg.cc/5ysmGkmr/Attachment.png"
                                  alt="share"
                                />
                              </div>
                              <div class="inp">
                                <input
                                  type="text"
                                  placeholder="Type something..."
                                  value={message}
                                />
                              </div>
                            </div>
                            <div class="emoji">
                              <img
                                src="https://i.postimg.cc/76x0knbr/Smiley.png"
                                alt="emoji"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="btn-container">
                          <button>
                            <img
                              src="https://i.postimg.cc/5t4hhvd2/Union-1.png"
                              alt="send"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- left-end -->

      <!-- right-start --> */}
          <div class="right">
            <div class="right-container">
              <div class="right-card">
                <div class="right-card-container">
                  <h3 class="card__title">{currentApt.name}</h3>
                  <p class="card__description">{currentApt.description}</p>
                  <img
                    src={currentApt.image ? currentApt.image : ''}
                    class="xmtpchat-card__image"
                    alt=""
                  />
                  <br />
                  <br />
                  <br />
                  <div class="right-card-header">
                    <span class="header-bold">My Contact List</span>
                    <div>
                      <img
                        src="https://i.postimg.cc/65dRS4fS/Dots-1.png"
                        alt="kebab"
                      />
                    </div>
                  </div>
                  <div class="right-card-body">
                    <div class="right-card-body-container">
                      <div class="card">
                        <div class="profile">
                          <div>
                            <img
                              src="https://i.postimg.cc/PJMXbH16/Icon.png
                            "
                              alt="profile"
                            />
                          </div>
                          <div class="profile-info">
                            <span class="name-font">Rosa Restaurant</span>
                            <span class="job-font">Street Vendor Business</span>
                          </div>
                        </div>
                        <div class="icons">
                          <div>
                            <img
                              src="https://i.postimg.cc/Jnv6TH50/Message.png"
                              alt="message"
                            />
                          </div>
                          <div>
                            <img
                              src="https://i.postimg.cc/9XwND1c7/Phone.png"
                              alt="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="profile">
                          <div>
                            <img
                              src="https://i.postimg.cc/yN5tGGV7/Icon-1.png
                            "
                              alt="profile"
                            />
                          </div>
                          <div class="profile-info">
                            <span class="name-font">Your Name</span>
                            <span class="job-font">Message: {message} </span>
                          </div>
                        </div>
                        <div class="icons">
                          <div>
                            <img
                              src="https://i.postimg.cc/Jnv6TH50/Message.png"
                              alt="message"
                            />
                          </div>
                          <div>
                            <img
                              src="https://i.postimg.cc/9XwND1c7/Phone.png"
                              alt="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="profile">
                          <div>
                            <img
                              src="https://i.postimg.cc/1tGBK7XC/Icon-2.png"
                              alt="profile"
                            />
                          </div>
                        </div>
                        <div class="icons">
                          <div>
                            <img
                              src="https://i.postimg.cc/Jnv6TH50/Message.png"
                              alt="message"
                            />
                          </div>
                          <div>
                            <img
                              src="https://i.postimg.cc/9XwND1c7/Phone.png"
                              alt="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="profile">
                          <div>
                            <img
                              src="https://i.postimg.cc/CKDsFrGh/Icon-3.png
                            "
                              alt="profile"
                            />
                          </div>
                        </div>
                        <div class="icons">
                          <div>
                            <img
                              src="https://i.postimg.cc/Jnv6TH50/Message.png"
                              alt="message"
                            />
                          </div>
                          <div>
                            <img
                              src="https://i.postimg.cc/9XwND1c7/Phone.png"
                              alt="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="profile">
                          <div>
                            <img
                              src="https://i.postimg.cc/K83nNpsP/Icon-4.png
                            "
                              alt="profile"
                            />
                          </div>
                        </div>
                        <div class="icons">
                          <div>
                            <img
                              src="https://i.postimg.cc/Jnv6TH50/Message.png"
                              alt="message"
                            />
                          </div>
                          <div>
                            <img
                              src="https://i.postimg.cc/9XwND1c7/Phone.png"
                              alt="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="profile">
                          <div>
                            <img
                              src="https://i.postimg.cc/JnYnSMsG/Icon-5.png
                            "
                              alt="profile"
                            />
                          </div>
                        </div>
                        <div class="icons">
                          <div>
                            <img
                              src="https://i.postimg.cc/Jnv6TH50/Message.png"
                              alt="message"
                            />
                          </div>
                          <div>
                            <img
                              src="https://i.postimg.cc/9XwND1c7/Phone.png"
                              alt="phone"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={connectXmtpClient}>
          Connect to Xmtp Client
        </Button>
      )}
    </div>
  )
}
