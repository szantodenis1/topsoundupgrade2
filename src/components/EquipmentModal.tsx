import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'audio' | 'lighting' | 'stage' | 'screens';
}

interface EquipmentItem {
  name: string;
  description?: string;
  image?: string;
}

interface EquipmentCategory {
  title: string;
  items: EquipmentItem[];
}

const audioEquipment: EquipmentCategory[] = [
  {
    title: "Sistem PA",
    items: [
      { name: "d&b Audiotechnik V-Series" },
      { name: "d&b Audiotechnik SL-SUB" },
      { name: "RCF TTL33-A II Line Array" },
      { name: "RCF TTS28-A", description: "Subwoofer activ" },
      { name: "RCF 4PRO 6001-A", description: "Boxă activă" },
      { name: "RCF 4PRO 8001-A", description: "Subwoofer activ" },
      { name: "RCF TT08-A", description: "Boxă activă" },
      { name: "RCF TTS12-A", description: "Subwoofer activ" },
      { name: "L-Acoustics SB18", description: "Subwoofer" }
    ]
  },
  {
    title: "Sistem Monitoare",
    items: [
      { name: "L-Acoustics 115XT HiQ", description: "Monitor coaxial/biamp" },
      { name: "L-Acoustics LA8", description: "Amplificator controler digital" },
      { name: "Sommer 32/8", description: "Stagebox split monitorizare" }
    ]
  },
  {
    title: "Mixere",
    items: [
      { name: "Avid Venue SC48 Remote", description: "Mixer digital" },
      { name: "Midas Pro1", description: "Mixer digital" },
      { name: "Midas M32 Live" },
      { name: "Soundcraft MH2", description: "Mixer analog" },
      { name: "Soundcraft GB8", description: "Mixer analog" },
      { name: "Dynacord PM1000-3", description: "Mixer analog cu amplificare" }
    ]
  },
  {
    title: "FX & Dynamics",
    items: [
      { name: "Yamaha SPX 990" },
      { name: "Lexicon REV550", description: "Multi FX" },
      { name: "TC Electronic D2", description: "Delay" },
      { name: "Yamaha REV500", description: "Reverb" },
      { name: "BSS FCS 960", description: "Eqalizator stereo" },
      { name: "Klark Teknik Square One", description: "Procesor dynamics" }
    ]
  },
  {
    title: "Microfoane",
    items: [
      { name: "Shure ULXD4D", description: "Receptor wireless digital" },
      { name: "Shure ULXD2 SM58 Beta/SM58", description: "Microfon wireless digital" },
      { name: "Shure UR4D", description: "Receptor wireless" },
      { name: "Shure UR2 KSM9/SM58 Beta/SM58", description: "Microfon wireless" },
      { name: "Sennheiser EW", description: "Sisteme microfon wireless" },
      { name: "Neumann KM184", description: "Microfon condenser" },
      { name: "DPA Classic Touring Kits" },
      { name: "Audio-Techinca ATM350" },
      { name: "Shure SM 87 Beta", description: "Microfon" },
      { name: "Shure SM 58 Beta, SM 58", description: "Microfon dinamic" },
      { name: "Shure SM 57", description: "Microfon dinamic" },
      { name: "Shure 52A Beta", description: "Microfon tobă" },
      { name: "Shure Beta 81A", description: "Microfon tobă" },
      { name: "AKG 451b", description: "Microfon condenser" },
      { name: "AKG C414 XLS", description: "Microfon condenser" },
      { name: "Sennheiser e614", description: "Microfon" },
      { name: "Sennheiser e600", description: "Kit tobe" },
      { name: "Sennheiser e900", description: "Kit tobe" }
    ]
  },
  {
    title: "Backline",
    items: [
      { name: "Tama Star Bubinga", description: "Drum set" },
      { name: "Yamaha Tour Custom", description: "Drum set" },
      { name: "Ampeg SVT-7PRO", description: "Bass Head" },
      { name: "Ampeg PN-410HLF", description: "Cabinet bass" },
      { name: "Trace Elliot AH1200", description: "Amplificator bass" },
      { name: "Trace Elliot 1048H", description: "Cabinet bass" },
      { name: "Fender 65 Twin Reverb", description: "Amplificator combo" },
      { name: "Vox AC30 C2", description: "Amplificator combo" },
      { name: "Marshall JCM2000", description: "Amplificator chitară" },
      { name: "Marshall JCM800", description: "Amplificator chitară" },
      { name: "Marshall 1960A", description: "Cabinet" }
    ]
  }
];

