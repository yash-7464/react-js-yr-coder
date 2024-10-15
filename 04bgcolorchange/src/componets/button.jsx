import React from 'react'

function button({ btnText }) {
    return (
        <div className="container mx-auto bg-white">
            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white bg-black">
                {btnText}
            </button>
        </div>
    )
}

export default button
