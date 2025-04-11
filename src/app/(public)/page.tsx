"use client";
import { useState } from 'react';

export default function HomePage() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Simple Counter</h1>

      <div className="text-center">
        <p className="text-6xl mb-8">{count}</p>

        <div className="flex gap-4">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600"
          >
            Decrease
          </button>

          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded-sm hover:bg-gray-600"
          >
            Reset
          </button>

          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded-sm hover:bg-green-600"
          >
            Increase
          </button>
        </div>
      </div>
    </main>
  );
}