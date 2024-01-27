import React from 'react'

function Footer() {
    return (
        <footer className="bg-[#333] shadow w-full flex items-center justify-center   ">
            <div className="w-full mx-auto max-w-screen-xl p-4 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    © 2023{" "}
                    <a href="" className="hover:underline">
                        GitHubSearchEngine™
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>



    )
}

export default Footer