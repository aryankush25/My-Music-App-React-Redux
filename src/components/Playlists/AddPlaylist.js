import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "./style.scss";

class AddPlaylist extends React.Component {
  handleAddPlaylist = async () => {
    var userObject = this.props.userObject.userData;
    userObject.playlists.push({
      playlist: []
    });

    this.props.handleLoadingStateChange(true);

    await firebase
      .firestore()
      .collection("users")
      .doc(this.props.userObject.userId)
      .update({
        playlists: userObject.playlists
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
    this.props.handleLoadingStateChange(false);
  };

  render() {
    if (
      this.props.userObject.userData.uId !== firebase.auth().currentUser.uid
    ) {
      return <p />;
    }
    return (
      <div className="button-class">
        {/* <button onClick={() => this.handleAddPlaylist()}>Add Playlist</button> */}
        <button
          type="button"
          className="btn btn-info btn-lg"
          data-toggle="modal"
          data-target="#myModal"
        >
          Open Modal
        </button>
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" />
                <h4 className="modal-title">Modal Header</h4>
              </div>
              <div className="modal-body">
                <p>Some text in the modal.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPlaylist;
