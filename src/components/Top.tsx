import Link from "next/link";

const Top = () => {
  const userName = "Asiri";
  const userProfilePhoto = "/images/Logo.jpeg";
  const userLocation = "Ampara Branch";
  return (
    <header className="bg-gray-100 text-black p-4 w-full h-fit">
      <div className="container px-1 py-1 mx-auto flex justify-between items-end">
        <nav className="w-full">
          <div className="flex justify-end items-center space-x-4">
            <img
              src={userProfilePhoto}
              alt={`${userName}'s profile`}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <span className="text-lg font-semibold">{userLocation}</span>
              <span className="block text-sm text-gray-600">{userName}</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Top;
