import * as SwitchPrimitive from "@radix-ui/react-switch";
import React from "react";

const RadixSwitch: React.FC = () => (
  <form>
    <div className="flex items-center space-x-2">
      <label className="text-sm" htmlFor="airplane-mode">
        Radix Airplane mode
      </label>
      <SwitchPrimitive.Root
        className="w-10 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-500"
        id="airplane-mode"
      >
        <SwitchPrimitive.Thumb className="block w-4 h-4 bg-white rounded-full shadow transform translate-x-1 data-[state=checked]:translate-x-5 transition-transform" />
      </SwitchPrimitive.Root>
    </div>
  </form>
);

export default RadixSwitch;
