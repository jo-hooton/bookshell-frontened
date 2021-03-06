import React from 'react'

import API from '../API'
import Booklet from './Booklet'
import BookletPreview from './BookletPreview'

import { Route, Switch } from 'react-router-dom'

class Booklets extends React.Component {
  state = {
    booklets: [],
  }

  style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', 
    justifyContent: 'center'
  }

  getUserBooklets() {
    API.getUserBooklets()
      .then(data => {
        if (data.error) {
          alert('You are not signed in.')
        } else {
          this.setState({ booklets: data.data })
        }
      })
  }

  handleClick = (id) => {
    this.props.history.push(`/mybooklets/${id}`)
  }

  componentDidMount() {
    if (!this.props.username) {
      this.props.history.push('/login')
    } else {
      this.props.getUserBooklets()
    }
  }

  updateBooklets = (booklets) => {
    this.setState({booklets: booklets})
  }

  render () {
    const { booklets } = this.props
    
    return (
      <div>
       
        { 
          
          <Switch>
            <Route path='/mybooklets/:id' render={props => <Booklet {...props} updateBooklets={this.updateBooklets} booklets={booklets} />} />
            <Route path='/mybooklets' render={props => {
              return <>
              <h3>Your Booklets</h3>
              <div  style={this.style} className='user-list'>
               { booklets.length === 0 && <p>You don't have any booklets yet!</p>} 
               {booklets.map(booklet =>
                <BookletPreview route="mybooklets" key={booklet.id} booklet={booklet} handleClick={this.handleClick}/>
              )}
              </div>
              </>
            }}/>
          </Switch>
        
      }
      </div>
    )
  }
}

export default Booklets
