import { useNavigate } from "react-router-dom";

export function User({ user }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/transfer?toId=" + user._id + "&name=" + user.firstName);
  };

  return (
    <div className="flex justify-between mt-6 mr-8 ml-6">
      <div>
        <div className="flex justify-start items-center">
          <div className="flex items-center justify-center text-xl w-12 h-12 rounded-full bg-gray-100 ">
            {user.firstName[0].toUpperCase()}
          </div>
          <div className="pl-4 font-bold text-lg">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div>
        <button
          className="bg-black text-white w-32 h-10 rounded-md"
          onClick={() => handleClick()}
        >
          Send Money
        </button>
      </div>
    </div>
  );
}
