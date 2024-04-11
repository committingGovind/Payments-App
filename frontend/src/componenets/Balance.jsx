export function Balance({ userBalance }) {
  return (
    <div>
      <div className="text-2xl font-semibold flex justify-start ">
        <div className="mt-7 ml-5 p-3"> Your Balance</div>
        <div className="mt-7 p-3 ml-5">$ {userBalance}</div>
      </div>

      <div className="text-2xl font-bold ml-7 mt-4 p-2">Users</div>
    </div>
  );
}
