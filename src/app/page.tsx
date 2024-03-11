import Image from "next/image";
import NavBar from "./components/navBar/navBar";


export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <NavBar />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 h-full">
          <h1 className="text-4xl font-bold text-center my-10">Todo List</h1>
          <div className="flex justify-center">
            <input type="text" placeholder="Add a new task" className="input input-bordered input-primary w-full max-w-xs" />
            <button className="btn btn-primary ml-2">Add</button>
          </div>
          <ul className="list-disc mt-5">
            {/* Tasks will be mapped here */}
          </ul>
        </div>
      </div>
    </div>
  );
}