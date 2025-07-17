const UserInfoCard = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="bg-gray-50 px-5 py-3.5 dark:bg-gray-900/30">
        <h5 className="text-base font-medium text-gray-800 dark:text-white/90">
          Personal Information
        </h5>
      </div>
      <div className="p-5">
        <ul className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-6">
          <li>
            <span className="block text-sm font-medium text-gray-400">
              First Name
            </span>
            <span className="mt-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              John
            </span>
          </li>
          <li>
            <span className="block text-sm font-medium text-gray-400">
              Last Name
            </span>
            <span className="mt-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Doe
            </span>
          </li>
          <li>
            <span className="block text-sm font-medium text-gray-400">
              Email
            </span>
            <span className="mt-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              john.doe@example.com
            </span>
          </li>
          <li>
            <span className="block text-sm font-medium text-gray-400">
              Phone
            </span>
            <span className="mt-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              +1 123-456-7890
            </span>
          </li>
          <li>
            <span className="block text-sm font-medium text-gray-400">
              Birthdate
            </span>
            <span className="mt-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Jan 10, 1990
            </span>
          </li>
          <li>
            <span className="block text-sm font-medium text-gray-400">
              Sport
            </span>
            <span className="mt-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Soccer
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfoCard;
