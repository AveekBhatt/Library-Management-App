import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const UserPost = () =>{
   
    const navigate = useNavigate();

    const [ISBN , setISBN] = useState("");
    const [title , settitle] = useState("");
    const [subtitle , setsubtitle] = useState("");
    const [author , setauthor] = useState("");
    const [published, setpublished]= useState("");
    const [publisher , setpublisher] = useState("");
    const [pages , setpages] = useState(0);
    const [description , setdescription] = useState("");
    const [status , setstatus] = useState("");
    const postbook = async(e) =>{
        e.preventDefault();
        try{
          const response = await axiosInstance.post("/user-post-book" ,{
              ISBN : ISBN,
              title : title,
              subtitle : subtitle,
              author : author,
              published : published,
              publisher : publisher,
              pages : pages,
              description : description ,
              status : status ,
          })
          console.log("response")
          navigate("/Home")
        }catch(error){
           console.log("error")
        }
    }

    return(
        <div>
        <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
    Add Book
  </h2>

  <form class="space-y-5" onSubmit={postbook}>
    <div>
      <label for="ISBN" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ISBN</label>
      <input 
        type="number" 
        id="ISBN"
        placeholder="9783161484100"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
        required 
        value={ISBN}
        onChange={(e) => setISBN(e.target.value)}
        />
    </div>

    <div>
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
      <input 
        type="text" 
        id="title" 
        placeholder="Book Title"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
        required
        value={title}
        onChange={(e) => settitle(e.target.value)}
        />
    </div>

    <div>
      <label for="subtitle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subtitle</label>
      <input 
        type="text" 
        id="subtitle"
        placeholder="Book Subtitle"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
        required 
        value={subtitle}
        onChange={(e) => setsubtitle(e.target.value)}
        />
    </div>

    <div>
      <label for="author" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
      <input 
        type="text" 
        id="author" 
        placeholder="Author Name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
        required 
        value={author}
        onChange={(e) => setauthor(e.target.value)}
        />
    </div>

    <div>
      <label for="published" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Published Date</label>
      <input 
        type="date"
        id="published"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
        required
        value={published}
        onChange={(e) => setpublished(e.target.value)} />
    </div>

    <div>
      <label for="publisher" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publisher</label>
      <input 
      type="text" 
      id="publisher" 
      placeholder="Publisher Name"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
      required 
      value={publisher}
      onChange={(e) => setpublisher(e.target.value)}
      />
    </div>

    <div>
      <label for="pages" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pages</label>
      <input 
        type="number" 
        id="pages" 
        placeholder="e.g. 200"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
        required
        value={pages}
        onChange={(e) => setpages(e.target.value)}
        />
    </div>

    <div>
      <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
      <textarea 
        id="description" 
        rows="3" 
        placeholder="Write a short description..."
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
        required
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        ></textarea>
    </div>

    <div>
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
      <select 
        id="status"
        value={status}               
        onChange={(e) => setstatus(e.target.value)}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <option value="Available">Available</option>
        <option value="Borrowed">Borrowed</option>
        <option value="Lost">Lost</option>
      </select>
    </div>


    <button type="submit"
      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Add Book
    </button>
  </form>
</div>

        </div>
    )
}

export default UserPost;