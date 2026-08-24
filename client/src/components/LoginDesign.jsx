import { Tractor, TractorIcon } from "lucide-react";
import React from "react";
import tractor from "../assets/tractor.jpg";

const LoginDesign = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-3">
        <div>
          <div className="flex  gap-2 items-center">
            <div className="bg-green-400 rounded-full p-2">
              <Tractor className="size-8"/>
            </div>
            <h1 className="font-bold text-2xl text-green-700">Agri-Share</h1>
          </div>
        </div>

        <img src={tractor} alt="tractor" className="size-120" />
      </div>
    </div>
  );
};

export default LoginDesign;
