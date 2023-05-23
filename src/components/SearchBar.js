import React, {useState} from 'react'
import '../components/SearchBar.css'
// import Autosuggest from 'react-autosuggest';

const SearchBar = (props) => {

const [searchText, setSearchText] = useState('');

const handleChange = (event)=> {
    setSearchText(event.target.value)
}

const handleSubmit = (event) => {
    event.preventDefault()
    props.onSearch(searchText)
    setSearchText('')
    console.log('Search', searchText);
}


  return (
    <form onSubmit={handleSubmit} className="search-bar">
    <input
      type="text"
      value={searchText}
      onChange={handleChange}
      placeholder="Search by name or number..."
      className="search-input"
    />
    <button type="submit" className="search-button">
      Search
    </button>
  </form>
  )
}

export default SearchBar