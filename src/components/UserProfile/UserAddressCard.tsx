const UserAddressCard = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="bg-gray-50 px-5 py-3.5 dark:bg-gray-900/30">
        <h5 className="text-base font-medium text-gray-800 dark:text-white/90">
          Address Information
        </h5>
      </div>
      <div className="p-5">
        <ul className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-6">
          <li>
            <span className="block text-sm font-medium text-gray-400">
              Address Line 1
            </span>
            <span className="mt-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              123 Main Street
            </span>
          </li>
          <li>
            <span className="block text-sm font-medium text-gray-400">
              Address Line 2
            </span>
            <span className="mt-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Apt 4B
            </span>
          </li>
          <li>
            <span className="block text-sm font-medium text-gray-400">
              City
            </span>
            <span className="mt-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              New York
            </span>
          </li>
          <li>
            <span className="block text-sm font-medium text-gray-400">
              State/Province
            </span>
            <span className="mt-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              NY
            </span>
          </li>
          <li>
            <span className="block text-sm font-medium text-gray-400">
              Zip/Postal Code
            </span>
            <span className="mt-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              10001
            </span>
          </li>
          <li>
            <span className="block text-sm font-medium text-gray-400">
              Country
            </span>
            <span className="mt-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              United States
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserAddressCard;
