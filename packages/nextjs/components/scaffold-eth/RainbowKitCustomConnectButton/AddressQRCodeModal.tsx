import { QRCodeSVG } from "qrcode.react";
import { Address as AddressType } from "viem";
import { Address } from "~~/components/scaffold-eth";

type AddressQRCodeModalProps = {
  address: AddressType;
  modalId: string;
};

export const AddressQRCodeModal = ({ address, modalId }: AddressQRCodeModalProps) => {
  // 紫色半透明模态框样式
  const purpleModalStyle = {
    modalBox: {
      backgroundColor: 'rgba(30, 10, 60, 0.85)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(147, 87, 252, 0.3)',
      boxShadow: '0 8px 32px rgba(123, 63, 228, 0.3)'
    },
    closeButton: {
      color: 'rgba(255, 255, 255, 0.8)',
      backgroundColor: 'rgba(123, 63, 228, 0.2)'
    }
  };

  return (
    <>
      <div>
        <input type="checkbox" id={`${modalId}`} className="modal-toggle" />
        <label htmlFor={`${modalId}`} className="modal cursor-pointer">
          <label className="modal-box relative" style={purpleModalStyle.modalBox}>
            {/* dummy input to capture event onclick on modal box */}
            <input className="h-0 w-0 absolute top-0 left-0" />
            <label 
              htmlFor={`${modalId}`} 
              className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3 hover:bg-opacity-30"
              style={purpleModalStyle.closeButton}
            >
              ✕
            </label>
            <div className="space-y-3 py-6">
              <div className="flex flex-col items-center gap-6">
                <QRCodeSVG value={address} size={256} />
                <Address address={address} format="long" disableAddressLink onlyEnsOrAddress />
              </div>
            </div>
          </label>
        </label>
      </div>
    </>
  );
};
