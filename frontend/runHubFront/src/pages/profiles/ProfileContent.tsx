import { useState } from "react";
import ProfilePhoto from "./ProfilePhoto";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout";
import ProfileDistances from "./ProfileDistances";
import ProfileChangePassword from "./ProfileChangePassword";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
  const {
    profileStore: { isCurrentUser },
  } = useStore();
  const [activeTab, setActiveTab] = useState("Dane");

  const handleTabClick = (menuItem: string) => {
    setActiveTab(menuItem);
  };

  const panes = [
    { menuItem: "Dane", content: <ProfileAbout /> },
    {
      menuItem: "Zdjęcie profilowe",
      content: <ProfilePhoto profile={profile} />,
    },
    { menuItem: "Wydarzenia", content: <ProfileDistances /> },
    { menuItem: "Zmień hasło", content: <ProfileChangePassword /> },
  ];

  const filteredPanes = isCurrentUser ? panes : [panes[0]];

  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="col-span-2">
        {filteredPanes.map((pane, index) => (
          <div
            key={index}
            className={`mb-4 ${
              activeTab === pane.menuItem ? "border rounded-lg p-4 " : "hidden"
            }`}
          >
            {pane.content}
          </div>
        ))}
      </div>
      <div>
        <div className="sticky top-24">
          {filteredPanes.map((pane, index) => (
            <div
              key={index}
              className={`py-2 px-4 mb-2 rounded-md cursor-pointer ${
                activeTab === pane.menuItem ? "bg-gray-200" : "bg-gray-100"
              } ${index === 0 ? "rounded-t-md" : ""} ${
                index === filteredPanes.length - 1 ? "rounded-b-md" : ""
              }`}
              onClick={() => handleTabClick(pane.menuItem)}
            >
              {pane.menuItem}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
