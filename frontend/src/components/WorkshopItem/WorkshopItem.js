import React, { Component } from 'react';

import './WorkshopItem.css';

class WorkshopItem extends Component {
  constructor(props){
    super(props);
    this.likeClickHandler.bind(this);
    this.dislikeClickHandler.bind(this);
     this.removeClickHandler.bind(this);
  }
  componentWillUnmount () {
    console.log('Unmounting workshop item ');
  }

  likeClickHandler (_id) {
    console.log('like');
    console.log(_id);
    if (!this.props.preferred) {
      fetch (`http://localhost:3000/api/v1/users/workshops/liked/${_id}`, { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}, method: 'POST' })
      .then ( (resp) => {
        if (resp.status === 200) {
          console.log ('Workshop Item added to preferred workshops !');
          this.props.selfUnmount(this.props._id);
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
  }

  removeClickHandler (ev) {
    // TODO-code-challenge: Bonus: As a User, I can remove a workshop from my preferred workshops list
  }

  render() {
    return (
      <article id={this.props.id} className="workshop-item">
        <div className="up">
          <h2 className="title">{this.props.name}</h2>
        </div>
        <div className="middle">
          <img className="workshop-img" src={this.props.picture} alt="" />
        </div>
        <div className="down">
          <div className={this.props.preferred ? "hidden" : ""}>
            <button
              className="workshop-btn dislike-btn"
              onClick={this.dislikeClickHandler}
            >
              Dislike
            </button>
            <button
              className="workshop-btn like-btn"
              onClick={() => {this.likeClickHandler(this.props._id)}}
            >
              Like
            </button>
          </div>
          <div className={this.props.preferred ? "" : "hidden"}>
            <button
              className="workshop-btn remove-btn"
              onClick={this.removeClickHandler}
            >
              Remove
            </button>
          </div>
        </div>
      </article>
    );
  }
}

export default WorkshopItem;
