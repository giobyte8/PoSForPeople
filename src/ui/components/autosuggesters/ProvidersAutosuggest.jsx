import React from 'react';
import PropTypes from 'prop-types';
import ProvidersService from "../../../services/ProvidersService";
import TBAutosuggest from './TBAutosuggest';

class ProvidersAutosuggest extends React.Component {
  constructor(props) {
    super(props);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);

    this.state = { suggestions: [] };
  }

  static getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  static renderSuggestion(suggestion) {
    return (
      <div className="suggestion-item">
        { suggestion.name }
      </div>
    )
  }

  onSuggestionsFetchRequested({ value }) {
    ProvidersService.find(value, 5, suggestions => {
      this.setState({ suggestions: suggestions });
    });
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  render() {
    return (
      <TBAutosuggest
        label="Proveedor"
        suggestions={ this.state.suggestions }
        onSugFetchRequested={ this.onSuggestionsFetchRequested }
        onSugClearRequested={ this.onSuggestionsClearRequested }
        onSugSelected={ this.props.onProviderSelected }
        getSugValue={ ProvidersAutosuggest.getSuggestionValue }
        renderSug={ ProvidersAutosuggest.renderSuggestion }
        value={ this.props.value }
        onValueChange={ this.props.onValueChange }
        error={ this.props.error }
      />
    );
  }
}

ProvidersAutosuggest.propTypes = {
  onProviderSelected: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default ProvidersAutosuggest;
