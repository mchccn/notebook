import Dexie from "dexie";
import Head from "next/head";

export default function Index() {
    const db = new Dexie("notebook");

    db.version(1).stores({
        notes: `title,note,createdAt,updatedAt`,
    });

    return (
        <>
            <Head>
                <title>notebook</title>
            </Head>
            <div className="hidden lg:flex flex-col h-screen">
                <header className="bg-light z-50 shadow-md p-4 h-16 flex items-center justify-between">
                    <button className="py-1 px-2 bg-green-500 text-white rounded-sm grid place-items-center">
                        <span>new</span>
                    </button>
                    <button className="py-1 px-2 ">
                        <span>settings</span>
                    </button>
                </header>
                <div className="flex flex-row flex-1">
                    <aside className="sidebar flex-row bg-light z-30 border-r border-gray-200 w-96 p-4 overflow-scroll text-sm sm:text-base lg:text-lg shadow-md sidebar-open">
                        <div></div>
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
        </>
    );
}
