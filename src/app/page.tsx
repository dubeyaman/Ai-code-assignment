'use client'
import { useState, FormEvent } from 'react';
import { db } from './firebase'; // Ensure firebase.ts is in the root or adjust the path accordingly
import { getAIReview } from './common'; // Adjust this path based on your file structure
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const CodeSubmission = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [description, setDescription] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Store the code submission in Firestore
      const docId = uuidv4();
      console.log('docId: ', docId);
      const codeSubmission = { code, language, description, createdAt: new Date() };
      await setDoc(doc(db, 'submissions', docId), codeSubmission);

      // Fetch AI feedback
      const aiFeedback = await getAIReview(code, language, description);
      setFeedback(aiFeedback);

      // Update Firestore with the feedback
      await setDoc(doc(db, 'submissions', docId), { ...codeSubmission, feedback: aiFeedback });

    } catch (error) {
      console.error("Error submitting code:==", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Submit Your Code for AI Review</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="border p-2 w-full h-32"
          required
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-2"
          required
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          {/* Add more languages as needed */}
        </select>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a brief description of your code"
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {loading ? 'Submitting...' : 'Submit for Review'}
        </button>
      </form>

      {feedback && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">AI Feedback:</h2>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default CodeSubmission;
