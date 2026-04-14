import React from "react";
import { Switch as AntSwitch } from "antd";
import { Switch as MuiSwitch, FormControlLabel } from "@mui/material";
import RadixSwitch from "../../components/common/RadixSwitch";

const GgSwitchPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full space-y-6">
      <h1 className="text-2xl font-bold">Google Switch Demo</h1>
      <p className="text-gray-600">
        Trang demo Switch/toggle sử dụng Ant Design, Material UI, Radix UI, và Tailwind CSS.
      </p>

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold mb-2">Ant Design Switch</h2>
          <AntSwitch defaultChecked />
        </div>
        <div>
          <h2 className="font-semibold mb-2">Material UI Switch</h2>
          <FormControlLabel control={<MuiSwitch defaultChecked />} label="MUI Switch" />
        </div>
        <div>
          <h2 className="font-semibold mb-2">Radix UI Switch (Tailwind style)</h2>
          <RadixSwitch />
        </div>
      </div>
    </div>
  </div>
);

export default GgSwitchPage;
