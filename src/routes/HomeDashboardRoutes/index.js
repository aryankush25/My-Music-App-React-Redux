import React from "react";
import HomePageDashboard from "../../components/HomePageDashboard";
import MusicBar from "../../components/MusicBarComponents/";
import "./style.scss";
import { connect } from "react-redux";

const MusicBarComponent = props => {
  if (props.arrayIsEmpty) {
    return <div className="music-bar" />;
  }

  return <MusicBar />;
};

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <div className="home-page-div">
          <HomePageDashboard />

          {/* Music Bar Div That Contains the music bar elements */}

          <MusicBarComponent arrayIsEmpty={this.props.arrayIsEmpty} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { songArray } = state.song;

  var arrayIsEmpty = false;
  if (songArray.length === 0) {
    arrayIsEmpty = true;
  }

  return {
    arrayIsEmpty
  };
};

export default connect(mapStateToProps)(Home);
