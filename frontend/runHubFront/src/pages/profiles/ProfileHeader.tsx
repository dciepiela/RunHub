import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/profile";
import logo from "../../assets/avatar.jpg";

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  const handleClick = () => {
    console.log("kliknięto przycisk");
  };

  return (
    <div className="bg-whiteNeutral py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img className="h-12 w-12 rounded-full" src={logo} alt="Profile" />
            <h1 className="text-3xl font-bold text-gray-800 ml-4">
              {profile.userName}
            </h1>
          </div>
          <button className=" px-4 py-2 rounded-lg" onClick={handleClick}>
            Click me
          </button>
        </div>
      </div>
    </div>
  );
});
