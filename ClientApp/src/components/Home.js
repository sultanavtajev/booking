import React, { Component } from 'react';
import { Carousel } from './content/Carousel';

export class Home extends Component {
  static displayName = Home.name;

  render() {
      return (
        <Carousel />
    );
  }
}
