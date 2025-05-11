import HeroCardInfo from '../HeroCardInfo';
import { AppData } from '../../types/types';
import config from '../../config/configAPI';

export default function HomePage({ profile }: Pick<AppData, "profile">) {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row items-center">
            {profile && (
              <HeroCardInfo
                key={profile.id_profile}
                title={profile.title}
                subtitle={profile.subtitle}
                file_name={`${config.URL}/uploads/${profile.file_name}`}
                text_info={profile.text_info}
              />
            )
            }
          </div>
        </div>
      </section>
    </>
  );
}
