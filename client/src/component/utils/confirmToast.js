import { toast } from "react-toastify";

export const showConfirm = (message, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div className="flex flex-col gap-3">
        <p>{message}</p>

        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Yes
          </button>

          <button
            onClick={closeToast}
            className="px-3 py-1 bg-gray-400 text-white rounded"
          >
            No
          </button>
        </div>
      </div>
    ),
    { autoClose: false }
  );
};

//  for import on need pages
// import { showConfirm } from "@/utils/confirmToast";

// showConfirm("Are you sure you want to delete?", () => {
//   console.log("Confirmed!");
// });