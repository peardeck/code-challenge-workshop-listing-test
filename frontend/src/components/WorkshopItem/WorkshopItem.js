import React, { Component } from 'react';

import './WorkshopItem.css';

class WorkshopItem extends Component {

  componentWillUnmount () {
    console.log('Unmounting workshop item ');
  }

  likeClickHandler (ev) {
    console.log('like');
    if (!this.props.preferred) {
      fetch (`http://localhost:3000/api/v1/users/workshops/liked/${this.props.id}`, { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}, method: 'POST' })
      .then ( (resp) => {
        if (resp.status === 200) {
          console.log ('Workshop Item added to preferred workshops !');
          this.props.selfUnmount(this.props.id);
        }
        else {
          console.log(`Status returned ${resp.status}`); }
        } )
      .catch( (err) => {
        console.error(err);
      } );
    }
  }

  dislikeClickHandler (ev) {
    // TODO-code-challenge: Bonus: As a User, I can dislike a workshop, so it won’t be displayed within “Nearby WorkShops” list during the next 2 hours
      console.log('dislike workshop');
        if (!this.props.preferred) {
          fetch (`http://localhost:3000/api/v1/users/workshops/disliked/${this.props.id}`, { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}, method: 'POST' })
          .then ( (resp) => {
            if (resp.status === 200) {
              console.log ('Workshop Item added to disliked list');
              this.props.selfUnmount(this.props.id);
            }
            else {
              console.log(`Status returned ${resp.status}`); }
            } )
          .catch( (err) => {
            console.error(err);
          } );
        }
  }

  removeClickHandler (ev) {
    // TODO-code-challenge: Bonus: As a User, I can remove a workshop from my preferred workshops list
    console.log('unlike workshop');
            if (this.props.preferred) {
              fetch (`http://localhost:3000/api/v1/users/workshops/liked/${this.props.id}`, { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}, method: 'DELETE' })
              .then ( (resp) => {
                if (resp.status === 200) {
                  console.log ('Workshop Item removed from preferred workshops list');
                  this.props.selfUnmount(this.props.id);
                }
                else {
                  console.log(`Status returned ${resp.status}`); }
                } )
              .catch( (err) => {
                console.error(err);
              } );
            }
  }

  render() {
    return (
      <article className="workshop-item">
          <div className="up">
            <h2 className="title">{this.props.name}</h2>
          </div>
          <div className="middle">
            <img className="workshop-img" src={this.props.img} alt="" />
          </div>
          <div className="down">
            <div className={this.props.preferred === "Preferred Workshops" ? "hidden": ""}>
              <button className="workshop-btn dislike-btn" onClick={this.dislikeClickHandler.bind(this)}>Dislike</button>
              <button className="workshop-btn like-btn" onClick={this.likeClickHandler.bind(this)}>Like</button>
            </div>
            <div className={this.props.preferred === "Preferred Workshops" ? "": "hidden"}>
              <button className="workshop-btn remove-btn" onClick={this.removeClickHandler.bind(this)}>Remove</button>
            </div>
          </div>
      </article>
    );
  }
}

export default WorkshopItem;
