import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; 

function TopPlayersModal({ onClose }) {
    const [showModal, setShowModal] = useState(false);
    const players = JSON.parse(localStorage.getItem('players')) || []; // Use default empty array if 'players' data is not found
    const topPlayers = players
        .slice(0, 3) // Get the top 3 players
        .sort((a, b) => {
            // Sort players based on their minimum score
            const minScoreA = Math.min(...a.AllScores);
            const minScoreB = Math.min(...b.AllScores);
            return minScoreA - minScoreB;
        }); 
    const handleToggle = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div className="container">
            <Button className="top-player-btn" onClick={handleToggle}>
                Top Players
            </Button>
            <Modal className='modal-lg' show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="authModalLabel">
                        Top 3 Players
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {topPlayers.map((player, index) => (
                            <li key={index}>
                                <strong>{player.username}</strong> - Minimum Score: {Math.min(...player.AllScores)}
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TopPlayersModal;
