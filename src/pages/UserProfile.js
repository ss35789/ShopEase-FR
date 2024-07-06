// src/components/UserProfile.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

function UserProfile() {
    const { user } = useAuth();

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="container px-4 px-lg-5 my-5">
            <h1>User Profile</h1>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">Email: {user.email}</p>
                    <p className="card-text">Address: {user.address}</p>
                    <p className="card-text">Phone: {user.tel}</p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
