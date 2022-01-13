import React from "react";
import './../styles/App.css';
import shortid from "shortid";

export class FetchNasaApod extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      img: "",
      expl: "",
      loading: true
    };
  }
  
  async componentDidMount() {
    const url = "https://api.nasa.gov/planetary/apod?api_key=fG2PZvawEUDIqN5X2Sp4qNSRMD6rK14Ei9463Npe";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({img: data.url, expl: data.explanation, loading: false});
  }

  render() {
    if (this.state.loading) {
      return (<div>loading...</div>)
    }

    return (
      <div>
        <img className="img" src={this.state.img}></img>
        <p>{this.state.expl}</p>
      </div>
    );
  }
}

export class FetchNasaNeoWs extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 0,
      asteroids: [],
      loading: true
    };
  }
  
  async componentDidMount() {
    let date = new Date();
    date = date.toISOString().split('T')[0];
    const url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + date + "&api_key=fG2PZvawEUDIqN5X2Sp4qNSRMD6rK14Ei9463Npe";
    const response = await fetch(url);
    const data = await response.json();
    const shuffled = data.near_earth_objects[date].sort(() => 0.5 - Math.random()); 
    let tempdata = shuffled.slice(0, this.props.value);
    this.setState({count: data.element_count, asteroids: tempdata, loading: false});
  }

  render() {
    if (this.state.loading) {
      return (<div>loading...</div>)
    }

    return (
      <div>
        <p>There are: {this.state.count} asteroids near earth today. Here are {this.props.value} random asteroids of them:</p>
        <ul>
        {this.state.asteroids.map(asteroid => (
          <li key={shortid.generate()}>
            The asteroid <strong>{asteroid.name}</strong> has an estimated diameter between <strong>{asteroid.estimated_diameter.kilometers.estimated_diameter_min}</strong> and <strong>{asteroid.estimated_diameter.kilometers.estimated_diameter_max} km</strong>.<br/><strong>{asteroid.is_potentially_hazardous_asteroid ? "It is potentially hazardous " : "It isn't hazardous "}</strong> and it will have approached us at <strong>{asteroid.close_approach_data[0].close_approach_date_full}</strong> with a velocity of <strong>{asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</strong> but will luckily 
            miss us by <strong>{asteroid.close_approach_data[0].miss_distance.kilometers} km </strong>.
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

export class FetchNasaMRP extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      images: [],
      loading: true
    };
  }
  
  async componentDidMount() {
    const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY";
    const response = await fetch(url);
    const data = await response.json();
    const shuffled = data.photos.sort(() => 0.5 - Math.random()); 
    let tempdata = shuffled.slice(0, this.props.value);
    this.setState({images: tempdata, loading: false});
  }

  render() {
    if (this.state.loading) {
      return (<div>loading...</div>)
    }

    return (
      <div>
        <p>Here are {this.props.value} random photos from the mars rovers:</p>
        <ul>
        {this.state.images.map(image => (
          <div key={shortid.generate()}>
            <img src={image.img_src}/><br/>
          </div>
        ))}
        </ul>
      </div>
    );
  }
}