import { OpenBookIcon } from "@/app/icons";
import { useUserStoreActions } from "@/app/store/userStore";

export const CompletedBooksSpotlight = () => {
  const { getCompletedCount } = useUserStoreActions();
  return (
    <div className="flex  gap-5 rounded-xl p-4 bg-ds-light-purple-100   h-fit min-w-[250px] ">
      <div
        className="font-semibold text-4xl flex gap-2 text-md w-fit truncate bg-white  
      rounded-xl p-2 px-4 shadow-md shadow-ds-light-purple-200 items-center justify-center"
      >
        <span className="flex size-9 items-center justify-center">
          <OpenBookIcon />
        </span>
        {getCompletedCount().toLocaleString()}
      </div>
      <div
        className="font-semibold items-center flex gap-2 text-md w-fit bg-white  rounded-xl p-2 px-4 shadow-md shadow-ds-light-purple-200
      whitespace-nowrap "
      >
        Books Read
      </div>
    </div>
  );
};
