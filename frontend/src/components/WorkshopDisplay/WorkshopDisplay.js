import React, { Component } from 'react';

import './WorkshopDisplay.css';

import WorkshopItem from '../WorkshopItem/WorkshopItem';

class WorkshopDisplay extends Component {
  constructor(props) {
    console.log('Constructing WorkshopDisplay ...');
    super(props);

    // TODO-code-challenge: Bonus: As a User, I can display the list of preferred workshops
    this.state = {
      data: []
    };

    let unlisten = this.props.history.listen((location, action) => {
      console.log('history refresh');
      if (location.pathname.includes('preferred') || location.pathname.includes('nearby')) {
        this.refreshWorkshops(location.pathname);
      }
    });
    this.stopHistoryUnlisten = unlisten;
  }

  componentDidMount() {
    console.log('WorkshopDisplay did mount');

    this.refreshWorkshops(this.props.location.pathname);
  }

  componentWillUnmount() {
    console.log('WorkshopDisplay Will unmount');
    this.stopHistoryUnlisten();
  }

 pathNameToTitle () {
    if (this.props.location.pathname.includes('nearby')) {
      return "Nearby Workshops"
    } else if (this.props.location.pathname.includes('preferred')) {
      return "Preferred Workshops";
    } else {
      return "";
    }
  }

  handleItemUnmount (id) {
    console.log(`Removing item ${id}`);
    let res = this.state.data.filter (item => {
      return item.props.id !== id;
    });
    this.setState({
      ...this.state,
      data: res
    })
  }

  fetchWorkshops (url) {
    fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then ( (resp) =>  resp.json() )
    .then ( (res) => {
      console.log(res);
      // data is a list of workshops
      // TODO-code-challenge: Core Functionality: As a User, I can display the list of workshops sorted by distance
      this.setState({
         data: res
       })
    })
    .catch( (err) => {
      console.error(err);
    });
  }

  refreshWorkshops (mode) {
    let url = "";

    if (!localStorage.getItem('token')) {
      this.props.history.push('/signin');
    }

    if (mode === '/workshops/nearby') {
      console.log('nearby');

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
          console.log(position.coords.longitude, position.coords.latitude);
          url = `http://localhost:3000/api/v1/workshops/nearby?x=${position.coords.longitude}&y=${position.coords.longitude}`;
          this.fetchWorkshops(url);
        }, (err) => {
          console.log('No permission for geolocation.');
          url = `http://localhost:3000/api/v1/workshops/nearby`;
          this.fetchWorkshops(url);
        });
      } else {
        console.log("Geolocation is not supported.");
        url = `http://localhost:3000/api/v1/workshops/nearby`;
        this.fetchWorkshops(url);
      }

    } else if (mode === '/workshops/preferred') {
      // TODO-code-challenge: Bonus: As a User, I can display the list of preferred workshops
       console.log("Get Preferred Workshops");
       url = `http://localhost:3000/api/v1/workshops/preferred`;
       this.fetchWorkshops(url);
    } else {
      this.props.history.push('/workshops/nearby');
    }
  }

  render() {

    return (
      <div className="WorkshopDisplay">
        <div>
          <h1 className="title">{this.pathNameToTitle()}</h1>
        </div>
          <div>
          {this.state.data.map((workshop) => {
          return (
          <WorkshopItem key={workshop._id}
                        name={workshop.name}
                        img={workshop.picture}
                        id={workshop._id}
                        preferred={this.pathNameToTitle()}/>
          );
          }
          )}
          </div>
      </div>
    );
  }
}

export default WorkshopDisplay;
