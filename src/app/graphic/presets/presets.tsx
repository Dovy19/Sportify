interface PresetProps {
  selectedPreset: string,
  setSelectedPreset: (preset: string) => void,
}

export default function Presets({selectedPreset, setSelectedPreset}: PresetProps) {

  const presets = [
    {
      name: "Light",
      value: "/presets/light.png",
      image: "/presets/light.png",
    },
    {
      name: "Dark",
      value: "/presets/dark.png",
      image: "/presets/dark.png",
    },
    {
      name: "Gold",
      value: "/presets/gold.png",
      image: "/presets/gold.png",
    },
    {
      name: "Green",
      value: "/presets/green.png",
      image: "/presets/green.png",
    },
    {
      name: "Purple",
      value: "/presets/purple.png",
      image: "/presets/purple.png",
    },
    {
      name: "None",
      value: "none",
      image: "", // No overlay for 'None'
    },
  ];
  

  return (
    <div>
      <h3 className="text-white text-lg font-semibold mb-2">Style Presets</h3>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {presets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => setSelectedPreset(preset.value)}
            className={`bg-[#1A1A1A] border ${
              selectedPreset === preset.value ? "border-[#2cfbcd]" : "border-[#2A2A2A]"
            } text-white p-3 rounded-lg text-sm font-medium hover:bg-[#2A2A2A] transition-colors cursor-pointer`}
          >
            <div className="flex flex-col items-center">
              <div className="w-full h-10 rounded-md mb-2 overflow-hidden">
                {preset.image ? (
                  <img
                    src={preset.image}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#2A2A2A] flex items-center justify-center text-xs text-gray-400">
                    None
                  </div>
                )}
              </div>
              {preset.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}