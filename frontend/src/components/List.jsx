import React from 'react'

function List({ Name, Contact, Genre, fb, tw, yt, ig }) {
    return (
        <tr key={Name} className="divide-x divide-gray-200">
            <td className="whitespace-nowrap px-4 py-4">{Name}</td>
            <td className="whitespace-nowrap px-4 py-4">{Contact}</td>
            <td className="whitespace-nowrap px-4 py-4">
                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                    Active
                </span>
            </td>
            <td className="whitespace-nowrap px-4 py-4">{Genre}</td>
        </tr>
    )
}

export default List




