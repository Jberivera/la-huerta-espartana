import React, {
  Component
} from 'react';
import { connect } from 'react-redux';

import { Nav, Footer } from '../';

class Root extends Component {

  render () {
    return (
      <div className="main-container">
        <Nav />
        <div className="container">
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, state);
}

export { React }
export default connect(mapStateToProps, null)(Root);
