import Dexie from "dexie";
import hljs from "highlight.js";
import Head from "next/head";
import { useEffect, useState } from "react";
import remark from "remark";
import html from "remark-html";

export default function Index() {
    const db = new Dexie("notebook");

    db.version(1).stores({
        notes: `++id,title,note,createdAt,updatedAt`,
    });

    //@ts-ignore
    const [notes, setNotes] = useState<
        {
            id: number;
            title: string;
            note: string;
            createdAt: Date;
            updatedAt: Date;
        }[]
    >([]);

    const [note, setNote] = useState<
        | {
              id: number;
              title: string;
              note: string;
              createdAt: Date;
              updatedAt: Date;
          }
        | undefined
    >(undefined);

    const [content, setContent] = useState("");

    const [isInNewMode, setIsInNewMode] = useState(false);
    const [isInEditMode, setIsInEditMode] = useState(false);

    const [newTitle, setNewTitle] = useState("");
    const [newNote, setNewNote] = useState("");

    const [editedTitle, setEditedTitle] = useState("");
    const [editedNote, setEditedNote] = useState("");

    useEffect(() => {
        (async () => {
            //@ts-ignore
            setNotes(await db.notes.toArray());
        })();
    }, []);

    useEffect(() => {
        hljs.highlightAll();
    }, [content]);

    useEffect(() => {
        (async () => {
            if (note) setContent((await remark().use(html).process(note.note)).toString());
        })();
    }, [note]);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="description" content="A simple notebook web app." />
                <meta name="keywords" content="notebook" />
                <meta name="author" content="cursorsdottsx" />
                <meta name="robots" content="follow" />
                <meta name="theme-color" content="#000000" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://cursorsdottsx.github.io/notebook/" />
                <meta property="og:site_name" content="notebook" />
                <meta property="og:keywords" content="notebook" />
                <meta property="og:locale" content="en-US" />
                <meta property="og:title" content="notebook" />
                <meta property="og:description" content="A simple notebook web app." />
                <meta
                    property="og:image"
                    content="https://og-image.now.sh/notebook.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg&widths=auto&heights=250"
                />
                <title>notebook</title>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            </Head>
            <div className="hidden lg:flex flex-col h-screen">
                <header className="bg-light z-10 shadow-md p-4 h-16 flex items-center justify-between">
                    <h2 className="text-2xl font-light select-none">notebook</h2>
                </header>
                <div className="flex flex-row flex-1">
                    <aside className="sidebar flex-row bg-light z-30 border-r border-gray-200 w-96 px-4 pb-4 overflow-scroll text-sm sm:text-base lg:text-lg shadow-md">
                        <div>
                            {notes.map(({ id, title, note, createdAt, updatedAt }, i) => (
                                <div
                                    className="note cursor-pointer border border-gray-100 w-full h-28 shadow-sm hover:shadow-md transition-shadow flex flex-col px-4 py-3 select-none mt-4 rounded-sm"
                                    key={i}
                                    onClick={() =>
                                        setNote({
                                            id,
                                            title,
                                            note,
                                            createdAt,
                                            updatedAt,
                                        })
                                    }
                                >
                                    <h1 className="flex-1 text-xl flex items-center">
                                        <span className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                                            {title}
                                        </span>
                                    </h1>
                                    <div className="flex justify-between">
                                        <div className="text-gray-400 text-sm">
                                            <span className="block text-xs text-gray-300">updated at</span>
                                            {updatedAt.toLocaleDateString()}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            <span className="block text-xs text-gray-300">created at</span>
                                            {createdAt.toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isInNewMode ? (
                                <div className="note-preview border border-gray-100 w-full h-28 shadow-sm flex flex-col px-4 py-3 select-none mt-4 rounded-sm">
                                    <h1 className="flex-1 text-xl flex items-center">
                                        <span className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                                            {newTitle}
                                        </span>
                                    </h1>
                                    <div className="flex justify-between">
                                        <div className="text-gray-400 text-sm">
                                            <span className="block text-xs text-gray-300">updated at</span>
                                            {new Date().toLocaleDateString()}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            <span className="block text-xs text-gray-300">created at</span>
                                            {new Date().toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="note cursor-pointer border border-green-400 w-full h-28 shadow-sm hover:shadow-md transition-shadow grid place-items-center mt-4 rounded-sm"
                                    onClick={() => setIsInNewMode(true)}
                                >
                                    <span className="text-green-400 text-4xl select-none">+</span>
                                </div>
                            )}
                        </div>
                    </aside>
                    <div className="note-wrapper flex-1 flex-col items-center overflow-scroll">
                        <div className="note-container mx-auto my-0 px-4 py-8 h-full">
                            {isInNewMode ? (
                                <div className="flex flex-col h-full">
                                    <input
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        className="outline-none text-xl bg-gray-100 w-full p-2 rounded block mb-4"
                                    />
                                    <textarea
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        className="outline-none text-base bg-gray-100 w-full p-2 rounded resize-none block flex-1"
                                    ></textarea>
                                    <div className="flex mt-4">
                                        <a
                                            onClick={async () => {
                                                if (!newTitle) return;

                                                const createdNote = {
                                                    title: newTitle,
                                                    note: newNote,
                                                    createdAt: new Date(),
                                                    updatedAt: new Date(),
                                                };

                                                //@ts-ignore
                                                const id = await db.notes.add(createdNote);

                                                setNotes([
                                                    ...notes,
                                                    {
                                                        id,
                                                        ...createdNote,
                                                    },
                                                ]);

                                                setNewTitle("");
                                                setNewNote("");

                                                setIsInNewMode(false);

                                                setNote({
                                                    id,
                                                    ...createdNote,
                                                });
                                            }}
                                            className={`${
                                                newTitle ? "cursor-pointer text-blue-600" : "cursor-not-allowed text-gray-400"
                                            } py-1 block mr-8`}
                                        >
                                            save
                                        </a>
                                        <a
                                            onClick={() => setIsInNewMode(false)}
                                            className="cursor-pointer py-1 block text-red-600"
                                        >
                                            cancel
                                        </a>
                                    </div>
                                </div>
                            ) : isInEditMode && note ? (
                                <div className="flex flex-col h-full">
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        className="outline-none text-xl bg-gray-100 w-full p-2 rounded block mb-4"
                                    />
                                    <textarea
                                        value={editedNote}
                                        onChange={(e) => setEditedNote(e.target.value)}
                                        className="outline-none text-base bg-gray-100 w-full p-2 rounded resize-none block flex-1"
                                    ></textarea>
                                    <div className="flex mt-4">
                                        <a
                                            onClick={async () => {
                                                if (!editedTitle) return;

                                                const updatedNote = {
                                                    title: editedTitle,
                                                    note: editedNote,
                                                    updatedAt: new Date(),
                                                };

                                                //@ts-ignore
                                                await db.notes.update(note.id, updatedNote);

                                                setNotes(
                                                    [...notes].map((n) => (n.id === note.id ? { ...n, ...updatedNote } : n))
                                                );

                                                setEditedTitle("");
                                                setEditedNote("");

                                                setNote({
                                                    ...note,
                                                    ...updatedNote,
                                                });

                                                setIsInEditMode(false);
                                            }}
                                            className={`${
                                                editedTitle
                                                    ? "cursor-pointer text-blue-600"
                                                    : "cursor-not-allowed text-gray-400"
                                            } py-1 block mr-8`}
                                        >
                                            save
                                        </a>
                                        <a
                                            onClick={() => setIsInEditMode(false)}
                                            className="cursor-pointer py-1 block text-red-600"
                                        >
                                            cancel
                                        </a>
                                    </div>
                                </div>
                            ) : note ? (
                                <div className="flex flex-col h-full">
                                    <div className="flex-1">
                                        <div className="flex justify-between my-2">
                                            <div className="text-gray-400 text-sm">
                                                updated at {note.updatedAt.toLocaleDateString()}
                                            </div>
                                            <div className="text-gray-400 text-sm">
                                                created at {note.createdAt.toLocaleDateString()}
                                            </div>
                                        </div>
                                        <h1 className="text-5xl">{note.title}</h1>
                                        <div className="rendered-note my-2" dangerouslySetInnerHTML={{ __html: content }}></div>
                                    </div>
                                    <div className="flex mt-4 pb-4">
                                        <a
                                            onClick={() => {
                                                setEditedTitle(note.title);
                                                setEditedNote(note.note);

                                                setIsInEditMode(true);
                                            }}
                                            className="cursor-pointer text-blue-600 py-1 block mr-8"
                                        >
                                            edit
                                        </a>
                                        <a
                                            onClick={async () => {
                                                //@ts-ignore
                                                await db.notes.delete(note.id);

                                                setNotes(notes.filter(({ id }) => id !== note.id));

                                                setNote(undefined);
                                            }}
                                            className="cursor-pointer py-1 block text-red-600"
                                        >
                                            delete
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-full grid place-items-center">
                                    <h1 className="text-2xl text-gray-300 select-none">No note selected.</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid lg:hidden place-items-center h-screen">
                <div className="text-center">
                    <h1 className="text-5xl">Your screen is too small.</h1>
                    <p className="text-lg">Get a bigger screen.</p>
                </div>
            </div>
        </>
    );
}
