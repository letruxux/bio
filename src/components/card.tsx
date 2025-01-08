import React from "react";
import Lastfm from "./lastfm";
import CustomEmoji from "./emoji";
import { SiDiscord, SiGithub, SiLastdotfm } from "@icons-pack/react-simple-icons";

const imgUrl = "https://github.com/letruxux.png";

const PhotographerCard = () => {
  return (
    <div className="p-6 rounded-lg text-white max-w-[1024px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="relative scale-100 hover:scale-110 transition-transform duration-200">
            <div className="w-12 h-12 bg-gray-600 rounded-full overflow-hidden scale-100">
              <img src={imgUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -inset-1 border-2 border-dashed border-gray-500 rounded-full animate-[spin_10s_linear_infinite]" />
          </div>
          <div>
            <h2 className="text-2xl font-medium">
              letruxux <CustomEmoji name="wawa.png" />
            </h2>
            {/* <p className="text-sm text-gray-400">me</p> */}
          </div>
        </div>
        {/* <button className="bg-blue-600 px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition-colors">
          get in touch +
        </button> */}
      </div>

      {/* Message Box */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-4">hello</h3>
        <div className="bg-blue-bg p-4 rounded-2xl">
          <p className="text-sm leading-relaxed">
            <img
              src="https://media1.tenor.com/m/cDJj3LEw0UIAAAAd/gmail-dog.gif"
              alt="aaaaaaaaaaaaaaaaaaaaaaaa"
              className="rounded-2xl"
            />
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-4 gap-4">
        <a
          className="bg-blue-bg py-2 rounded-lg hover:bg-blue-hl transition-colors"
          href="https://github.com/letruxux"
          target="_blank"
        >
          <SiGithub className="mx-auto" />
        </a>
        <a
          className="bg-blue-bg py-2 rounded-lg hover:bg-blue-hl transition-colors"
          href="https://discord.com/users/1057373214596157502"
          target="_blank"
        >
          <SiDiscord className="mx-auto" />
        </a>
        <a
          className="bg-blue-bg py-2 rounded-lg hover:bg-blue-hl transition-colors"
          href="https://last.fm/user/letruxux"
          target="_blank"
        >
          <SiLastdotfm className="mx-auto" />
        </a>
        <a
          className="bg-blue-bg py-2 rounded-lg hover:bg-blue-hl transition-colors text-center"
          href="https://youtu.be/3lWMdJx-zzI"
          target="_blank"
        >
          ❔
        </a>
      </div>

      {/* Lastfm */}
      <Lastfm />
    </div>
  );
};

export default PhotographerCard;
