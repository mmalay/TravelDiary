import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const City = props => (
  <div className="card" style={{ width: '18rem' }}>
    <div>
      {props.city.sites.length > 0 ? (
        <img
          src={`http://localhost:5000/${props.city.sites[0].imageData}`}
          className="card-img-top"
          alt="..."
        />
      ) : (
        <img
          src={require('../assets/defaultImage.png')}
          className="card-img-top"
          alt="..."
        />
      )}
    </div>

    <div className="card-body">
      <h5 className="card-title">{props.city.cityname}</h5>
      <Link
        className="btn btn-primary"
        to={{
          pathname: `sites/${props.city._id}`,
          cityid: props.city._id
        }}
      >
        See Sites
      </Link>
      {'  '}
      <Link
        className="btn btn-primary"
        to={{
          pathname: `addsite/${props.city._id}`,
          cityid: props.city._id
        }}
      >
        Add Site
      </Link>
      {'  '}
      <Link
        className="btn btn-primary"
        to={{
          pathname: `editcity/${props.city._id}`,
          cityid: props.city._id
        }}
      >
        Edit
      </Link>
      {'  '}
      <a
        href="#"
        className="btn btn-primary"
        onClick={() => {
          props.deleteCity(props.city._id);
        }}
      >
        delete
      </a>
    </div>
  </div>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteCity = this.deleteCity.bind(this);

    this.state = { cities: [] };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/')
      .then(response => {
        this.setState({ cities: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteCity(id) {
    axios.delete('http://localhost:5000/' + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      cities: this.state.cities.filter(el => el._id !== id)
    });
  }

  cityList() {
    return this.state.cities.map(currentcity => {
      return (
        <City
          city={currentcity}
          deleteCity={this.deleteCity}
          key={currentcity._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>City List</h3>
        {this.cityList()}
      </div>
    );
  }
}