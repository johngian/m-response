import React from 'react'

import Avatar from '@components/avatar'
import HomePageCard from '@components/home-page-card'
import Leaderboard from '@components/leaderboard'
import { staticAsset } from '@utils/urls'

import './home.scss'

export default class HomePage extends React.Component {
  componentWillMount () {
    this.props.updateAppConfig()
    this.props.updateHomeConfig()
    this.props.updateKarma()
    this.props.updateProfile()
    this.props.updateLeaderboard()
  }

  render () {
    const {
      profile,
      feedbackLink,
      aboutLink,
      goToProfile,
      respondQueue,
      moderateQueue,
      goToRespondMode,
      goToModerateMode,
      leaderboard
    } = this.props

    if (!profile) {
      return null
    }

    return (
      <div className='home-page'>
        <header className='home-page-header'>
          <img
            className='home-page-header-logo'
            src={staticAsset('media/mozilla-logo-white.png')}
            alt='' />
          <Avatar
            className='home-page-header-avatar'
            src={profile.picture}
            karma={profile.karma.points}
            coverIcon={staticAsset('media/icons/user.svg')}
            onClick={goToProfile} />
        </header>

        <section className='home-page-content'>
          <HomePageCard
            icon={staticAsset('media/icons/respond-black.svg')}
            bgColor='orange'
            title='Respond'
            subtitle={`Queue: ${Number(respondQueue).toLocaleString()}`}
            onClick={goToRespondMode} />
          <HomePageCard
            icon={staticAsset('media/icons/moderate-black.svg')}
            bgColor='blue-lighter'
            title='Moderate'
            subtitle={`Queue: ${Number(moderateQueue).toLocaleString()}`}
            onClick={goToModerateMode} />

          <Leaderboard
            className="home-page-leaderboard"
            leaderboard={leaderboard} />
        </section>

        <footer className='home-page-footer'>
          <a
            className='home-page-footer-link'
            href={feedbackLink}
            target='_blank'>
              Submit Feedback
          </a>
          <a
            className='home-page-footer-link'
            href={aboutLink}
            target='_blank'>
              About
          </a>
        </footer>
      </div>
    )
  }
}
