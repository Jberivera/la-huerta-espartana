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
        <main className="container">
          { this.props.children }
        </main>
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
