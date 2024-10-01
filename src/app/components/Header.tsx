import Link from "next/link";

const Header = () => {
  const userName = "Asiri";
  const userProfilePhoto = "/images/Logo.jpeg";
  const userLocation = "Ampara Branch";
  return (
    <header className="text-black w-full h-fit">
      <div className="mx-auto flex justify-between items-center">
        <h1>
          <span className="text-6xl">Hello</span>
          <span className="text-7xl font-bold">, {userName}</span>
        </h1>
        <nav>
          <div className="flex items-center space-x-4">
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

export default Header;
