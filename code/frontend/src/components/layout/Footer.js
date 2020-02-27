import React from "react";
import env from "../../environment";
var pjson = require("../../../package.json");

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} QuestCode - Release{" "}
      {pjson.version} @ {env.NAME}
    </footer>
  );
};
