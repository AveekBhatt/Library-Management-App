import React from "react";

const AdminPost = () =>{
    return(
        <div>
<div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
    Add Book
  </h2>

  <form class="space-y-5">
    <div>
      <label for="isbn" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ISBN</label>
      <input type="number" id="isbn" placeholder="9783161484100"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
    </div>

    <div>
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
      <input type="text" id="title" placeholder="Book Title"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
    </div>

    <div>
      <label for="subtitle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subtitle</label>
      <input type="text" id="subtitle" placeholder="Book Subtitle"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
    </div>

    <div>
      <label for="author" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
      <input type="text" id="author" placeholder="Author Name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
    </div>

    <div>
      <label for="published" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Published Date</label>
      <input type="date" id="published"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
    </div>

    <div>
      <label for="publisher" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publisher</label>
      <input type="text" id="publisher" placeholder="Publisher Name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
    </div>

    <div>
      <label for="pages" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pages</label>
      <input type="number" id="pages" placeholder="e.g. 200"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
    </div>

    <div>
      <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
      <textarea id="description" rows="3" placeholder="Write a short description..."
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required></textarea>
    </div>

    <div>
      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
      <select id="status"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <option value="Available">Available</option>
        <option value="Borrowed">Borrowed</option>
        <option value="Lost">Lost</option>
      </select>
    </div>

    <div>
      <label for="borrower" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Borrower</label>
      <input type="text" id="borrower" placeholder="Borrower Name (optional)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
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

export default AdminPost;