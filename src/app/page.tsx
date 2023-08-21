'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { increment, decrement } from "@/redux/features/counterSlice";
import { useGetUsersQuery } from "@/redux/services/userApi";
export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.counter);
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);
  const dispatch = useAppDispatch();
  if (isLoading || isFetching) return <h1>Loading...</h1>
  if (error) return <h1>Error</h1>
  return (
    <>
      <h1 className="text-center text-2xl">Total: {count}</h1>
      <div className="flex justify-center gap-x-2">
        <button className="bg-green-500 px-3 rounded-md" onClick={() => {
          dispatch(increment());
        }}>Increment</button>
        <br />
        <button className="bg-red-500 px-3 rounded-md" onClick={() => {
          dispatch(decrement());
        }}>Decrement</button>
      </div>

      <div className="grid grid-cols-3 mx-auto gap-3">
        {data?.map((user) => (
          <div key={user.id} className="bg-zinc-800 p-4">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </>
  );
}
