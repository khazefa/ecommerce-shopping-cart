import React, { Component } from 'react'
import './App.css';
import Products from './Components/Products';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: '',
      sort: '',
      cartItems: [],
      products: [],
      filteredProducts: []
    };
  }

  componentWillMount(){
    if (localStorage.getItem('cartItems')) {
      this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItems')) });
    }

    fetch('http://localhost:8027/products/', {
      headers: {
        contentType: 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        this.setState({ products: data });
        this.listProducts();
      });
  }

  listProducts = () => {
    this.setState(state => {
      // Filtering and sorting go here.     
      return { filteredProducts: state.products };
    })
  }

  handleAddToCart = (e, product) => {
    console.log("Add to cart");
  }

  render() {
    return (
      <div className="container">
          <h1>E-Commerce Shopping Cart App</h1>
          <hr />
          <div className="row">
            <div className="col-md-9">
              <hr />
              <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart} />
            </div>
            <div className="col-md-3">

            </div>
          </div>
      </div>
    );
  }
}

export default App;
