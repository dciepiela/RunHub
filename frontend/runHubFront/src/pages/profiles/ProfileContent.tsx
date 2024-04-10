import React, { useState } from "react";

export default function ProfileContent() {
  const [activeTab, setActiveTab] = useState("About");

  const handleTabClick = (menuItem) => {
    setActiveTab(menuItem);
  };

  const panes = [
    { menuItem: "About", content: "About Content" },
    { menuItem: "Photos", content: "Photos Content" },
    { menuItem: "Events", content: "Events Content" },
    { menuItem: "Followers", content: "Followers Content" },
  ];

  return (
    <div className="mt-8 grid grid-cols-3 gap-4">
      <div className="col-span-2">
        {panes.map((pane, index) => (
          <div
            key={index}
            className={`mb-4 ${
              activeTab === pane.menuItem ? "border rounded-lg p-4" : "hidden"
            }`}
          >
            {pane.content}
          </div>
        ))}
      </div>
      <div>
        <div className="sticky top-0">
          {panes.map((pane, index) => (
            <div
              key={index}
              className={`py-2 px-4 mb-2 rounded-md cursor-pointer ${
                activeTab === pane.menuItem ? "bg-gray-200" : "bg-gray-100"
              } ${index === 0 ? "rounded-t-md" : ""} ${
                index === panes.length - 1 ? "rounded-b-md" : ""
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
}
