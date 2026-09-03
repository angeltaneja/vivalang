'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AiNotesPanel } from '@/components/notes/AiNotesPanel';
import { FileText, Plus, Sparkles, Trash2, Tag, Search, BookOpen } from 'lucide-react';
import { Note } from '@/types';

export default function NotesPage() {
  const { currentLanguage, notes, addNote, deleteNote } = useApp();

  const [activeNoteId, setActiveNoteId] = useState<string | null>(notes[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Note['category']>('VOCAB');
  const [newContent, setNewContent] = useState('');

  const langNotes = notes.filter(n => n.languageCode === currentLanguage.code);
  const filteredNotes = langNotes.filter(
    n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeNote = notes.find(n => n.id === activeNoteId) || langNotes[0];

  const handleSaveNote = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    addNote({
      languageCode: currentLanguage.code,
      title: newTitle,
      category: newCategory,
      content: newContent,
      tags: ['Personal', currentLanguage.name],
    });
    setIsCreating(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Personal Notes Workspace</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organize study notes in {currentLanguage.name} and ask AI to explain, generate quizzes, or build flashcards.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition self-start"
        >
          <Plus className="h-4 w-4" />
          <span>New Study Note</span>
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Notes List & Search */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredNotes.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  setActiveNoteId(n.id);
                  setIsCreating(false);
                }}
                className={`w-full text-left rounded-2xl p-4 transition border ${
                  activeNoteId === n.id && !isCreating
                    ? 'bg-blue-600/15 border-blue-500/40 text-white ring-1 ring-blue-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold truncate max-w-[180px]">{n.title}</span>
                  <span className="text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                    {n.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{n.content}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Note Editor / Active Note View */}
        <div className="lg:col-span-2 space-y-4">
          
          {isCreating ? (
            /* Create New Note Form */
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Create New Language Note</h3>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Note Title (e.g., French Subjunctive Rules)"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="VOCAB">VOCABULARY</option>
                <option value="GRAMMAR">GRAMMAR</option>
                <option value="CULTURE">CULTURE</option>
                <option value="CONVERSATION">CONVERSATION</option>
                <option value="PERSONAL">PERSONAL</option>
              </select>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={10}
                placeholder="Write your note content in Markdown format..."
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCreating(false)}
                  className="w-1/3 rounded-2xl border border-slate-800 bg-slate-950 py-3 text-xs font-bold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNote}
                  className="w-2/3 rounded-2xl bg-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition"
                >
                  Save Note
                </button>
              </div>
            </div>
          ) : activeNote ? (
            /* View Active Note */
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-bold text-purple-400 border border-purple-500/20">
                      {activeNote.category}
                    </span>
                    <h2 className="text-xl font-bold text-white">{activeNote.title}</h2>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Updated {new Date(activeNote.updatedAt).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAiPanel(!showAiPanel)}
                    className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>AI Assistant</span>
                  </button>
                  <button
                    onClick={() => deleteNote(activeNote.id)}
                    className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-2 text-rose-400 hover:bg-rose-900/30 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Note Content View */}
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line space-y-3">
                {activeNote.content}
              </div>

              {/* AI Drawer / Panel */}
              {showAiPanel && (
                <AiNotesPanel note={activeNote} onClose={() => setShowAiPanel(false)} />
              )}

            </div>
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center text-slate-400">
              Select or create a study note to begin.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
