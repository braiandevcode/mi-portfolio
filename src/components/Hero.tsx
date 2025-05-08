import { useEffect, useState } from 'react';
import HeroCardInfo from './HeroCardInfo';
import { TProfile, TResponseApi } from '../types/types';
import apiCall from '../helper/helper_query_api';
import config from '../config/configAPI';

interface HeroProps {
  onLoaded?: () => void; 
}

export default function Hero({ onLoaded }: HeroProps) {
  const [profile, setProfile] = useState<TProfile>();
  const [error, setError] = useState<TResponseApi>();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data: TProfile[] = await apiCall<TProfile[]>(config.PROFILE);
        setProfile(data[0]);
      } catch (err) {
        setError(err as TResponseApi);
      } finally {
        onLoaded?.(); 
      }
    };

    fetchHero();
  }, []);

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          {error ? (
            <p className="col-span-full text-center text-red-500">Error: {error?.message}</p>
          ) : profile ? (
            <HeroCardInfo
              key={profile.id_profile}
              title={profile.title}
              subtitle={profile.subtitle}
              file_name={`${config.URL}/uploads/${profile.file_name}`}
              text_info={profile.text_info}
            />
          ) : (
            <p className="col-span-full text-center text-yellow-400">No hay datos de Skills</p>
          )}
        </div>
      </div>
    </section>
  );
}
