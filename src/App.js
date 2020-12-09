import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "animate.css/animate.min.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import { SocialIcon } from 'react-social-icons';

function Product(props) {
  const site = "http://" + (props.link ?? props.id) + ".bforborum.com/";
  const imgSrc = props.img ?? "images/icon.png";
  return (
    <div id={props.id} className="col-sm-4">
      <a target="_blank" rel="noopener noreferrer" href={site}>
        <img src={site + imgSrc} alt={props.name + "logo"}/>
        <span>{props.name}</span>
      </a>
    </div>
  );
}

/**
  * Set key of each Product component in context of productList array
  * Set respectives properties of element in array to Product element
  * Display all Products in a Bootstrap row
*/
function ProductList(props) {
    const listItems = props.productList.map(el => {
      return <Product key={el.id} id={el.id} link={el.link} img={el.img} name={el.name} />
    });
    
    return (
      <div className="row" id="products">{listItems}</div>
    );
}

function Mission() {
  return (
    <ScrollAnimation animateIn="fadeIn">
      <div id="mission">
        <h1>Our Mission</h1>
        <h2>Provide free internet privacy through innovation that fights Big Tech</h2>
      </div>
    </ScrollAnimation>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    // Binding is necessary to make `this` work in the callback    
    this.searchStore = this.searchStore.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.productList = [
      {id: "q-a", link: "forum", name: "Borum Q&A"},
      {link: "farms", img: "icon.jpg", name: "Borum Farms"},
      {id: "flytrap", link: "audio", name: "Flytrap"},
      {link: "paint", img: "paint-pallete.png", name: "Borum Paint"},
      //{id: "chatfish", link: "chat", name: "Chatfish"},
      {id: "jottings", img: "images/favicon/icon.png", link: "jot", name: "Borum Jot"},
      {link: "feasts", img: "images/pizza.jpg", name: "Borum Feasts"},
      {link: "svjournal", img: "images/SVJIcon.ico", name: "The Silicon Valley Journal"},
      {link: "weather", img: "public/icon.png", name: "Borum Weather"},
      {link: "restaurants", img: "favicon.ico", name: "Borum Restaraunts"},
      {link: "memusic", img: "images/icon.jpg", name: "Me Music"}
      // <Product id="q-a" link="www" img="staticassets/images/icon.png" name="Borum Q&A" />,
      // <Product link="farms" img="icon.jpg" name="Borum Farms" />,
      // <Product id="flytrap" link="audio" name="Flytrap" />,
      // <Product link="paint" img="paint-pallete.png" name="Borum Paint" />,
      // <Product id="chatfish" link="chat" name="Chatfish" />,
      // <Product id="jottings" link="jot" name="Borum Jot" />,
      // <Product link="feasts" img="images/pizza.jpg" name="Borum Feasts" />,
      // <Product link="svjournal" img="images/SVJIcon.ico" name="The Silicon Valley Journal" />,
      // <Product link="news" img="icon.png" name="Borum News" />,
      // <Product link="weather" img="public/icon.png" name="Borum Weather" />,
      // <Product link="restaurants" img="favicon.ico" name="Borum Restaraunts" />,
      // <Product link="memusic" img="images/icon.jpg" name="Me Music" />
    ];

    this.state = {
      productList: this.productList
    };

  }

  handleKeyUp(e) {
    this.searchStore({target: e.target.nextSibling});
  }

  searchStore(e) {
    const query = e.target.previousSibling.value;
    this.setState({productList: this.productList.filter(p => p.name.includes(query))});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar fixed="top" bg="light" expand="md">
            <Navbar.Brand href="/">Borum Technologies</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#products">Products</Nav.Link>
                <Nav.Link href="#mission">Mission</Nav.Link>
                <Nav.Link target="_blank" rel="noopener noreferrer" href="http://blog.bforborum.com">Blog</Nav.Link>
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              <Form inline>
                <FormControl onKeyUp={this.handleKeyUp} type="text" placeholder="Search" className="mr-sm-2" />
                <Button onClick={this.searchStore} variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <ProductList productList={this.state.productList} />
        <Mission />
        <footer>
          <div className="social-icons">
            <SocialIcon url="https://www.youtube.com/channel/UCDDyVIflz8dUhHIb2YmA9hQ" />
          </div>
          <p className="copyright">&copy; 2020 Borum Inc.</p>
        </footer>
      </div>
    );
  }
}

export default App;
