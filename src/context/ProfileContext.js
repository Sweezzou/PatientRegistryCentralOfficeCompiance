import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();
export const ProfileProvider = ({ children }) => {

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [personalInfo, setPersonalInfo] = useState(null);

    return (
        <ProfileContext.Provider value={{ profilePhoto, setProfilePhoto, personalInfo, setPersonalInfo }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext);
