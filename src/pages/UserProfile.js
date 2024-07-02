import React from 'react';

function UserProfile() {
    return (
        <div className="container px-4 px-lg-5 my-5">
            <h1>User Profile</h1>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">User Name</h5>
                    <p className="card-text">Email: user@example.com</p>
                    <p className="card-text">Address: 1234 Main St, Anytown, USA</p>
                    <p className="card-text">Phone: (123) 456-7890</p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
