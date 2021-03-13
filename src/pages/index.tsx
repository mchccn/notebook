import Dexie from "dexie";
import Head from "next/head";
import { useState } from "react";

export default function Index() {
    const db = new Dexie("notebook");

    db.version(1).stores({
        notes: `title,note,createdAt,updatedAt`,
    });

    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <Head>
                <title>notebook</title>
            </Head>
            <div className="hidden lg:flex flex-col h-screen">
                <header className="bg-light z-10 shadow-md p-4 h-16 flex items-center justify-between">
                    <h2 className="text-2xl font-light select-none">notebook</h2>
                    <a className="cursor-pointer fill-current text-gray-800 hover:text-gray-900 transition-colors" onClick={() => setNavOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
                        </svg>
                    </a>
                </header>
                <div className="flex flex-row flex-1">
                    <aside className="sidebar flex-row bg-light z-30 border-r border-gray-200 w-96 px-4 pb-4 overflow-scroll text-sm sm:text-base lg:text-lg shadow-md">
                        <div>
                            {new Array(10).fill("").map(() => (
                                <div className="note cursor-pointer border border-gray-100 w-full h-28 shadow-sm hover:shadow-md transition-shadow flex flex-col px-4 py-3 select-none mt-4">
                                    <h1 className="flex-1 text-xl flex items-center">
                                        <span>A generic title</span>
                                    </h1>
                                    <div className="flex justify-between">
                                        <div className="text-gray-400 text-sm">
                                            <span className="block text-xs text-gray-300">updated at</span>
                                            2/2/22
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            <span className="block text-xs text-gray-300">created at</span>
                                            2/2/22
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>
                    <div className="flex flex-col flex-1 note-container"></div>
                </div>
            </div>
            <div className="grid lg:hidden place-items-center h-screen">
                <div className="text-center">
                    <h1 className="text-5xl">Your screen is too small.</h1>
                    <p className="text-lg">Get a bigger screen.</p>
                </div>
            </div>
            <div
                className={`${
                    navOpen ? "" : "opacity-0 pointer-events-none"
                } absolute top-0 left-0 bottom-0 right-0 bg-white z-50 transition-opacity grid place-items-center`}
            >
                <a className="absolute top-4 right-5 text-lg select-none block cursor-pointer" onClick={() => setNavOpen(false)}>
                    ✕
                </a>
                <div></div>
            </div>
        </>
    );
}
