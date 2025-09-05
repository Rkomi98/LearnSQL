
import React from 'react';
import type { UserProfileData } from '../types';
import BeanIcon from './icons/BeanIcon';
import BadgeIcon from './icons/BadgeIcon';

interface UserProfileProps {
  profile: UserProfileData;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile }) => {
  return (
    <div className="bg-cocoa-med p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center gap-4 border-b-2 border-caramel">
      <div className="flex items-center gap-3">
        <BeanIcon className="w-8 h-8 text-amber" />
        <div>
          <span className="font-bold text-2xl text-amber">{profile.cacaoBeans}</span>
          <span className="ml-2 text-cream/80">Cacao Beans</span>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <h3 className="font-bold text-lg text-caramel hidden sm:block">I tuoi Badge:</h3>
        {profile.badges.length === 0 ? (
          <p className="text-cream/70 italic">Completa le sfide per guadagnare badge!</p>
        ) : (
          profile.badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2 bg-cocoa-light px-3 py-1 rounded-full text-sm" title={badge}>
              <BadgeIcon className="w-5 h-5 text-amber" />
              <span className="font-semibold">{badge}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
