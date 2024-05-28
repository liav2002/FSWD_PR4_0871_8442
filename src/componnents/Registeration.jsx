import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Assuming you create a CSS file for the styles

function Registeration(props) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setIsSignIn(true); // Reset to sign-in state
  }

  function signUp(e) {
    e.preventDefault();
    const username = document.getElementById("signUp_Username").value;
    const email = document.getElementById("signUp_Email").value;
    const password = document.getElementById("signUp_Password").value;
    const confirmPassword = document.getElementById("signUp_confirmPassword").value;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const existingPlayers = JSON.parse(localStorage.getItem('players')) || [];
    const existingPlayer = existingPlayers.find(player => player.username === username);
    if (existingPlayer) {
      alert('User with this username already exists. Please sign in or use a different username.');
      return;
    }

    const newPlayer = { password: password, email: email, username: username, AllScores: [] };
    existingPlayers.push(newPlayer);
    localStorage.setItem('players', JSON.stringify(existingPlayers));
    props.addPlayer(newPlayer);
    closeModal();
  }

  function signIn(e) {
    e.preventDefault();
    const username = document.getElementById("signIn_Username").value;
    const password = document.getElementById("signIn_Password").value;
    const existingPlayers = JSON.parse(localStorage.getItem('players')) || [];
    const foundPlayer = existingPlayers.find(player => player.username === username);
    // Check if the user is already signed in
    if (props.currentGames.some(game => game.player.username === username)) {
      alert('User is already signed in.');
      return;
    }
    if (foundPlayer) {
      if (foundPlayer.password === password) {
        props.addPlayer(foundPlayer);
        closeModal();
      } else {
        alert('Incorrect password. Please try again.');
      }
    } else {
      alert('User not found. Please sign up.');
    }
  }

  return (
    <div className="container">
      <Button
        className="add-player-btn"
        onClick={handleToggle}
      >
        Add Player
      </Button>
      <Modal className='modal-lg' show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title id="authModalLabel">
            <Button variant="btn btn-warning" style={{ color: "white", backgroundColor: "#ea6ea6", border: "none" }} onClick={handleToggle}>
              {isSignIn ? 'SIGN UP' : 'SIGN IN'}
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className={isSignIn ? "vh-70" : "vh-100"} style={{ backgroundColor: '#f9f7f7' }}>
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-12 col-xl-11">
                  <div className="card" style={{ borderRadius: '25px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                            {isSignIn ? 'Sign In' : 'Sign Up'}
                          </p>
                          <form className="mx-1 mx-md-4">
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input type="text" id={isSignIn ? "signIn_Username" : "signUp_Username"} className="form-control" />
                                <label className="form-label" htmlFor={isSignIn ? "signIn_Username" : "signUp_Username"}>
                                  Username
                                </label>
                              </div>
                            </div>
                            {!isSignIn && (
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="email" id="signUp_Email" className="form-control" />
                                  <label className="form-label" htmlFor="signUp_Email">
                                    Email
                                  </label>
                                </div>
                              </div>
                            )}
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input type="password" id={isSignIn ? "signIn_Password" : "signUp_Password"} className="form-control" />
                                <label className="form-label" htmlFor={isSignIn ? "signIn_Password" : "signUp_Password"}>
                                  Password
                                </label>
                              </div>
                            </div>
                            {!isSignIn && (
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="password" id="signUp_confirmPassword" className="form-control" />
                                  <label className="form-label" htmlFor="signUp_confirmPassword">
                                    Repeat Password
                                  </label>
                                </div>
                              </div>
                            )}
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <Button
                                variant="btn btn-warning"
                                style={{ color: "white", backgroundColor: "#ea6ea6", border: "none" }}
                                type="submit"
                                onClick={isSignIn ? signIn : signUp}
                                className="btn btn-primary btn-lg"
                              >
                                {isSignIn ? 'Sign In' : 'Register'}
                              </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Registeration;
