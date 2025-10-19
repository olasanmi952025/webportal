import type { AlertsProps } from "./alert.types";



 const Alert = ({ isOpen, onClose, textDescription, labelConfirm = "Si, Confirmar", labelDismiss = "Cancelar", onHandleConfirm }: AlertsProps) => {

  if (!isOpen) return null;

  return (

    <div
      id="popup-modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
    >
      <div className="relative w-full max-w-md max-h-[95vh] mx-auto">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-h-[95vh] overflow-y-auto">
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {textDescription}
            </h3>
            <button
              type="button"
              className="text-white bg-[#006FB3] hover:bg-[#006FB3] hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-[#006FB3]/20 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center transition-all duration-200"
              onClick={onHandleConfirm}
            >
              {labelConfirm}
            </button>
            <button
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-[#FE6565] focus:outline-none bg-white rounded-lg border border-[#FE6565] hover:bg-[#FE6565] hover:text-white focus:z-10 focus:ring-4 focus:ring-[#FE6565]/20 transition-all duration-200"
              onClick={onClose}
            >
              {labelDismiss}
            </button>
          </div>
        </div>
      </div>
    </div>


  );
}


export default Alert;