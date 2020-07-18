import React from 'react';
import logo from './logo.svg';
import './App.css';


function List(props) {
  return (
    <ol className="item-list">
   		{props.items.map((item, index) => <li key={index}>{item}</li>)}
  	</ol>
  );
}

function AddButton(props) {
  return (
    <button disabled={props.inputIsEmpty}>Add</button>
  );
}

function DeleteButton(props) {
  return (
    <button onClick={props.deleteLastItem} disabled={props.noItemsFound}>
    	Delete Last Item
   	</button>
   );
}

function FormWrap(props) {
  return (
    <div class="form-wrap">
    <form onSubmit={props.addItem}>
      <input
        type="text"
        placeholder="Enter New Item"
        value={props.value}
        onChange={props.handleChange}
      />

	  <AddButton inputIsEmpty={props.inputIsEmpty} />
     </form>

	 <DeleteButton deleteLastItem={props.deleteLastItem} noItemsFound={props.noItemsFound} />
	</div>
  );
}

function Header(props) {
  return (
    <header className="App-header">
      <img src={props.logo} className="App-logo" alt="logo" />
  	  <h1 className="App-title">ReactND - Coding Practice</h1>
    </header>
  );
}

class App extends React.Component {
  state = {
    value: '',
    items: [],
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  addItem = event => {
    event.preventDefault();
    this.setState(oldState => ({
      items: [...oldState.items, this.state.value],
    }));
  };

  deleteLastItem = event => {
    this.setState(prevState => ({ items: this.state.items.slice(0, -1) }));
  };

  inputIsEmpty = () => {
    return this.state.value === '';
  };

  noItemsFound = () => {
    return this.state.items.length === 0;
  };

  render() {
    return (
      <div className="App">
    	<Header logo={logo} />
        <h2>Shopping List</h2>
        <FormWrap 
    		addItem={this.addItem} 
			value={this.state.value}
			handleChange={this.handleChange}
			inputIsEmpty={this.inputIsEmpty()}
			deleteLastItem={this.deleteLastItem}
			noItemsFound={this.noItemsFound()}
		/>
    	<p className="items">Items</p>
        <List items={this.state.items} />
      </div>
    );
  }
}

export default App;
