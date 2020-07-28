import React, {useState} from 'react';
import './search.scss';

//Necessary for <Search> to work:

//Data (See src/views/properties.js) (all should be state variables):

//1. Input data (passed as input prop).

//2. Where you want the data output (passed as outputLocation prop).

//3. isFiltered (true/false) location (passed as isFilteredLocation prop).

//4. The message you want displayed as a placeholder.

//Functions: Need to write two functions in whatever parent component you import <Search> into.

//1. Function to set 'isFiltered' state (T/F) in the parent component. Pass this function to <Search> via setIsFilteredStateFalse props. (See src/views/properties.js - setIsFilteredPropertiesFalse for example)

//2. Function to set 'filteredResults' state within the parent component, and also 'isFiltered' state back to true. (See src/views/properties.js - setOutputState for example)

//Search is designed to not include the ID as a searchable paramater.

function Search(props) {
    const { input, outputLocation, isFilteredLocation, setOutputState, setIsFilteredStateFalse, placeholderMessage } = props;

    const enterSearchHandler = (event) => {
      var keyCode = event.keyCode;
      if (keyCode === 13){
        searchProperties();
      }
    };

    const clearSearch = () => {
      props.setIsFilteredStateFalse();
      document.getElementById("searchQueryComponent").value = "";

    };

    const searchProperties = () => {
      let allData = input;
      let output = [];
      let searchQuery = document.getElementById("searchQueryComponent").value.toLowerCase().trim();

       if(searchQuery.length > 0){
          for (var i=0;i < allData.length; i++) {
              let dataPoint = Object.assign({}, allData[i]);
              delete dataPoint.id;
              if (Object.values(dataPoint).toString().toLowerCase().includes(searchQuery)){
                  output.push(allData[i]);
                  console.log(allData[i]);
            }
          };
      props.setOutputState(output, true)
      }
  };


    return (
      <div className="search-section">
        <input className="input search is-rounded" id="searchQueryComponent" onKeyDown={enterSearchHandler} placeholder={placeholderMessage}></input>
          <button className="save_button button is-rounded" onClick={searchProperties}type="submit">
             Search
          </button>
          <button className="save_button button is-rounded clearButton" onClick={clearSearch}type="submit">
             Clear Search
          </button>
      </div>
    );
};

export default Search;
