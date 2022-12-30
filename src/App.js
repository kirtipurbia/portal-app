import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Loadable from 'react-loadable';

const LayoutAsync = Loadable({
  loader: () => import('./Component/Layout'),
  loading() {
    return <div className="loading" />;
  }
});
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <LayoutAsync></LayoutAsync>
      </BrowserRouter>
    );
  }
}
export default App;