const lightingEquipment: EquipmentCategory[] = [
  {
    title: "Inteligente",
    items: [
      { name: "Fine Art Fine 440 BSW ENHA" },
      { name: "Fine Art Xtreme 280 Beam" },
      { name: "JB Lighting A8 Zoom Beam-Wash" },
      { name: "JB Lighting VaryScan P6 Spot" },
      { name: "JB Lighting VaryColor P6 Wash" },
      { name: "JB Lighting VaryScan P3 Spot" },
      { name: "JB Lighting VaryLED 3*84 Wash" }
    ]
  },
  {
    title: "Convenționale",
    items: [
      { name: "SlimPar QCL", description: "Proiector LED" },
      { name: "Par 64", description: "Proiector PAR 1kw" },
      { name: "Spot", description: "Proiector 1kw PC" },
      { name: "Spot", description: "Proiector 2kw fresnel" },
      { name: "DTS", description: "Spot de urmărire 1200w" },
      { name: "Robert Juliat", description: "Spot de urmărire 575w" },
      { name: "Eurolite", description: "Blinder 2xPAR36 DMX" },
      { name: "Eurolite", description: "Blinder 4xPAR36 DMX" }
    ]
  },
  {
    title: "Console",
    items: [
      { name: "Avolites Tiger Touch II" },
      { name: "Avolites Mobile" },
      { name: "Avolites Titan One" }
    ]
  }
];

const screenEquipment: EquipmentCategory[] = [
  {
    title: "Ecrane LED",
    items: [
      { name: "Absen P4.7 SMD", description: "60mp" },
      { name: "P8 SMD", description: "24mp" },
      { name: "P10 SMD", description: "24mp" }
    ]
  },
  {
    title: "Proiectoare",
    items: [
      { name: "Sanyo PLC-XF1000", description: "Proiector 12000 ANSI" },
      { name: "Barco DP2K-15C", description: "Proiector cinema DCP 15000 ANSI" }
    ]
  },
  {
    title: "Ecrane Proiecție",
    items: [
      { name: "AV Stumpfl Vario64", description: "Ecran video 650x370 front" },
      { name: "Fast-Fold", description: "Ecran video 400x300 front - rear" }
    ]
  },
  {
    title: "Display-uri",
    items: [
      { name: "Panasonic Plasma", description: "50\" display" }
    ]
  }
];

const stageEquipment: EquipmentCategory[] = [
  {
    title: "Sisteme de Acoperiș",
    items: [
      { name: "Milos MR2", description: "Sistem acoperiș 12x10m" },
      { name: "Milos MR2", description: "Sistem acoperiș 10x8m" },
      { name: "Milos MR2", description: "Sistem acoperiș 10x7m" },
      { name: "Milos MR2 LT", description: "Sistem acoperiș 8x6m" }
    ]
  },
  {
    title: "Sisteme de Grinzi",
    items: [
      { name: "Milos M390", description: "Sistem grinzi" },
      { name: "Milos M290", description: "Sistem grinzi" }
    ]
  },
  {
    title: "Sisteme Turn",
    items: [
      { name: "Milos MT1", description: "Sistem turn" },
      { name: "Milos MT05", description: "Sistem turn" }
    ]
  },
  {
    title: "Podium",
    items: [
      { name: "Nivtec", description: "Podium scenă" }
    ]
  }
];

const EquipmentModal: React.FC<EquipmentModalProps> = ({ isOpen, onClose, type = 'audio' }) => {
  const getEquipmentList = () => {
    switch (type) {
      case 'audio':
        return audioEquipment;
      case 'lighting':
        return lightingEquipment;
      case 'screens':
        return screenEquipment;
      case 'stage':
        return stageEquipment;
      default:
        return [];
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'audio':
        return 'Echipamente Profesionale Audio';
      case 'lighting':
        return 'Echipamente Profesionale de Iluminat';
      case 'screens':
        return 'Echipamente Video și Ecrane LED';
      case 'stage':
        return 'Echipamente pentru Scenă';
      default:
        return '';
    }
  };

  const equipmentList = getEquipmentList();
  const title = getTitle();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-dark-950/90 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-2xl bg-dark-50 shadow-xl shadow-accent-blue/20">
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-dark-50/80 backdrop-blur-sm border-b border-dark-200">
            <Dialog.Title className="text-2xl font-bold text-gradient">
              {title}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-dark-200 transition-colors"
            >
              <X className="w-6 h-6 text-dark-600" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {equipmentList.map((category, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-semibold text-dark-800">{category.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="p-4 rounded-xl bg-dark-100/50 border border-dark-200 hover:border-accent-blue/30 transition-colors"
                    >
                      {item.image && (
                        <div className="mb-4 relative w-full aspect-square overflow-hidden rounded-lg bg-dark-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain p-4"
                          />
                        </div>
                      )}
                      <p className="font-medium text-dark-800">{item.name}</p>
                      {item.description && (
                        <p className="text-sm text-dark-500 mt-1">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EquipmentModal;