import React from 'react'
import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    RedditShareButton, RedditIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
  } from "react-share"


const ModalShare = ({url}) => {
  return (
    <div>
        <div className="share__modal flex item-center gap-3">
            <FacebookShareButton url = {url} >
                <FacebookIcon round = {true} size = {32}/>
            </FacebookShareButton>

            <EmailShareButton url = {url}  >
                <EmailIcon round = {true} size = {32}/>
            </EmailShareButton>

            <RedditShareButton url = {url} >
                <RedditIcon round = {true} size = {32}/>
            </RedditShareButton>

            <TelegramShareButton url = {url}  >
                <TelegramIcon round = {true} size = {32}/>
            </TelegramShareButton>

            <TwitterShareButton url = {url}  >
                <TwitterIcon round = {true} size = {32}/>
            </TwitterShareButton>

            <WhatsappShareButton url = {url}  >
                <WhatsappIcon round = {true} size = {32}/>
            </WhatsappShareButton>
        </div>
    </div>
  )
}

export default ModalShare