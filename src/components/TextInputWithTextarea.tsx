"use client"; // Use "use client" if you're using Next.js app directory

import React, { useState } from "react";

const TextInputWithTextarea = () => {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Input value:", inputValue);
    console.log("Textarea value:", textareaValue);
    // You can handle the submitted values here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Input Field */}
      <div>
        <label htmlFor="textInput" className="block text-sm font-medium text-gray-700">
          Enter Text:
        </label>
        <input
          type="text"
          id="textInput"
          name="textInput"
          value={inputValue}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Type something..."
        />
      </div>

      {/* Textarea */}
      <div>
        <label htmlFor="textarea" className="block text-sm font-medium text-gray-700">
          Enter Description:
        </label>
        <textarea
          id="textarea"
          name="textarea"
          value={textareaValue}
          onChange={handleTextareaChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={5}
          placeholder="Type a description..."
        />
      </div>

      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default TextInputWithTextarea;
