import Todos from "../islands/Todos.tsx";

export default function Home() {

  return (
   


    <div class="bg-gray-200">
      <div class = "mt-10 px-5 rounded bg-white mx-auto flex w-screen flex-col justify-center py-12">

        <div class="max-auto">

          <h1 class="text-2xl mb-5 text-center font-bold"> Fresh Todo App</h1>
          <img src="logo.svg" alt="Image-1" class="mx-auto"/>
        </div>
        <Todos/>

      </div>

    </div>
   

    
  );
}
