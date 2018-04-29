import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isEmpty } from 'ramda';
import { withRouter } from 'react-router-dom';

import { Wrapper, Title, Form, Input, Btn, BtnText, SearchIcon } from './SearchStyles';
import { fetchPlaylist } from '../../actions/search';

class Search extends Component {
  handleFormSubmit = ({ query }) => {
    const { fetchPlaylist, accessToken, history } = this.props;
    fetchPlaylist(accessToken, query);
    history.push('/playing');
  };

  renderSearchField = ({ input }) => (
    <Form {...input}>
      <SearchIcon />
      <Input />
      <Btn type="submit">
        <BtnText>Search</BtnText>
      </Btn>
    </Form>
  );

  render() {
    const { handleSubmit } = this.props;

    return (
      <Wrapper>
        <Title>
          Enter a keyword and we'll create a playlist from the most popular Spotify songs in
          playlists with that title
        </Title>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field
            name="query"
            type="text"
            component={this.renderSearchField}
            placeholder="Enter a keyword..."
          />
        </form>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
  playlists: state.playlists
});

export default reduxForm({
  form: 'search'
})(connect(mapStateToProps, { fetchPlaylist })(withRouter(Search)));