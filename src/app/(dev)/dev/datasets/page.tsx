'use client';

import React, { useState } from 'react';
import { ProblemProvider, PlatformProblem, PlatformId } from '@/src/platforms';
import { JSONViewer } from '../components/JSONViewer';
import { useDev } from '../dev-context';

export default function DatasetBrowserPage() {
  const { logAction } = useDev();
  const provider = new ProblemProvider();

  const [platform, setPlatform] = useState<PlatformId>('codechef');
  const [topic, setTopic] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProblem, setSelectedProblem] = useState<PlatformProblem | null>(null);

  const problems = provider.getPlatformProblems(platform, {
    topic,
    difficulty,
    searchQuery,
    limit: 25,
  });

  const handleSelectProblem = (p: PlatformProblem) => {
    setSelectedProblem(p);
    logAction(`Inspected Dataset Problem: ${p.id} (${p.title})`, 'Dataset Browser', 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>📚</span> Dataset Browser (Read-Only)
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Browse, search, and inspect raw problem JSON metadata across registered platform loaders.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="block text-slate-400 font-medium mb-1">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as PlatformId)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
          >
            <option value="codechef">CodeChef (1,371 problems)</option>
            <option value="codeforces">Codeforces (792 problems)</option>
            <option value="leetcode">LeetCode (3 problems)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 font-medium mb-1">Topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
          >
            <option value="all">All Topics</option>
            <option value="Arrays">Arrays</option>
            <option value="Strings">Strings</option>
            <option value="Math">Math</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
            <option value="Graphs">Graphs</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 font-medium mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 font-medium mb-1">Search Query</label>
          <input
            type="text"
            placeholder="Search title, ID, topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 placeholder-slate-600"
          />
        </div>
      </div>

      {/* Dataset Results Table & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-semibold text-slate-300">Showing {problems.length} problems</span>
            <span className="text-slate-500 font-mono">Platform: {platform}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Topic</th>
                  <th className="p-2">Difficulty</th>
                  <th className="p-2">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {problems.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => handleSelectProblem(p)}
                    className={`cursor-pointer transition-colors hover:bg-slate-800/40 ${
                      selectedProblem?.id === p.id ? 'bg-indigo-600/10 text-indigo-300' : 'text-slate-300'
                    }`}
                  >
                    <td className="p-2 font-bold">{p.id}</td>
                    <td className="p-2 font-sans truncate max-w-[200px]">{p.title}</td>
                    <td className="p-2 text-slate-400">{p.topic}</td>
                    <td className="p-2">{p.difficulty}</td>
                    <td className="p-2 text-emerald-400">{p.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Raw Metadata Inspector Side Panel */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 space-y-4">
          <h2 className="text-sm font-bold text-slate-200">Raw Problem Inspector</h2>
          {selectedProblem ? (
            <div>
              <div className="text-xs space-y-1 text-slate-300 mb-3 font-mono">
                <div>ID: <span className="text-indigo-400 font-bold">{selectedProblem.id}</span></div>
                <div>Title: <span className="text-slate-100">{selectedProblem.title}</span></div>
                <div>URL: <a href={selectedProblem.url} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">{selectedProblem.url}</a></div>
              </div>
              <JSONViewer data={selectedProblem} title={`Raw Problem Object (${selectedProblem.id})`} defaultExpanded={true} />
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">Select a problem from the table to view raw JSON metadata.</p>
          )}
        </div>
      </div>
    </div>
  );
}
