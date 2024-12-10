import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnnouncementBar from '../Header/AnnouncementBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const UserProfile = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('authToken')
                const response = await axios.get('http://localhost:7800/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userData = response.data;
                setFullName(userData.fullName || '');
                setEmail(userData.email || '');
                setPhone(userData.phone || '');
            } catch (err) {
                setError('Failed to fetch user data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handlePictureUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            await axios.put('http://localhost:7800/api/users/profile', {
                name: fullName,
                email,
                phone,
            }, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
            });
            alert('Profile updated successfully');
        } catch (err) {
            console.error('Error updating profile:', err);
            alert('Failed to update profile');
        }
    };

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <>
            <AnnouncementBar />
            <Header />
            <div style={styles.pageContainer}>
                <div style={styles.container}>
                    <div style={styles.profileSection}>
                        {profilePicture ? (
                            <img 
                                src={profilePicture} 
                                alt="" 
                                style={styles.profileImage} 
                            />
                        ) : (
                            <div style={styles.placeholderImage}></div>
                        )}
                        <input type="file" onChange={handlePictureUpload} style={styles.uploadInput} />
                    </div>

                    <form style={styles.formSection} onSubmit={handleUpdateProfile}>
                        <div style={styles.infoSection}>
                            <label>
                                <strong>Full Name:</strong>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    style={styles.inputField}
                                />
                            </label>

                            <label>
                                <strong>Email:</strong>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={styles.inputField}
                                />
                            </label>

                            <label>
                                <strong>Phone:</strong>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    style={styles.inputField}
                                />
                            </label>
                        </div>

                        <button type="submit" style={styles.updateButton}>Update Profile</button>
                    </form>

                    <div style={styles.gridContainer}>
                        <div style={styles.section}>
                            <h3>Address Book</h3>
                            <p>- Primary Shipping Address: <a href="#edit">[Edit]</a></p>
                            <p>- Billing Address: <a href="#edit">[Edit]</a></p>
                            <p>- Additional Addresses: <a href="#manage">[Manage]</a></p>
                        </div>

                        <div style={styles.section}>
                            <h3>Security & Account Settings</h3>
                            <p>- Password Management: <a href="#change">[Change Password]</a></p>
                            <p>- Two-Factor Authentication: <a href="#setup">[Setup]</a></p>
                            <p>- Login History: <a href="#history">[View History]</a></p>
                            <p>- Account Deactivation: <a href="#close">[Close Account]</a></p>
                        </div>

                        <div style={styles.section}>
                            <h3>Order History</h3>
                            <p>- Past Orders: <a href="/past-orders">[View All]</a></p>
                            <p>- Tracking Information: <a href="#track-order">[Track Orders]</a></p>
                            <p>- Reorder: <a href="#quick-reorder">[Quick Reorder]</a></p>
                            <p>- Return & Refund Status: <a href="#manage-requests">[Manage Requests]</a></p>
                        </div>

                        <div style={styles.section}>
                            <h3>Wishlist & Favorites</h3>
                            <p>- Saved Products: <a href="#view">[View Wishlist]</a></p>
                            <p>- Price Alerts: <a href="#manage">[Manage Alerts]</a></p>
                        </div>

                        <div style={styles.section}>
                            <h3>Payment Methods</h3>
                            <p>- Stored Payment Methods: <a href="#manage">[Manage Methods]</a></p>
                            <p>- Default Payment Method: <a href="#set-preferred">[Set Preferred]</a></p>
                        </div>

                        <div style={styles.section}>
                            <h3>Subscription Preferences</h3>
                            <p>- Email Preferences: <a href="#manage">[Manage Preferences]</a></p>
                            <p>- SMS Alerts: <a href="#manage">[Manage Alerts]</a></p>
                            <p>- Product Notifications: <a href="#manage">[Manage Notifications]</a></p>
                        </div>

                        <div style={styles.section}>
                            <h3>Customer Support & Help Center</h3>
                            <p>- Support Requests: <a href="#view">[View Requests]</a></p>
                            <p>- FAQs and Help Center: <a href="#access">[Access Help]</a></p>
                            <p>- Return & Exchange Center: <a href="#initiate">[Initiate Return]</a></p>
                        </div>

                        <div style={styles.section}>
                            <h3>Optional Features</h3>
                            <p>- Order Frequency Insights: <a href="#view">[View Insights]</a></p>
                            <p>- Social Media Integration: <a href="#connect">[Connect Accounts]</a></p>
                            <p>- Gift Card Management: <a href="#manage">[Manage Gift Cards]</a></p>
                        </div>


                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '40px',
        minHeight: '100vh',
    },
    container: {
        padding: '20px',
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#EFECEC',
        flexGrow: 1,
    },
    profileSection: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '10px',
        marginLeft: '50px',
    },
    profileImage: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: '20px',
    },
    placeholderImage: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '20px',
    },
    uploadInput: {
        marginTop: '10px',
    },
    formSection: {
        marginBottom: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginLeft: '200px',
        marginRight: '200px',
    },
    infoSection: {
        marginBottom: '20px',
    },
    inputField: {
        display: 'block',
        width: '100%',
        margin: '10px 0',
        padding: '8px',
        borderRadius: '5px',
        border: '2px solid #ccc',
        backgroundColor: '#EFECEC',
    },
    updateButton: {
        padding: '10px 20px',
        backgroundColor: '#323232',
        color: '#EFECEC',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
    },
    section: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#EFECEC',
    },
    h3: {
        color: '#252525',
        fontSize: '13px',
    },
    a: {
        color: '#505655',
        textDecoration: 'none',
    },
    aHover: {
        textDecoration: 'underline',
    }
};

export default UserProfile;
