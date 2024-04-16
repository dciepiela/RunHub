import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/profile";
import { DEFAULT_PHOTO_URL } from "../../config";

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  function truncate(str: string | undefined) {
    if (str) {
      return str.length > 40 ? str.substring(0, 37) + "..." : str;
    }
  }
  return (
    <div className="bg-whiteNeutral py-2">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src={profile.photo ? profile.image : DEFAULT_PHOTO_URL}
              alt="Profile"
            />
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 ml-4">
              {profile.displayName}
            </h1>
          </div>

          {/* <button className="px-4 py-2 rounded-lg">Click me</button> */}
        </div>
        <p className="mt-4 text-sm md:text-md font-bold text-gray-800 ">
          {truncate(profile.bio)}
        </p>
      </div>
    </div>
  );
});
